"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const BotStore_1 = require("./BotStore");
const BotPost_1 = require("../model/BotPost");
const EventBotCreate_1 = require("../model/EventBotCreate");
const EventBotPost_1 = require("../model/EventBotPost");
const EventBotNote_1 = require("../model/EventBotNote");
const EventBotShare_1 = require("../model/EventBotShare");
const EventBotGeofence_1 = require("../model/EventBotGeofence");
const EventDelete_1 = require("../model/EventDelete");
const PaginableList_1 = require("../model/PaginableList");
const utils_1 = require("./utils");
const MessageStore_1 = require("./MessageStore");
const Message_1 = require("../model/Message");
const NS = 'hippware.com/hxep/publishing';
const RSM = 'http://jabber.org/protocol/rsm';
exports.EventEntity = mobx_state_tree_1.types.union(EventBotPost_1.EventBotPost, EventBotNote_1.EventBotNote, EventBotShare_1.EventBotShare, EventBotCreate_1.EventBotCreate, EventBotGeofence_1.EventBotGeofence, EventDelete_1.EventDelete);
exports.EventList = PaginableList_1.createPaginable(exports.EventEntity);
function processHomestreamResponse(data, username) {
    let items = data.items && data.items.item ? data.items.item : [];
    let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : [];
    if (!Array.isArray(bots)) {
        bots = [bots];
    }
    if (!Array.isArray(items)) {
        items = [items];
    }
    return {
        list: items.map((rec) => processItem(rec, null, username)).filter((x) => x),
        bots,
        version: data.items.version,
        count: parseInt((data.items && data.items.set && data.items.set.count) || 0)
    };
}
exports.processHomestreamResponse = processHomestreamResponse;
function processItem(item, delay, username) {
    try {
        const time = utils_1.default.iso8601toDate(item.version).getTime();
        if (item.message) {
            const { message, id, from } = item;
            const { bot, event, body, media, image } = message;
            if (bot && bot.action === 'show') {
                return EventBotCreate_1.EventBotCreate.create({ id, bot: bot.id, time, created: true });
            }
            if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
                const userId = utils_1.default.getNodeJid(bot['user-jid']);
                return EventBotGeofence_1.EventBotGeofence.create({ id, bot: bot.id, time, profile: userId, isEnter: bot.action === 'enter' });
            }
            if (event && event.item && event.item.entry) {
                const { entry, author } = event.item;
                const eventId = event.node.split('/')[1];
                const post = BotPost_1.BotPost.create({ id: eventId + id, image: entry.image, content: entry.content, profile: utils_1.default.getNodeJid(author) });
                return EventBotPost_1.EventBotPost.create({ id, bot: eventId, time, post });
            }
            if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
                const noteBot = item.message['bot-description-changed'].bot;
                return EventBotNote_1.EventBotNote.create({ id: item.id, bot: noteBot.id, time: utils_1.default.iso8601toDate(item.version).getTime(), note: noteBot.description });
            }
            if (event && event.retract) {
                return EventDelete_1.EventDelete.create({ id: event.retract.id, delete: true });
            }
            if (body || media || image || bot) {
                const msg = MessageStore_1.processMessage(Object.assign({}, message, { from, to: username }), username);
                if (!message.delay) {
                    if (delay && delay.stamp) {
                        msg.time = utils_1.default.iso8601toDate(delay.stamp).getTime();
                    }
                    else {
                        msg.time = utils_1.default.iso8601toDate(item.version).getTime();
                    }
                }
                return bot ? EventBotShare_1.EventBotShare.create({ id, bot: bot.id, time, message: Message_1.Message.create(msg) }) : null;
            }
        }
        else {
            console.log('& UNSUPPORTED ITEM!', item);
        }
    }
    catch (err) {
        console.log('ERROR:', err);
    }
    return null;
}
exports.EventStore = mobx_state_tree_1.types
    .compose(BotStore_1.default, mobx_state_tree_1.types.model('EventStore', {
    updates: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(exports.EventEntity), []),
    events: mobx_state_tree_1.types.optional(exports.EventList, {}),
    version: ''
}))
    .named('EventStore')
    .actions(self => ({
    _loadUpdates: mobx_state_tree_1.flow(function* () {
        const iq = $iq({ type: 'get', to: self.username + '@' + self.host });
        iq.c('catchup', { xmlns: NS, node: 'home_stream', version: self.version });
        const data = yield self.sendIQ(iq);
        const { list, version, count, bots } = processHomestreamResponse(data, self.username);
        bots.forEach((bot) => self.getBot(self._processMap(bot)));
        list.forEach((event) => self.updates.push(event));
        self.version = version;
    }),
    _loadHomestream: mobx_state_tree_1.flow(function* (lastId, max = 3) {
        const iq = $iq({ type: 'get', to: self.username + '@' + self.host });
        iq.c('items', { xmlns: NS, node: 'home_stream' });
        iq.c('exclude-deleted').up();
        iq
            .c('set', { xmlns: RSM })
            .c('reverse')
            .up()
            .c('max')
            .t(max.toString())
            .up();
        if (lastId) {
            iq
                .c('before')
                .t(lastId)
                .up();
        }
        else {
            iq.c('before').up();
        }
        const data = yield self.sendIQ(iq);
        const { list, count, version, bots } = processHomestreamResponse(data, self.username);
        bots.forEach((bot) => self.getBot(self._processMap(bot)));
        self.version = version;
        return { list, count };
    }),
    _subscribeToHomestream: (version) => {
        const iq = $pres({ to: `${self.username}@${self.host}/home_stream` }).c('query', {
            xmlns: NS,
            version
        });
        self.sendStanza(iq);
    },
    _onNotification: mobx_state_tree_1.flow(function* ({ notification, delay }) {
        if (notification['reference-changed']) {
            const { id, server } = notification['reference-changed'].bot;
            yield self.loadBot(id, server);
            self.version = notification['reference-changed'].version;
        }
        else if (notification.item) {
            const item = processItem(notification.item, delay, self.username);
            self.version = notification.item.version;
            if (item) {
                self.updates.push(item);
            }
        }
        else if (notification.delete) {
            self.updates.push(EventDelete_1.EventDelete.create({ id: notification.delete.id, delete: true }));
        }
        else {
            console.warn('& notification: unhandled homestream notification', notification);
        }
    }),
    incorporateUpdates: () => {
        for (let i = self.updates.length - 1; i >= 0; i--) {
            const id = self.updates[i].id;
            // delete item
            self.events.remove(id);
            if (mobx_state_tree_1.getType(self.updates[i]).name !== EventDelete_1.EventDelete.name) {
                self.events.addToTop(mobx_state_tree_1.clone(self.updates[i]));
            }
        }
        self.updates.clear();
    }
}))
    .actions(self => {
    let handler, handler2;
    return {
        afterCreate: () => {
            self.events.setRequest(self._loadHomestream);
            handler = mobx_1.reaction(() => self.connected, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!self.version) {
                    yield self.events.load();
                }
                else {
                    yield self._loadUpdates();
                }
                self._subscribeToHomestream(self.version);
            }));
            handler2 = mobx_1.autorun('EventStore notification', () => {
                if (self.message && self.message.notification) {
                    self._onNotification(self.message);
                }
            });
        },
        beforeDestroy: () => {
            handler();
            handler2();
        }
    };
});
//# sourceMappingURL=EventStore.js.map