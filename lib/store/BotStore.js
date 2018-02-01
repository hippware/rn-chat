"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const MessageStore_1 = require("./MessageStore");
const Bot_1 = require("../model/Bot");
const NS = 'hippware.com/hxep/bot';
function addField(iq, name, type) {
    iq.c('field', { var: name, type });
}
function addValue(iq, name, value) {
    if (value !== undefined && value !== null) {
        const type = typeof value === 'number' ? 'int' : 'string';
        addField(iq, name, type);
        iq
            .c('value')
            .t(name === 'image' ? value.id : value)
            .up()
            .up();
    }
}
function addValues(iq, values) {
    for (const key of Object.keys(values)) {
        addValue(iq, key, values[key]);
    }
}
exports.default = mobx_state_tree_1.types
    .compose(MessageStore_1.default, mobx_state_tree_1.types.model('XmppBot', {
    bots: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(Bot_1.Bot), {})
}))
    .named('BotStore')
    .actions(self => {
    return {
        getBot: (_a) => {
            var { id } = _a, data = tslib_1.__rest(_a, ["id"]);
            if (self.bots.get(id)) {
                Object.assign(self.bots.get(id), data);
            }
            else {
                self.bots.put(Bot_1.Bot.create(Object.assign({ id }, data)));
            }
            return self.bots.get(id);
        },
        generateId: mobx_state_tree_1.flow(function* () {
            const iq = $iq({ type: 'set' }).c('new-id', { xmlns: NS });
            const data = yield self.sendIQ(iq);
            if (data['new-id']) {
                if (data['new-id']['#text']) {
                    return data['new-id']['#text'];
                }
                else {
                    return data['new-id'];
                }
            }
            else {
                throw 'Cannot generate ID';
            }
        })
    };
})
    .actions(self => ({
    createBot: mobx_state_tree_1.flow(function* () {
        const id = yield self.generateId();
        const bot = Bot_1.Bot.create({ id, owner: self.username });
        self.bots.put(bot);
        return bot;
    }),
    removeBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'set', to: self.host }).c('delete', { xmlns: NS, node: `bot/${id}` });
        yield self.sendIQ(iq);
        self.bots.delete(id);
    }),
    _loadOwnBots: mobx_state_tree_1.flow(function* (userId, lastId, max = 10) {
        const iq = $iq({ type: 'get', to: self.host })
            .c('bot', { xmlns: NS, user: `${userId}@${self.host}` })
            .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
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
        if (data.error) {
            throw data.error;
        }
        const res = [];
        let bots = data.bots.bot;
        if (!bots) {
            bots = [];
        }
        if (!Array.isArray(bots)) {
            bots = [bots];
        }
        for (const item of bots) {
            res.push(self.getBot(self._processMap(item)));
        }
        return { list: res, count: parseInt(data.bots.set.count) };
    }),
    _loadSubscribedBots: mobx_state_tree_1.flow(function* (userId, lastId, max = 10) {
        const iq = $iq({ type: 'get', to: self.host })
            .c('subscribed', { xmlns: NS, user: `${userId}@${self.host}` })
            .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
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
        if (data.error) {
            throw data.error;
        }
        const res = [];
        let bots = data.bots.bot;
        if (!bots) {
            bots = [];
        }
        if (!Array.isArray(bots)) {
            bots = [bots];
        }
        for (const item of bots) {
            res.push(self.getBot(self._processMap(item)));
        }
        return { list: res, count: parseInt(data.bots.set.count) };
    }),
    _updateBot: mobx_state_tree_1.flow(function* (bot) {
        const { title, image, description, address, location, visibility, radius, id, addressData } = bot;
        const iq = bot.isNew
            ? $iq({ type: 'set' }).c('create', { xmlns: NS })
            : $iq({ type: 'set' }).c('fields', {
                xmlns: NS,
                node: `bot/${bot.id}`
            });
        addValues(iq, {
            id,
            title,
            address_data: JSON.stringify(addressData),
            description,
            radius: Math.round(radius),
            address,
            image,
            visibility
        });
        addField(iq, 'location', 'geoloc');
        location.addToIQ(iq);
        yield self.sendIQ(iq);
        return { server: self.host };
    }),
    loadBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'get', to: self.host }).c('bot', { xmlns: NS, node: `bot/${id}` });
        const data = yield self.sendIQ(iq);
        const res = self.getBot(self._processMap(data.bot));
        return res;
    }),
    _subscribeBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'set', to: self.host }).c('subscribe', {
            xmlns: NS,
            node: `bot/${id}`
        });
        const data = yield self.sendIQ(iq);
        return data['subscriber_count'];
    }),
    _unsubscribeBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'set', to: self.host }).c('unsubscribe', {
            xmlns: NS,
            node: `bot/${id}`
        });
        const data = yield self.sendIQ(iq);
        return data['subscriber_count'];
    })
}))
    .actions(self => {
    const { logger } = mobx_state_tree_1.getEnv(self);
    let handler;
    return {
        afterCreate: () => {
            handler = mobx_1.autorun('BotStore', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    // TODO load own bots here?
                }
                catch (e) {
                    logger.log('error loadChats autorun:', e);
                }
            }));
        },
        beforeDestroy: () => {
            if (handler) {
                handler();
            }
        }
    };
});
//# sourceMappingURL=BotStore.js.map