// @flow

import autobind from 'autobind-decorator';
import model from '../model/model';
import {action} from 'mobx';
import EventBot from '../model/EventBot';
import EventBotGeofence from '../model/EventBotGeofence';
import EventBotImage from '../model/EventBotImage';
import EventBotShare from '../model/EventBotShare';
import EventMessage from '../model/EventMessage';
import message from './messageStore';
import Message from '../model/Message';
import * as xmpp from './xmpp/xmpp';
import home from './xmpp/homeService';
import Utils from './xmpp/utils';
import * as log from '../utils/log';
import botFactory from '../factory/botFactory';
import botStore from '../store/botStore';
import fileFactory from '../factory/fileFactory';
import profileFactory from '../factory/profileFactory';
import Bot from '../model/Bot';

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

  async loadBot(id: string, server: string): Bot {
    const bot = botFactory.create({id, server});
    await botStore.load(bot, false);
    model.eventBots.add(bot);
    return bot;
  }

  @action
  async processItem(item: Object, delay?: Object): Promise<boolean> {
    if (item.id) {
      model.events.version = item.version;
      model.events.earliestId = item.id;
    }
    try {
      const time = Utils.iso8601toDate(item.version).getTime();
      if (item.message && item.message.bot && item.message.bot.action === 'show') {
        model.events.add(new EventBot(item.id, await this.loadBot(item.message.bot.id, item.message.bot.server), time));
      } else if (item.message && item.message.bot && (item.message.bot.action === 'exit' || item.message.bot.action === 'enter')) {
        const userId = Utils.getNodeJid(item.message.bot['user-jid']);
        const profile = profileFactory.create(userId);
        model.events.add(new EventBotGeofence(item.id, await this.loadBot(item.message.bot.id, item.message.bot.server), time, profile, item.message.bot.action === 'enter'));
      } else if (item.message && item.message.event && item.message.event.item && item.message.event.item.entry && item.message.event.item.entry.image) {
        const server = item.id.split('/')[0];
        const id = item.message.event.node.split('/')[1];
        model.events.add(new EventBotImage(item.id, await this.loadBot(id, server), time, fileFactory.create(item.message.event.item.entry.image)));
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
          eventMessage = new EventBotShare(item.id, await this.loadBot(item.message.bot.id, item.message.bot.server), time, msg);
        } else {
          eventMessage = new EventMessage(item.id, msg.from, msg);
        }
        model.events.add(eventMessage);
      } else {
        log.log('UNSUPPORTED ITEM!', item, {level: log.levels.WARNING});
      }
      return true;
    } catch (e) {
      log.log('INVALID ITEM!', e, item);
      return false;
    }
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

  @action
  async loadMore() {
    if (this.loading || model.events.finished) return;
    this.loading = true;
    await this.accumulateItems();
    this.loading = false;
  }

  async accumulateItems(count: number = 3, current: number = 0): Promise<void> {
    const data = await home.items(model.events.earliestId, count);
    if (!data.items.length) {
      model.events.finished = true;
    }
    const processed = (await Promise.all(data.items.map(i => this.processItem(i)))).reduce((sum, value) => sum + value);

    if (processed + current < count) {
      // account for the case where none are processed and earliestId remains the same
      if (processed === 0) count += 3;
      await this.accumulateItems(count, processed + current);
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
