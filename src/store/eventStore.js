// @flow

import autobind from 'autobind-decorator';
import model from '../model/model';
import {runInAction} from 'mobx';
import EventBot from '../model/EventBot';
import EventBotGeofence from '../model/EventBotGeofence';
import EventBotImage from '../model/EventBotImage';
import EventBotNote from '../model/EventBotNote';
import EventBotShare from '../model/EventBotShare';
import Note from '../model/Note';
import EventMessage from '../model/EventMessage';
import message from './messageStore';
import Message from '../model/Message';
import * as xmpp from './xmpp/xmpp';
import home from './xmpp/homeService';
import Utils from './xmpp/utils';
import _ from 'lodash';
import * as log from '../utils/log';
import botService from '../store/xmpp/botService';
import botFactory from '../factory/botFactory';
import fileFactory from '../factory/fileFactory';
import profileFactory from '../factory/profileFactory';

@autobind
export class EventStore {
  notifications = xmpp.message.filter(msg => msg.notification);
  loading = false;

  constructor() {
    this.notifications.onValue(this.onNotification);
  }

  async start() {
    // await this.request();
  }

  processItem(item, delay) {
    const time = Utils.iso8601toDate(item.version).getTime();
    if (item.message && item.message.bot && item.message.bot.action === 'show') {
      model.events.add(new EventBot(item.id, item.message.bot.id, item.message.bot.server, time));
    } else if (item.message && item.message.bot && (item.message.bot.action === 'exit' || item.message.bot.action === 'enter')) {
      const userId = Utils.getNodeJid(item.message.bot['user-jid']);
      const profile = profileFactory.create(userId);
      model.events.add(new EventBotGeofence(item.id, item.message.bot.id, item.message.bot.server, time, profile, item.message.bot.action === 'enter'));
    } else if (item.message && item.message.event && item.message.event.item && item.message.event.item.entry && item.message.event.item.entry.image) {
      const server = item.id.split('/')[0];
      const id = item.message.event.node.split('/')[1];
      model.events.add(new EventBotImage(item.id, id, server, time, fileFactory.create(item.message.event.item.entry.image)));
    } else if (item.message && item.message['bot-description-changed'] && item.message['bot-description-changed'].bot) {
      const server = item.id.split('/')[0];
      const itemId = item.id.split('/')[2];
      const bot = botFactory.create(botService.convert(item.message['bot-description-changed'].bot));
      const botNote = new EventBotNote(item.id, itemId, server, time, new Note(itemId, bot.description));
      botNote.updated = Utils.iso8601toDate(item.version).getTime();
      model.events.add(botNote);
    } else if (item.message && item.message.event && item.message.event.retract) {
    } else if (item.message && (item.message.body || item.message.media || item.message.image || item.message.bot)) {
      const msg: Message = message.processMessage({
        from: item.from,
        to: xmpp.provider.username,
        ...item.message,
      });
      if (!item.message.delay) {
        if (delay && delay.stamp) {
          msg.time = Utils.iso8601toDate(delay.stamp).getTime();
        } else {
          msg.time = Utils.iso8601toDate(item.version).getTime();
        }
      }
      // if (live){
      //   msg.unread = true;
      // }

      let eventMessage;
      if (item.message.bot) {
        eventMessage = new EventBotShare(item.id, item.message.bot.id, item.message.bot.server, time, msg);
      } else {
        eventMessage = new EventMessage(item.id, msg.from, msg);
      }
      model.events.add(eventMessage);
    } else {
      log.log('UNSUPPORTED ITEM!', item, {level: log.levels.WARNING});
    }
    model.events.version = item.version;
    model.events.earliestId = item.id;
  }

  async hidePost(id) {
    await home.remove(id);
  }

  onNotification({notification, delay}) {
    if (notification.item) {
      const item = notification.item;
      this.processItem(item, delay, true);
    } else if (notification.delete) {
      const item = notification.delete;
      model.events.remove(item.id);
      model.events.version = item.version;
    }
  }

  finish() {
  }

  async loadMore() {
    if (!this.loading) {
      this.loading = true;
      const data = await home.items(model.events.earliestId);
      runInAction(() => {
        data.items.forEach(this.processItem);
        if (data.count <= model.events.list.length) {
          model.events.finished = true;
        }
      });
      this.loading = false;
    }
  }

  async request() {
    // request archive if there is no version
    this.loading = true;
    const data = await home.items();

    runInAction(() => {
      // @NOTE: don't clear the list...use the cache!
      // if (data.items.length) {
      //   model.events.clear();
      //   console.log('& clear', model.events);
      // }
      if (data.count <= model.events.list.length) {
        model.events.finished = true;
      }
      let latest;
      for (const item of data.items) {
        this.processItem(item);
        if (!latest) {
          latest = item.version;
        }
      }
      model.events.version = latest;
      home.request(model.events.version);
    });
    this.loading = false;
  }

  // functions to extract time from v1 uuid
  get_time_int = function (uuid_str) {
    var uuid_arr = uuid_str.split('-'),
      time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join('');
    return parseInt(time_str, 16);
  };

  get_timestamp = function (uuid_str) {
    var int_time = this.get_time_int(uuid_str) - 122192928000000000,
      int_millisec = Math.floor(int_time / 10000);
    return int_millisec;
  };
}

export default new EventStore();
