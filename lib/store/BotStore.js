"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const MessageStore_1 = require("./MessageStore");
const Bot_1 = require("../model/Bot");
const BotPost_1 = require("../model/BotPost");
const utils_1 = require("./utils");
const NS = 'hippware.com/hxep/bot';
const EXPLORE_NEARBY = 'explore-nearby-result';
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
    bots: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(Bot_1.Bot), {}),
    geoBots: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(mobx_state_tree_1.types.reference(Bot_1.Bot)), {})
}))
    .named('BotStore')
    .actions(self => {
    return {
        getBot: (_a) => {
            var { id } = _a, data = tslib_1.__rest(_a, ["id"]);
            if (self.bots.get(id)) {
                self.bots.get(id).load(data);
            }
            else {
                const bot = Bot_1.Bot.create({ id, owner: data.owner });
                bot.load(data);
                self.bots.put(bot);
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
    _loadBotSubscribers: mobx_state_tree_1.flow(function* (id, lastId, max = 10) {
        const iq = $iq({ type: 'get', to: self.host })
            .c('subscribers', {
            xmlns: NS,
            node: `bot/${id}`
        })
            .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
            .up()
            .c('max')
            .t(max.toString())
            .up();
        if (lastId) {
            iq
                .c('after')
                .t(lastId)
                .up();
        }
        const data = yield self.sendIQ(iq);
        let arr = data.subscribers.subscriber || [];
        if (!Array.isArray(arr)) {
            arr = [arr];
        }
        const res = yield self._requestProfiles(arr.map((rec) => rec.jid.split('@')[0]));
        return { list: res, count: parseInt(data.subscribers.set.count) };
    }),
    _loadBotPosts: mobx_state_tree_1.flow(function* (id, before) {
        const iq = $iq({ type: 'get', to: self.host })
            .c('query', { xmlns: NS, node: `bot/${id}` })
            .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
            .up();
        if (before) {
            iq
                .c('before')
                .t(before)
                .up();
        }
        else {
            iq.c('before').up();
        }
        const data = yield self.sendIQ(iq);
        let res = data.query.item;
        if (!res) {
            res = [];
        }
        if (!Array.isArray(res)) {
            res = [res];
        }
        return {
            count: parseInt(data.query.set.count),
            list: res.map((x) => {
                const post = Object.assign({}, x, x.entry);
                if (post.author_avatar) {
                    self.createFile(post.author_avatar);
                }
                const profile = self.createProfile(utils_1.default.getNodeJid(x.author), {
                    handle: post.author_handle,
                    firstName: post.author_first_name,
                    lastName: post.author_last_name,
                    avatar: post.author_avatar
                });
                if (post.image) {
                    self.createFile(post.image);
                }
                return BotPost_1.BotPost.create({
                    id: post.id,
                    content: post.content,
                    image: post.image,
                    time: utils_1.default.iso8601toDate(post.updated).getTime(),
                    profile: profile.id
                });
            })
        };
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
    loadBot: mobx_state_tree_1.flow(function* (id, server) {
        const iq = $iq({ type: 'get', to: server || self.host }).c('bot', { xmlns: NS, node: `bot/${id}` });
        const data = yield self.sendIQ(iq);
        const res = self.getBot(self._processMap(data.bot));
        return res;
    }),
    _removeBotPost: mobx_state_tree_1.flow(function* (id, postId) {
        const iq = $iq({ type: 'set', to: self.host })
            .c('retract', { xmlns: NS, node: `bot/${id}` })
            .c('item', { id: postId });
        yield self.sendIQ(iq);
    }),
    _shareBot: (id, server, recepients, message, type) => {
        const msg = $msg({
            from: self.username + '@' + self.host,
            type,
            to: self.host
        }).c('addresses', { xmlns: 'http://jabber.org/protocol/address' });
        recepients.forEach(user => {
            if (user === 'friends') {
                msg.c('address', { type: 'friends' }).up();
            }
            else if (user === 'followers') {
                msg.c('address', { type: 'followers' }).up();
            }
            else {
                msg.c('address', { type: 'to', jid: `${user}@${self.host}` }).up();
            }
        });
        msg.up();
        msg
            .c('body')
            .t(message)
            .up();
        msg
            .c('bot', { xmlns: NS })
            .c('jid')
            .t(`${server}/bot/${id}`)
            .up()
            .c('id')
            .t(id)
            .up()
            .c('server')
            .t(server)
            .up()
            .c('action')
            .t('share');
        self.sendStanza(msg);
    },
    _publishBotPost: mobx_state_tree_1.flow(function* (post) {
        let parent = mobx_state_tree_1.getParent(post);
        while (!parent.id)
            parent = mobx_state_tree_1.getParent(parent);
        const botId = parent.id;
        const iq = $iq({ type: 'set', to: self.host })
            .c('publish', { xmlns: NS, node: `bot/${botId}` })
            .c('item', { id: post.id, contentID: post.id })
            .c('entry', { xmlns: 'http://www.w3.org/2005/Atom' })
            .c('title')
            .t(post.title)
            .up();
        if (post.content) {
            iq
                .c('content')
                .t(post.content)
                .up();
        }
        if (post.image) {
            iq
                .c('image')
                .t(post.image.id)
                .up();
        }
        yield self.sendIQ(iq);
    }),
    _subscribeBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'set', to: self.host }).c('subscribe', {
            xmlns: NS,
            node: `bot/${id}`
        });
        const data = yield self.sendIQ(iq);
        return parseInt(data['subscriber_count']);
    }),
    _unsubscribeBot: mobx_state_tree_1.flow(function* (id) {
        const iq = $iq({ type: 'set', to: self.host }).c('unsubscribe', {
            xmlns: NS,
            node: `bot/${id}`
        });
        const data = yield self.sendIQ(iq);
        return parseInt(data['subscriber_count']);
    }),
    _processGeoResult: (stanza) => {
        if (stanza.bot) {
            self.geoBots.put(self.getBot(self._processMap(stanza.bot)));
        }
    }
}))
    .actions(self => {
    const { logger } = mobx_state_tree_1.getEnv(self);
    let isGeoSearching = false;
    let handler, handler2;
    return {
        geosearch: mobx_state_tree_1.flow(function* ({ latitude, longitude, latitudeDelta, longitudeDelta }) {
            if (!isGeoSearching) {
                try {
                    isGeoSearching = true;
                    const iq = $iq({ type: 'get', to: self.host })
                        .c('bots', {
                        xmlns: NS
                    })
                        .c('explore-nearby', { limit: 100, lat_delta: latitudeDelta, lon_delta: longitudeDelta, lat: latitude, lon: longitude });
                    yield self.sendIQ(iq);
                }
                catch (e) {
                    // TODO: how do we handle errors here?
                    console.error(e);
                }
                finally {
                    isGeoSearching = false;
                }
            }
        }),
        afterCreate: () => {
            handler = mobx_1.autorun('BotStore', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    // TODO load own bots here?
                }
                catch (e) {
                    logger.log('error loadChats autorun:', e);
                }
            }));
            handler2 = mobx_1.autorun('BotStore geosearch', () => {
                if (self.message && self.message[EXPLORE_NEARBY]) {
                    self._processGeoResult(self.message[EXPLORE_NEARBY]);
                }
            });
        },
        beforeDestroy: () => {
            handler();
            handler2();
        }
    };
});
//# sourceMappingURL=BotStore.js.map