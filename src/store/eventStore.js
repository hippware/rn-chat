import autobind from 'autobind-decorator';
import model from '../model/model';
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

import fileFactory from '../factory/fileFactory';
import profileFactory from '../factory/profileFactory';

@autobind
export class EventStore {
    notifications = xmpp.message.filter(msg => msg.notification);
    constructor() {
        this.notifications.onValue(this.onNotification);
    }

    async start() {
        await this.request();
    }

    processItem(item, delay) {
        const time = Utils.iso8601toDate(item.version).getTime();
        if (item.message && item.message.bot && item.message.bot.action === 'show') {
            model.events.add(new EventBot(item.id, item.message.bot.id, item.message.bot.server, time));
        } else if (item.message && item.message.bot && (item.message.bot.action === 'exit' || item.message.bot.action === 'enter')) {
            const userId = Utils.getNodeJid(item.message.bot['user-jid']);
            const profile = profileFactory.create(userId);
            model.events.add(
                new EventBotGeofence(item.id, item.message.bot.id, item.message.bot.server, time, profile, item.message.bot.action === 'enter')
            );
        } else if (
            item.message &&
            item.message.event &&
            item.message.event.item &&
            item.message.event.item.entry &&
            item.message.event.item.entry.image
        ) {
            const server = item.id.split('/')[0];
            const id = item.message.event.node.split('/')[1];
            model.events.add(new EventBotImage(item.id, id, server, time, fileFactory.create(item.message.event.item.entry.image)));
        } else if (
            item.message &&
            item.message.event &&
            item.message.event.item &&
            item.message.event.item.entry &&
            item.message.event.item.entry.content
        ) {
            const server = item.id.split('/')[0];
            const itemId = item.id.split('/')[1];
            const id = item.message.event.node.split('/')[1];
            const botNote = new EventBotNote(item.id, id, server, time, new Note(itemId, item.message.event.item.entry.content));
            botNote.updated = Utils.iso8601toDate(item.message.event.item.entry.updated).getTime();
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
            console.log('UNSUPPORTED ITEM!', item);
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

    finish() {}

    async loadMore() {
        const data = await home.items(model.events.earliestId);
        for (const item of data.items) {
            this.processItem(item);
        }
        if (data.count === model.events.list.length) {
            model.events.finished = true;
        }
    }

    async request() {
        // request archive if there is no version
        const data = await home.items();
        if (data.items.length) {
            model.events.clear();
        }
        let latest;
        for (const item of data.items) {
            this.processItem(item);
            latest = item.version;
        }
        model.events.version = latest;
        home.request(model.events.version);
    }

    // functions to extract time from v1 uuid
    get_time_int = function (uuid_str) {
        var uuid_arr = uuid_str.split('-'), time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join('');
        return parseInt(time_str, 16);
    };

    get_timestamp = function (uuid_str) {
        var int_time = this.get_time_int(uuid_str) - 122192928000000000, int_millisec = Math.floor(int_time / 10000);
        return int_millisec;
    };
}

export default new EventStore();
