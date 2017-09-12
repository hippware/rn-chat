// @flow

import autobind from 'autobind-decorator';
import model from '../model/model';
import {action, autorun} from 'mobx';
import EventBot from '../model/EventBot';
import EventBotGeofence from '../model/EventBotGeofence';
import EventBotImage from '../model/EventBotImage';
import EventBotNote from '../model/EventBotNote';
import EventBotShare from '../model/EventBotShare';
import Note from '../model/BotPost';
import EventMessage from '../model/EventMessage';
import message from './messageStore';
import Message from '../model/Message';
import * as xmpp from './xmpp/xmpp';
import home from './xmpp/homeService';
import Utils from './xmpp/utils';
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
    await this.request();
  }

  @action
  processItem(item: Object, delay?: Object): boolean {
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
      log.log('retract! ignoring', item.message.event.retract.id);
      return false;
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
    return true;
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

  finish() {}

  async loadMore() {
    if (this.loading) return;
    this.loading = true;
    await this.accumulateItems(model.events.earliestId);
    this.loading = false;
  }

  @action
  async accumulateItems(earliestId: string, count: number = 3, pageSize: number = 5, current: number = 0): Promise<void> {
    const data = await home.items(earliestId, pageSize);
    // TODO: handle manipulating the count if some items aren't processed
    if (data.count <= model.events.list.length) {
      model.events.finished = true;
    }
    let processed = 0;
    data.items.forEach((i) => {
      if (this.processItem(i)) processed += 1;
    });
    if (processed + current < count) {
      console.warn('Homestream: some items arent being processed, accumulating more');
      await this.accumulateItems(earliestId, count, pageSize + 20, processed + current);
    }
  }

  @action
  async request() {
    // request archive if there is no version
    this.loading = true;
    const data = await home.items();
    // need to clear events to avoid overloading of memory/disk for many events
    if (data.items.length) {
      model.events.clear();
      model.eventBots.clear();
    }
    // TODO: figure out how to calculate finished if there are ignored events
    if (data.count <= model.events.list.length) {
      model.events.finished = true;
    }
    let latest;
    data.items.forEach((item) => {
      this.processItem(item);
      if (!latest) {
        latest = item.version;
      }
    });
    if (latest) model.events.version = latest;
    home.request(model.events.version);
    this.loading = false;
  }

  // functions to extract time from v1 uuid
  get_time_int(uuid_str: string) {
    var uuid_arr = uuid_str.split('-'),
      time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join('');
    return parseInt(time_str, 16);
  }

  get_timestamp(uuid_str) {
    var int_time = this.get_time_int(uuid_str) - 122192928000000000,
      int_millisec = Math.floor(int_time / 10000);
    return int_millisec;
  }
}

export default new EventStore();
