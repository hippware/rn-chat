// @flow

import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
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
import assert from 'assert';
import File from '../model/File';
import FileSource from '../model/FileSource';
import * as log from '../utils/log';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;

  geoKeyCache: string[] = [];

  create(data) {
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
    if (!this.address) {
      when(
        'bot.create: set address',
        () => this.bot.location,
        () => {
          this.address = new Address(this.bot.location);
        },
      );
    }
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
    const data = await xmpp.create(params);

    // publish note if description is changed
    if (!isNew && this.bot.descriptionChanged) {
      xmpp.publishContent(this.bot, Utils.generateID(), this.bot.description);
    }

    botFactory.remove(this.bot);
    this.bot.id = data.id;
    this.bot.server = data.server;
    this.bot.isNew = false;
    this.bot.owner = model.profile;

    botFactory.add(this.bot);
    model.followingBots.add(this.bot);
    model.ownBots.add(this.bot);
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
  }

  async following(before) {
    const data = await xmpp.following(model.user, model.server, before);
    if (!before) {
      model.followingBots.clear();
      model.ownBots.clear();
    }
    for (const item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.followingBots.add(bot);
      if (model.followingBots.list.length === data.count) {
        model.followingBots.finished = true;
      }

      if (!before && bot.owner.isOwn) {
        model.ownBots.add(bot);
      }
    }
  }

  async list(bots: Bots, user = model.user) {
    const data = await xmpp.list(user, model.server, bots.earliestId);
    for (const item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bots.add(bot);
    }
    if (bots.list.length === data.count) {
      bots.finished = true;
    }
  }

  async load(target: Bot) {
    const bot = target || this.bot;
    assert(bot, 'Bot is not specified to load');
    const d = await xmpp.load({id: bot.id, server: bot.server});
    if (!bot.isNew) {
      bot.clearImages();
      bot.load(d);
      if (bot.image) {
        bot.image.download();
      }
      if (bot.image_items) {
        await this.loadImages(null, bot);
      }
    }
  }

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
        res.push(botFactory.create(botData));
      }
    }
    for (const bot of res) {
      model.geoBots.add(bot);
    }
  }

  async loadImages(before, target: Bot) {
    const bot = target || this.bot;
    try {
      const images = await xmpp.imageItems({id: bot.id, server: bot.server}, before);
      for (const image of images) {
        bot.addImage(image.url, image.item);
      }
    } catch (e) {
      log.log('LOAD IMAGE ERROR:', e, {level: log.levels.ERROR});
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

  async publishImage({source, size, width, height}, bot: Bot) {
    assert(source, 'source must be not null');
    assert(bot, 'bot is not defined');
    const itemId = Utils.generateID();
    const file = new File();
    file.source = new FileSource(source);
    file.width = width;
    file.height = height;
    file.item = itemId;
    bot.insertImage(file);
    bot.imageSaving = true;
    try {
      const url = await fileStore.requestUpload({
        file: source,
        size,
        width,
        height,
        access: bot.id ? `redirect:${bot.server}/bot/${bot.id}` : 'all',
      });
      await xmpp.publishImage(bot, file.item, url).catch(e => (file.error = e));
      file.id = url;
    } catch (e) {
      throw `PUBLISH IMAGE error: ${e} ; ${file.error}`;
    } finally {
      bot.imageSaving = false;
    }
  }

  async publishNote(itemId, note) {
    await xmpp.publishContent(this.bot, itemId, note);
    this.bot.addNote(note);
  }

  async removeItem(itemId) {
    if (!this.bot.isNew) {
      await xmpp.removeItem(this.bot, itemId);
    }
    this.bot.removeImage(itemId);
  }

  async removeImageWithIndex(index) {
    assert(index >= 0 && index < this.bot._images.length, `${index} is invalid, length: ${this.bot._images.length}`);
    const itemId = this.bot._images[index].item;
    await this.removeItem(itemId);
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

  async start() {
    try {
      await this.following();
      await this.list(model.ownBots);
    } catch (e) {
      console.error(e);
    }
  }

  finish = () => {};
}

export default new BotStore();
