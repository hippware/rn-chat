// @flow

import autobind from 'autobind-decorator';
import model from '../model/model';
import {action} from 'mobx';
import EventBot from '../model/EventBot';
import EventBotPost from '../model/EventBotPost';
import EventBotGeofence from '../model/EventBotGeofence';
import EventBotShare from '../model/EventBotShare';
import EventMessage from '../model/EventMessage';
import EventBotNote from '../model/EventBotNote';
import messageStore from './messageStore';
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
import botService from '../store/xmpp/botService';
import Note from '../model/BotPost';

const EVENT_PAGE_SIZE = 3;

@autobind
export class EventStore {
  notifications = xmpp.message.filter(msg => msg.notification);
  loading: boolean = false;
  processedEvents: number = 0;

  constructor() {
    this.notifications.onValue(this.onNotification);
  }

  async start() {
    await this.request();
  }

  // NOTE: this is a little bit redundant with botStore.loadBot except it waits for the bot to load before returning
  async loadBot(id: string, server: string): Promise<Bot> {
    const bot = botFactory.create({id, server});
    await botStore.download(bot, false);
    if (!bot.owner.downloaded) bot.owner.download();
    model.eventBots.add(bot);
    return bot;
  }

  @action
  async processItem(item: Object, delay?: Object): Promise<boolean> {
    if (item.id) {
      if (item.version) {
        model.events.version = item.version;
      } else {
        console.warn('no item version', item);
      }
      model.events.earliestId = item.id;
    }
    this.processedEvents += 1;
    try {
      const time = Utils.iso8601toDate(item.version).getTime();
      if (item.message) {
        const {message, id, from} = item;
        const {bot, event, body, media, image} = message;
        if (bot && bot.action === 'show') {
          model.events.add(new EventBot(id, await this.loadBot(bot.id, bot.server), time));
        } else if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
          const userId = Utils.getNodeJid(bot['user-jid']);
          const profile = profileFactory.create(userId);
          model.events.add(new EventBotGeofence(id, await this.loadBot(bot.id, bot.server), time, profile, bot.action === 'enter'));
        } else if (event && event.item && event.item.entry) {
          const {entry, author} = event.item;
          const server = id.split('/')[0];
          const eventId = event.node.split('/')[1];
          const postImage = entry.image ? fileFactory.create(entry.image) : null;
          const profile = profileFactory.create(Utils.getNodeJid(author));
          model.events.add(new EventBotPost(id, await this.loadBot(eventId, server), profile, time, postImage, entry.content));
        } else if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
          const noteBot = botFactory.create(botService.convert(item.message['bot-description-changed'].bot));
          const botNote = new EventBotNote(item.id, noteBot, time, noteBot.description);
          botNote.updated = Utils.iso8601toDate(item.version).getTime();
          model.events.add(botNote);
        } else if (event && event.retract) {
          log.log('retract message! ignoring', event.retract.id);
          return false;
        } else if (body || media || image || bot) {
          const msg: Message = messageStore.processMessage({
            from,
            to: xmpp.provider.username,
            ...message,
          });
          if (!message.delay) {
            if (delay && delay.stamp) {
              msg.time = Utils.iso8601toDate(delay.stamp).getTime();
            } else {
              msg.time = Utils.iso8601toDate(item.version).getTime();
            }
          }
          // if (live){
          //   msg.unread = true;
          // }

          const eventMessage = bot ? new EventBotShare(id, await this.loadBot(bot.id, bot.server), time, msg) : new EventMessage(id, msg.from, msg);
          model.events.add(eventMessage);
        } else {
          log.log('UNSUPPORTED ITEM!', item, {level: log.levels.WARNING});
          return false;
        }
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
      // TODO: handle deletes more elegantly
      const item = notification.delete;
      model.events.remove(item.id);
      log.log('item delete', item.version);
      model.events.version = item.version;
    }
  }

  finish() {
    this.processedEvents = 0;
    this.loading = false;
  }

  @action
  async loadMore() {
    if (this.loading || model.events.finished) return;
    this.loading = true;
    await this.accumulateItems();
    this.loading = false;
  }

  @action
  async accumulateItems(count: number = EVENT_PAGE_SIZE, current: number = 0): Promise<void> {
    const earliestId = model.events.earliestId;
    const data = await home.items(model.events.earliestId, count);
    if (!data.items.length) {
      model.events.finished = true;
      return;
    }
    const newEventCount = (await Promise.all(data.items.map(i => this.processItem(i)))).reduce((sum, value) => sum + value, 0);

    if (newEventCount + current < count && this.processedEvents < data.count) {
      // account for the case where none are processed and earliestId remains the same
      if (newEventCount === 0 && model.events.earliestId === earliestId) count += EVENT_PAGE_SIZE;
      await this.accumulateItems(count, newEventCount + current);
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
    const latest = data.version;
    await this.accumulateItems();
    if (latest) model.events.version = latest;
    home.request(model.events.version);
    this.loading = false;
  }

  // functions to extract time from v1 uuid
  getTimeInt(uuid_str: string) {
    var uuid_arr = uuid_str.split('-'),
      time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join('');
    return parseInt(time_str, 16);
  }

  getTimestamp(uuidStr) {
    var intTime = this.getTimeInt(uuidStr) - 122192928000000000,
      intMs = Math.floor(intTime / 10000);
    return intMs;
  }
}

export default new EventStore();
