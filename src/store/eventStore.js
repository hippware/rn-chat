// @flow

import autobind from 'autobind-decorator';
import model from '../model/model';
import {action, autorun, toJS} from 'mobx';
import Event from '../model/Event';
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
import botService from '../store/xmpp/botService';
import _ from 'lodash';

const EVENT_PAGE_SIZE = 3;
const EVENT_LIST_MAX_SIZE = 50;

@autobind
export class EventStore {
  notifications = xmpp.message.filter(msg => msg.notification);
  loading: boolean = false;
  processedEvents: number = 0;

  constructor() {
    this.notifications.onValue(this.onNotification);
  }

  async start() {
    this.loading = true;
    if (!model.events.version) {
      await this.accumulateItems();
    }
    autorun(() => {
      if (model.connected) this.request();
    });
    this.loading = false;
    this.trimCache();
  }

  request() {
    home.request(model.events.version);
  }

  @action
  processItem(item: Object, delay?: Object): ?Event {
    const time = Utils.iso8601toDate(item.version).getTime();
    if (item.message) {
      let res: Event = null;
      const {message, id, from} = item;
      const {bot, event, body, media, image} = message;
      if (bot && bot.action === 'show') {
        res = new EventBot(id, botFactory.create({id: bot.id, server: bot.server}), time);
      } else if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
        const userId = Utils.getNodeJid(bot['user-jid']);
        const profile = profileFactory.create(userId);
        res = new EventBotGeofence(id, botFactory.create({
          id: bot.id,
          server: bot.server,
        }), time, profile, bot.action === 'enter');
      } else if (event && event.item && event.item.entry) {
        const {entry, author} = event.item;
        const postImage = entry.image ? fileFactory.create(entry.image) : null;
        const profile = profileFactory.create(Utils.getNodeJid(author));
        const server = id.split('/')[0];
        const eventId = event.node.split('/')[1];
        res = new EventBotPost(id, botFactory.create({id: eventId, server}), profile, time, postImage, entry.content);
      } else if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
        const noteBot = botFactory.create(botService.convert(item.message['bot-description-changed'].bot));
        res = new EventBotNote(item.id, noteBot, time, noteBot.description);
        res.updated = Utils.iso8601toDate(item.version).getTime();
      } else if (event && event.retract) {
        log.log('& retract message! ignoring', event.retract.id);
        return null;
        // return false;
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

        res = bot ? new EventBotShare(id, botFactory.create({
          id: bot.id,
          server: bot.server,
        }), time, msg) : new EventMessage(id, msg.from, msg);
      } else {
        log.log('& UNSUPPORTED ITEM!', item, {level: log.levels.WARNING});
        return null;
      }
      res.ordering = item.ordering ? Utils.iso8601toDate(item.ordering).getTime() : time;
      return res;
    }
    log.log('& UNSUPPORTED ITEM!', item, {level: log.levels.WARNING});
    return null;
  }

  // NOTE: not currently called anywhere in active code
  // async hidePost(id) {
  //   await home.remove(id);
  // }

  nextVersion: ?string = null;

  async onNotification({notification, delay}) {
    log.log('Notification', notification);
    let item;
    if (notification.item) {
      item = notification.item;
      const newItem = this.processItem(item, delay);
      if (!newItem) {
        return;
      }
      if (!newItem.bot || !model.eventBots.get(newItem.bot.id)) {
        model.events.listToAdd.push(newItem);
      }
      if (newItem.bot) {
        await botStore.download(newItem.bot);
      }
      if (item.version) model.events.nextVersion = item.version;
      else log.log('item has no version!', item);
    } else if (notification.delete) {
      item = notification.delete;
      log.log('item delete', item);
      model.events.flagForDelete(item.id);
    } else {
      log.warn('& notification: unhandled homestream notification', notification);
    }
    if (item && item.version) model.events.nextVersion = item.version;
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
    const {earliestId} = model.events;
    const data = await home.items(earliestId, count, true);
    if (!data.items.length) {
      model.events.finished = true;
      return;
    }
    data.bots.forEach(bot => model.eventBots.add(botFactory.create(bot)));
    let newEventCount = 0;
    data.items.map(this.processItem).forEach((p) => {
      if (p) {
        model.events.add(p);
        newEventCount += 1;
      }
    });
    const latest = data.version;
    if (latest) {
      model.events.version = latest;
    }

    if (newEventCount + current < count && this.processedEvents < data.count) {
      // account for the case where none are processed and earliestId remains the same
      if (newEventCount === 0 && model.events.earliestId === earliestId) count += EVENT_PAGE_SIZE;
      await this.accumulateItems(count, newEventCount + current);
    }
  }

  incorporateUpdates() {
    log.log('incorporateUpdates');
    try {
      this.addUpdates();
      this.removeDeletes();
      if (model.events.nextVersion !== '') {
        model.events.version = model.events.nextVersion;
        model.events.nextVersion = '';
      } else {
        log.log('incorporateUpdates: cannot update version');
      }
    } catch (err) {
      log.warn('incorporateUpdates error:', err);
    } finally {
      model.events.listToAdd.clear();
    }
  }

  addUpdates() {
    const {listToAdd} = model.events;
    if (listToAdd && listToAdd.length) {
      log.log('Incorporate updates: add events', toJS(listToAdd));
      listToAdd.forEach((e) => {
        try {
          model.events.add(e);
        } catch (err) {
          log.log('Incorporate updates error, could not add', e, err);
        }
      });
      listToAdd.clear();
    }
  }

  removeDeletes() {
    const {idsToDelete} = model.events;
    if (idsToDelete && idsToDelete.length) {
      log.log('Incorporate updates: delete events', toJS(idsToDelete));
      idsToDelete.forEach((id) => {
        try {
          model.events.remove(id);
        } catch (err) {
          log.log('Incorporate updates error, could not delete', id, err);
        }
      });
    }
  }

  trimCache(): void {
    if (model.events.list.length > EVENT_LIST_MAX_SIZE) {
      const newList = _.take(model.events.list, EVENT_LIST_MAX_SIZE);
      model.events.replace(newList);
    }
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
