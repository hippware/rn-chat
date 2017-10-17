// @flow

import autobind from 'autobind-decorator';
import {when, autorun, observable, action, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import profileStore from '../store/profileStore';
import fileStore from '../store/fileStore';
import location, {METRIC, IMPERIAL} from './locationStore';
import Location from '../model/Location';
import xmpp from './xmpp/botService';
import model from '../model/model';
import Utils from './xmpp/utils';
import Bot, {LOCATION, NOTE, IMAGE, SHARE_FOLLOWERS, SHARE_FRIENDS, SHARE_SELECT} from '../model/Bot';
import Bots from '../model/Bots';
import BotPost from '../model/BotPost';
import assert from 'assert';
import File from '../model/File';
import FileSource from '../model/FileSource';
import * as log from '../utils/log';
import fileFactory from '../factory/fileFactory';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;

  geoKeyCache: string[] = [];

  create(data: Object): boolean {
    this.address = null;
    this.bot = botFactory.create(data);
    if (!this.bot.owner) {
      when(
        'bot.create: fill owner',
        () => model.profile,
        () => {
          this.bot.owner = model.profile;
        },
      );
    }
    when(
      'bot.create: set address',
      () => this.bot.location,
      () => {
        this.address = new Address(this.bot.location);
      },
    );
    if (!this.bot.location) {
      when(
        'bot.create: set location',
        () => location.location,
        () => {
          this.bot.location = new Location(location.location);
          this.bot.isCurrent = true;
        },
      );
    }
    when(() => model.connected, this.generateId);
    return true;
  }

  generateId() {
    xmpp.generateId().then((id) => {
      this.bot.id = id;
      this.bot.server = model.server;
      // add this bot to the factory
      botFactory.add(this.bot);
    });
  }

  createLocation(data) {
    this.create({...data, type: LOCATION});
  }

  createImage(data) {
    this.create({...data, type: IMAGE});
  }

  createNote(data) {
    this.create({...data, type: NOTE});
  }

  async save() {
    const isNew = this.bot.isNew;
    this.bot.isSubscribed = true;
    const params = {...this.bot, isNew};
    if (this.bot.image) {
      params.image = this.bot.image.id;
    }
    // NOTE: radius <.5 gets rounded down to 0 which causes an error on the server
    params.radius = this.bot.radius >= 1 ? this.bot.radius : 1;
    const data = await xmpp.create(params);

    botFactory.remove(this.bot);
    this.bot.id = data.id;
    this.bot.server = data.server;
    this.bot.isNew = false;
    this.bot.owner = model.profile;

    botFactory.add(this.bot);
    model.followingBots.add(this.bot);
    model.ownBots.add(this.bot);
    model.geoBots.add(this.bot);
  }

  async remove(id, server) {
    assert(id, 'id is required');
    assert(server, 'server is required');
    try {
      await xmpp.remove({id, server});
    } catch (e) {
      if (e.indexOf('not found') === -1) {
        throw e;
      }
    }
    model.followingBots.remove(id);
    model.ownBots.remove(id);
    model.geoBots.remove(id);
  }

  async following(beforeId) {
    let before = beforeId;
    let data;
    try {
      data = await xmpp.following(model.user, model.server, before);
    } catch (error) {
      if (error.code === '500' || error.code === '404') {
        before = null;
        data = await xmpp.following(model.user, model.server, before, 20);
      } else {
        throw error;
      }
    }
    if (!before) {
      model.followingBots.clear();
      model.ownBots.clear();
    }
    if (!data.bots.length) {
      model.followingBots.finished = true;
    }
    for (const item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.followingBots.add(bot);

      if (!before && bot.owner.isOwn) {
        model.ownBots.add(bot);
      }
    }
  }

  async list(bots: Bots, user = model.user) {
    if (!model.server) {
      console.log('No server is defined');
      return;
    }
    const data = await xmpp.list(user, model.server, bots.earliestId);
    for (const item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bots.add(bot);
    }
    if (bots.list.length === data.count) {
      bots.finished = true;
    }
  }

  loadBot(id: string, server: string): Bot {
    const bot = botFactory.create({id, server});
    // optionally load it
    if (!bot.owner || !bot.title) {
      when(
        () => model.connected,
        async () => {
          await this.download(bot, false);
        },
      );
    }
    return bot;
  }

  download = async (target: ?Bot, loadPosts: boolean = true): Promise<void> => {
    const bot: Bot = target || this.bot;
    assert(bot, 'Bot is not specified to download');
    if (bot.loading) return;
    try {
      bot.loading = true;
      const d = await xmpp.load({id: bot.id, server: bot.server});
      if (!bot.isNew) {
        bot.load(d);
        if (bot.image) {
          bot.image.download();
        }
        if (loadPosts) {
          await this.loadPosts(null, target);
        }
      }
    } catch (err) {
      console.warn('botStore.download error', err);
      // TODO: any other error handling? prevent later download attempts?
      throw err;
    } finally {
      bot.loading = false;
    }
  };

  async geosearch({latitude, longitude}: {latitude: number, longitude: number}): Promise<void> {
    const list = await xmpp.geosearch({latitude, longitude, server: model.server});
    const res = [];
    for (const botData of list) {
      if (this.geoKeyCache.includes(botData.id)) continue;
      else this.geoKeyCache.push(botData.id);
      // if we have necessary data, no need to do additional fetch for each bot
      if (botData.owner && botData.location) {
        res.push(botFactory.create({loaded: true, ...botData}));
      } else {
        res.push(this.loadBot(botData.id, botData.server));
      }
    }
    res.forEach((bot) => {
      model.geoBots.add(bot);
    });
  }

  @action
  async loadPosts(before, target: Bot) {
    const bot = target || this.bot;
    try {
      const posts = await xmpp.posts({id: bot.id, server: bot.server}, before);
      // clear all list for initial load
      if (!before) {
        bot.clearPosts();
      }
      posts.forEach((post) => {
        const profile = profileFactory.create(post.author, {handle: post.author_handle, firstName: post.author_first_name, lastName: post.author_last_name});
        bot.addPost(new BotPost(post.id, post.content, post.image && fileStore.create(post.image), Utils.iso8601toDate(post.updated).getTime(), profile));
      });
    } catch (e) {
      log.log('LOAD BOT POST LOAD ERROR:', e, {level: log.levels.ERROR});
    }
  }

  // async setCoverPhoto({source, fileSize, width, height}) {
  async setCoverPhoto({source, size, width, height}) {
    const file = new File();
    file.source = new FileSource(source);
    file.width = width;
    file.height = height;
    this.bot.image = file;
    this.bot.thumbnail = file;
    file.id = await fileStore.requestUpload({
      file: source,
      size,
      width,
      height,
      access: this.bot.id ? `redirect:${this.bot.server}/bot/${this.bot.id}` : 'all',
    });
    if (!this.bot.isNew) {
      await this.save();
    }
  }

  async publishItem(note: string, imageObj, bot: Bot): Promise<void> {
    assert(bot, 'bot is not defined');
    const itemId = Utils.generateID();
    const botPost = new BotPost(itemId, note, null, new Date().getTime(), model.profile);
    let imageUrl = null;
    // upload image if we have source
    if (imageObj && imageObj.source) {
      const {source, size, width, height} = imageObj;
      const imageId = Utils.generateID();
      const file = new File();
      file.source = new FileSource(source);
      file.width = width;
      file.height = height;
      file.item = imageId;
      file.loaded = true;
      botPost.image = file;
      // bot.insertImage(file);
      botPost.imageSaving = true;
      try {
        imageUrl = await fileStore.requestUpload({
          file: source,
          size,
          width,
          height,
          access: bot.id ? `redirect:${bot.server}/bot/${bot.id}` : 'all',
        });
        file.id = imageUrl;
      } catch (e) {
        throw `PUBLISH IMAGE error: ${e} ; ${file.error}`;
      } finally {
        botPost.imageSaving = false;
      }
    }
    await xmpp.publishItem(bot, itemId, note, imageUrl);
    bot.addPost(botPost);
    bot.totalItems += 1;
  }

  async removeItem(itemId, bot: Bot) {
    if (!bot.isNew) {
      await xmpp.removeItem(bot, itemId);
    }
    bot.removePost(itemId);
    bot.totalItems -= 1;
  }

  async subscribe(bot: Bot) {
    bot.isSubscribed = true;
    bot.followersSize += 1;
    model.followingBots.add(bot);
    await xmpp.subscribe(bot);
  }

  async loadSubscribers(bot: Bot) {
    const jids = await xmpp.subscribers(bot);
    await profileStore.requestBatch(jids);
    bot.subscribers = jids.map(rec => profileFactory.create(rec));
  }

  async unsubscribe(bot: Bot) {
    bot.isSubscribed = false;
    if (bot.followersSize > 1) {
      bot.followersSize -= 1;
    }
    model.followingBots.remove(bot.id);
    await xmpp.unsubscribe(bot);
  }

  share(message, type, bot: Bot) {
    if (bot.shareMode === SHARE_FRIENDS) {
      xmpp.share(bot, ['friends'], message, type);
    } else if (bot.shareMode === SHARE_FOLLOWERS) {
      xmpp.share(bot, ['followers'], message, type);
    } else {
      xmpp.share(bot, bot.shareSelect.map(profile => profile.user), message, type);
    }
  }

  start = async () => {
    await this.following();
  };

  finish = () => {};
}

export default new BotStore();
