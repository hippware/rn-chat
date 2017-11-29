// @flow

import autobind from 'autobind-decorator';
import {when, observable, action, toJS} from 'mobx';
import AddressHelper from '../model/AddressHelper';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import profileStore from '../store/profileStore';
import fileStore from '../store/fileStore';
import locationStore from './locationStore';
import Location from '../model/Location';
import botService from './xmpp/botService';
import model from '../model/model';
import Utils from './xmpp/utils';
import Bot, {LOCATION, NOTE, IMAGE, SHARE_FOLLOWERS, SHARE_FRIENDS} from '../model/Bot';
import Bots from '../model/Bots';
import BotPost from '../model/BotPost';
import assert from 'assert';
import File from '../model/File';
import FileSource from '../model/FileSource';
import * as log from '../utils/log';
import analyticsStore from './analyticsStore';
import * as xmpp from './xmpp/xmpp';

const EXPLORE_NEARBY = 'explore-nearby-result';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable addressHelper: AddressHelper = null;
  @observable isGeoSearching: boolean = false;
  @observable nextCoordinates: ?Object = null;

  geoKeyCache: string[] = [];

  constructor() {
    xmpp.message.filter(msg => msg[EXPLORE_NEARBY]).onValue(val => this.processGeoResult(val[EXPLORE_NEARBY]));
  }

  create(data: Object): boolean {
    this.addressHelper = null;
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
        this.addressHelper = new AddressHelper(this.bot.location);
      },
    );
    if (!this.bot.location) {
      when(
        'bot.create: set location',
        () => locationStore.location,
        () => {
          this.bot.location = new Location(locationStore.location);
          this.bot.isCurrent = true;
        },
      );
    }
    when(() => model.connected, this.generateId);
    return true;
  }

  generateId() {
    botService.generateId().then((id) => {
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
    const data = await botService.create(params);
    analyticsStore.track('botcreate_complete', toJS(this.bot));
    model.botsCreatedCount += 1;

    botFactory.remove(this.bot);
    this.bot.id = data.id;
    this.bot.server = data.server;
    this.bot.isNew = false;
    this.bot.owner = model.profile;

    botFactory.add(this.bot);
    model.subscribedBots.add(this.bot);
    model.ownBots.add(this.bot);
    model.geoBots.add(this.bot);
  }

  async remove(id, server) {
    assert(id, 'id is required');
    assert(server, 'server is required');
    try {
      await botService.remove({id, server});
    } catch (e) {
      if (e.indexOf('not found') === -1) {
        throw e;
      }
    }
    model.subscribedBots.remove(id);
    model.ownBots.remove(id);
    model.geoBots.remove(id);
  }

  async subscribed(beforeId) {
    let before = beforeId;
    let data;
    try {
      data = await botService.subscribed(model.user, model.server, before);
    } catch (error) {
      if (error.code === '500' || error.code === '404') {
        before = null;
        data = await botService.subscribed(model.user, model.server, before, 20);
      } else {
        throw error;
      }
    }
    if (!before) {
      model.subscribedBots.clear();
      model.ownBots.clear();
    }
    if (!data.bots.length) {
      model.subscribedBots.finished = true;
    }
    for (const item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.subscribedBots.add(bot);

      if (!before && bot.owner.isOwn) {
        model.ownBots.add(bot);
      }
    }
  }

  async list(bots: Bots, user = model.user) {
    if (!model.server) {
      log.log('No server is defined');
      return;
    }
    const data = await botService.list(user, model.server, bots.earliestId);
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
      const d = await botService.load({id: bot.id, server: bot.server});
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
      log.warn('botStore.download error', bot.id, err);
      // TODO: any other error handling? prevent later download attempts?
      if (err && err.code === '404') this.removeBot(bot);
      throw err;
    } finally {
      bot.loading = false;
    }
  };

  removeBot = (bot: Bot) => {
    botFactory.remove(bot);
    model.events.removeByBotId(bot.id);
  };

  async geosearch({latitude, longitude, radius}: {radius: number, latitude: number, longitude: number}): Promise<void> {
    if (this.isGeoSearching) {
      this.nextCoordinates = {latitude, longitude, radius};
      return;
    }
    try {
      log.log('botStore.geosearch:', latitude, longitude);
      botService.geosearch({latitude, longitude, server: model.server, radius});
      this.isGeoSearching = true;
    } catch (err) {
      // TODO: how do we handle errors here?
      this.isGeoSearching = false;
    }
  }

  processGeoResult(result) {
    try {
      if (result.bot) {
        const botData = botService.convert(result.bot);
        if (this.geoKeyCache.includes(botData.id)) return;
        else this.geoKeyCache.push(botData.id);
        let bot;
        // if we have necessary data, no need to do additional fetch for each bot
        if (botData.owner && botData.location) {
          bot = botFactory.create({loaded: true, ...botData});
        } else {
          this.loadBot(botData.id, botData.server);
        }
        model.geoBots.add(bot);
      } else {
        this.isGeoSearching = false;
        if (this.nextCoordinates) {
          this.geosearch(this.nextCoordinates);
          this.nextCoordinates = null;
        }
      }
    } catch (err) {
      log.warn('processGeo error', err);
    }
  }

  @action
  async loadPosts(before, target: Bot) {
    const bot = target || this.bot;
    try {
      const posts = await botService.posts({id: bot.id, server: bot.server}, before);
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
    await botService.publishItem(bot, itemId, note, imageUrl);
    bot.addPost(botPost);
    bot.totalItems += 1;
  }

  async removeItem(itemId, bot: Bot) {
    if (!bot.isNew) {
      await botService.removeItem(bot, itemId);
    }
    bot.removePost(itemId);
    bot.totalItems -= 1;
  }

  async subscribe(bot: Bot) {
    bot.isSubscribed = true;
    bot.followersSize += 1;
    model.subscribedBots.add(bot);
    await botService.subscribe(bot);
    analyticsStore.track('bot_save');
  }

  async loadSubscribers(bot: Bot) {
    const jids = await botService.subscribers(bot);
    await profileStore.requestBatch(jids);
    bot.subscribers = jids.map(rec => profileFactory.create(rec));
  }

  async unsubscribe(bot: Bot) {
    bot.isSubscribed = false;
    if (bot.followersSize > 1) {
      bot.followersSize -= 1;
    }
    model.subscribedBots.remove(bot.id);
    await botService.unsubscribe(bot);
    analyticsStore.track('bot_unsave');
  }

  share(message, type, bot: Bot) {
    if (bot.shareMode === SHARE_FRIENDS) {
      botService.share(bot, ['friends'], message, type);
    } else if (bot.shareMode === SHARE_FOLLOWERS) {
      botService.share(bot, ['followers'], message, type);
    } else {
      botService.share(bot, bot.shareSelect.map(profile => profile.user), message, type);
    }
  }

  start = async () => {
    await this.subscribed();
  };

  finish = () => {};
}

export default new BotStore();
