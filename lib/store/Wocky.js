"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const OwnProfile_1 = require("../model/OwnProfile");
const Profile_1 = require("../model/Profile");
const Factory_1 = require("./Factory");
const Base_1 = require("../model/Base");
const Bot_1 = require("../model/Bot");
const BotPost_1 = require("../model/BotPost");
const EventBotCreate_1 = require("../model/EventBotCreate");
const EventBotPost_1 = require("../model/EventBotPost");
const EventBotNote_1 = require("../model/EventBotNote");
const EventBotShare_1 = require("../model/EventBotShare");
const EventBotGeofence_1 = require("../model/EventBotGeofence");
const EventDelete_1 = require("../model/EventDelete");
const PaginableList_1 = require("../model/PaginableList");
const Chats_1 = require("../model/Chats");
const Chat_1 = require("../model/Chat");
const Message_1 = require("../model/Message");
const utils_1 = require("./utils");
exports.EventEntity = mobx_state_tree_1.types.union(EventBotPost_1.EventBotPost, EventBotNote_1.EventBotNote, EventBotShare_1.EventBotShare, EventBotCreate_1.EventBotCreate, EventBotGeofence_1.EventBotGeofence, EventDelete_1.EventDelete);
exports.EventList = PaginableList_1.createPaginable(exports.EventEntity);
exports.Wocky = mobx_state_tree_1.types
    .compose(Base_1.Base, Factory_1.Storages, mobx_state_tree_1.types.model({
    id: 'wocky',
    username: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    password: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    host: mobx_state_tree_1.types.string,
    sessionCount: 0,
    roster: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(mobx_state_tree_1.types.reference(Profile_1.Profile)), {}),
    profile: mobx_state_tree_1.types.maybe(OwnProfile_1.OwnProfile),
    updates: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(exports.EventEntity), []),
    events: mobx_state_tree_1.types.optional(exports.EventList, {}),
    geoBots: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(mobx_state_tree_1.types.reference(Bot_1.Bot)), {}),
    chats: mobx_state_tree_1.types.optional(Chats_1.Chats, Chats_1.Chats.create()),
    version: ''
}))
    .named(Base_1.SERVICE_NAME)
    .actions(self => {
    const { transport } = mobx_state_tree_1.getEnv(self);
    return {
        loadProfile: mobx_state_tree_1.flow(function* (id) {
            const isOwn = id === self.username;
            const data = yield transport.loadProfile(id);
            if (isOwn) {
                if (!self.profile) {
                    const profile = self.create(OwnProfile_1.OwnProfile, Object.assign({ id }, self._registerReferences(Profile_1.Profile, data), { loaded: true, status: 'available' }));
                    self.profile = profile;
                }
                else {
                    self.load(self.profile, data);
                }
                if (self.profile.handle)
                    self.sessionCount = 3;
            }
            return self.profiles.get(id, data);
        })
    };
})
    .extend(self => {
    const { transport } = mobx_state_tree_1.getEnv(self);
    if (!transport) {
        throw 'Server transport is not defined';
    }
    return {
        views: {
            get snapshot() {
                const data = Object.assign({}, self._snapshot);
                if (self.events.length > 20) {
                    data.events = { result: data.events.result.slice(0, 20) };
                }
                delete data.geoBots;
                delete data.files;
                return data;
            },
            get transport() {
                return transport;
            },
            get connected() {
                return transport.connected;
            },
            get connecting() {
                return transport.connecting;
            },
            get sortedRoster() {
                return self.roster
                    .values()
                    .filter(x => x.handle)
                    .sort((a, b) => {
                    return a.handle.toLocaleLowerCase().localeCompare(b.handle.toLocaleLowerCase());
                });
            }
        },
        actions: {
            login: mobx_state_tree_1.flow(function* (user, password, host) {
                if (user) {
                    self.username = user;
                }
                if (password) {
                    self.password = password;
                }
                if (host) {
                    self.host = host;
                }
                if (!self.username || !self.password || !self.host) {
                    throw `Cannot login without username/password/host:${self.username},${self.password},${self.host}`;
                }
                yield transport.login(self.username, self.password, self.host);
                yield self.loadProfile(self.username);
                self.sessionCount++;
                return true;
            }),
            disconnect: mobx_state_tree_1.flow(function* () {
                if (self.profile) {
                    self.profile.status = 'unavailable';
                }
                yield transport.disconnect();
            }),
            remove: mobx_state_tree_1.flow(function* () {
                yield transport.remove();
            }),
            register: mobx_state_tree_1.flow(function* (data, providerName = 'digits') {
                const res = yield transport.register(data, self.host, providerName);
                Object.assign(self, res);
                return true;
            }),
            testRegister: mobx_state_tree_1.flow(function* (data) {
                const res = yield transport.testRegister(data, self.host);
                Object.assign(self, res);
                return true;
            }),
            _requestProfiles: mobx_state_tree_1.flow(function* (users) {
                const arr = yield transport.requestProfiles(users);
                return arr.map((user) => self.profiles.get(user.id, user));
            }),
            _updateProfile: mobx_state_tree_1.flow(function* (d) {
                yield transport.updateProfile(d);
            }),
            lookup: mobx_state_tree_1.flow(function* (handle) {
                const profile = yield transport.lookup(handle);
                return self.profiles.get(profile.id, profile);
            }),
            createChat: (id) => self.chats.get(id) || self.chats.add(Chat_1.Chat.create({ id }))
        }
    };
})
    .views(self => ({
    get all() {
        return self.sortedRoster.filter(x => !x.isBlocked);
    },
    get blocked() {
        return self.sortedRoster.filter(x => x.isBlocked);
    },
    get friends() {
        return self.sortedRoster.filter(x => x.isMutual);
    },
    get followers() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower);
    },
    get newFollowers() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower && x.isNew);
    },
    get followed() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollowed);
    }
}))
    .actions(self => ({
    addRosterItem: (profile) => {
        self.roster.put(self.profiles.get(profile.id, profile));
    },
    getProfile: mobx_state_tree_1.flow(function* (id, data = {}) {
        const profile = self.profiles.get(id, utils_1.processMap(data));
        if (!profile.handle) {
            yield self.loadProfile(id);
        }
        return profile;
    }),
    getBot: (_a) => {
        var { id, server } = _a, data = tslib_1.__rest(_a, ["id", "server"]);
        const bot = self.bots.storage.get(id) ? self.bots.get(id, data) : self.bots.get(id, { server, owner: data.owner });
        if (data && Object.keys(data).length) {
            self.load(bot, data);
        }
        return bot;
    },
    _addMessage: ({ id, message }) => {
        const existingChat = self.chats.get(id);
        const msg = self.create(Message_1.Message, message);
        if (existingChat) {
            existingChat.addMessage(msg);
            if (existingChat.active) {
                msg.read();
            }
        }
        else {
            const chat = self.createChat(id);
            chat.addMessage(msg);
        }
    },
    deleteBot: (id) => {
        self.events.result.forEach((event) => {
            if (event.bot && event.bot.id === id) {
                self.events.remove(event.id);
            }
        });
        self.profile.subscribedBots.remove(id);
        self.profile.ownBots.remove(id);
        self.profiles.get(self.username).ownBots.remove(id);
        self.geoBots.delete(id);
        self.bots.delete(id);
    }
}))
    .actions(self => ({
    _follow: mobx_state_tree_1.flow(function* (username) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.follow(username);
    }),
    _unfollow: mobx_state_tree_1.flow(function* (username) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.unfollow(username);
    }),
    _block: mobx_state_tree_1.flow(function* (username) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.block(username);
    }),
    _unblock: mobx_state_tree_1.flow(function* (username) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.unblock(username);
    }),
    requestRoster: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.connected);
        const roster = yield self.transport.requestRoster();
        roster.forEach(self.addRosterItem);
    }),
    loadChats: mobx_state_tree_1.flow(function* (max = 50) {
        yield utils_1.waitFor(() => self.connected);
        const items = yield self.transport.loadChats(max);
        items.forEach((item) => {
            const msg = self.create(Message_1.Message, item.message);
            const chat = self.createChat(item.id);
            chat.addMessage(msg);
        });
    }),
    loadBot: mobx_state_tree_1.flow(function* (id, server) {
        yield utils_1.waitFor(() => self.connected);
        let bot;
        try {
            bot = yield self.transport.loadBot(id, server);
        }
        catch (e) {
            bot = { id, server, error: JSON.stringify(e) };
        }
        return self.getBot(bot);
    }),
    removeBot: mobx_state_tree_1.flow(function* (id) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.removeBot(id);
        // const events = self.events.list.filter(event => event.bot && event.bot === id)
        // events.forEach(event => self.events.remove(event.id))
        self.deleteBot(id);
    })
}))
    .actions(self => ({
    createBot: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.connected);
        const id = yield self.transport.generateId();
        const bot = self.getBot({ id, owner: self.username });
        bot.setNew(true);
        return bot;
    }),
    _loadOwnBots: mobx_state_tree_1.flow(function* (userId, lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadOwnBots(userId, lastId, max);
        return { list: list.map((bot) => self.getBot(bot)), count };
    }),
    _loadBotSubscribers: mobx_state_tree_1.flow(function* (id, lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadBotSubscribers(id, lastId, max);
        return { list: list.map((profile) => self.profiles.get(profile.id, profile)), count };
    }),
    _loadBotGuests: mobx_state_tree_1.flow(function* (id, lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadBotGuests(id, lastId, max);
        return { list: list.map((profile) => self.profiles.get(profile.id, profile)), count };
    }),
    _loadBotVisitors: mobx_state_tree_1.flow(function* (id, lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadBotVisitors(id, lastId, max);
        return { list: list.map((profile) => self.profiles.get(profile.id, profile)), count };
    }),
    _loadBotPosts: mobx_state_tree_1.flow(function* (id, before) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadBotPosts(id, before);
        return { list: list.map((post) => self.create(BotPost_1.BotPost, post)), count };
    }),
    _loadSubscribedBots: mobx_state_tree_1.flow(function* (userId, lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadSubscribedBots(userId, lastId, max);
        return { list: list.map((bot) => self.getBot(bot)), count };
    }),
    _updateBot: mobx_state_tree_1.flow(function* (bot) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.updateBot(bot);
        self.profile.ownBots.addToTop(bot);
        self.profiles.get(self.username).ownBots.addToTop(bot);
        return { isNew: false };
    }),
    _removeBotPost: mobx_state_tree_1.flow(function* (id, postId) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.removeBotPost(id, postId);
    }),
    _shareBot: (id, server, recepients, message, type) => {
        self.transport.shareBot(id, server, recepients, message, type);
    },
    _publishBotPost: mobx_state_tree_1.flow(function* (post) {
        yield utils_1.waitFor(() => self.connected);
        let parent = mobx_state_tree_1.getParent(post);
        while (!parent.id)
            parent = mobx_state_tree_1.getParent(parent);
        const botId = parent.id;
        yield self.transport.publishBotPost(botId, post);
    }),
    _subscribeBot: mobx_state_tree_1.flow(function* (id, geofence = false) {
        yield utils_1.waitFor(() => self.connected);
        return yield self.transport.subscribeBot(id, geofence);
    }),
    _unsubscribeBot: mobx_state_tree_1.flow(function* (id, geofence = false) {
        yield utils_1.waitFor(() => self.connected);
        return yield self.transport.unsubscribeBot(id, geofence);
    }),
    geosearch: mobx_state_tree_1.flow(function* ({ latitude, longitude, latitudeDelta, longitudeDelta }) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.geosearch({ latitude, longitude, latitudeDelta, longitudeDelta });
    }),
    _loadRelations: mobx_state_tree_1.flow(function* (userId, relation = 'following', lastId, max = 10) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count } = yield self.transport.loadRelations(userId, relation, lastId, max);
        const res = [];
        for (let i = 0; i < list.length; i++) {
            const { id } = list[i];
            // TODO avoid extra request to load profile (server-side)
            const profile = yield self.getProfile(id);
            res.push(profile);
        }
        return { list: res, count };
    }),
    _sendMessage: (msg) => {
        self.transport.sendMessage(msg);
        self._addMessage({ id: msg.to, message: msg });
    },
    loadChat: mobx_state_tree_1.flow(function* (userId, lastId, max = 20) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.loadChat(userId, lastId, max);
    }),
    downloadURL: mobx_state_tree_1.flow(function* (tros) {
        return yield self.transport.downloadURL(tros);
    }),
    downloadFile: mobx_state_tree_1.flow(function* (tros, name, sourceUrl) {
        return yield self.transport.downloadFile(tros, name, sourceUrl);
    }),
    downloadThumbnail: mobx_state_tree_1.flow(function* (url, tros) {
        return yield self.transport.downloadThumbnail(url, tros);
    }),
    downloadTROS: mobx_state_tree_1.flow(function* (tros) {
        return yield self.transport.downloadTROS(tros);
    }),
    _requestUpload: mobx_state_tree_1.flow(function* ({ file, size, width, height, access }) {
        yield utils_1.waitFor(() => self.connected);
        return yield self.transport.requestUpload({ file, size, width, height, access });
    }),
    _loadUpdates: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.connected);
        const { list, bots, version } = yield self.transport.loadUpdates(self.version);
        bots.forEach(self.getBot);
        self.version = version;
        list.forEach((data) => {
            if (data.id.indexOf('/changed') !== -1 || data.id.indexOf('/description') !== -1) {
                return;
            }
            const item = self.create(exports.EventEntity, data);
            self.updates.unshift(item);
        });
    }),
    _loadHomestream: mobx_state_tree_1.flow(function* (lastId, max = 3) {
        yield utils_1.waitFor(() => self.connected);
        const { list, count, bots, version } = yield self.transport.loadHomestream(lastId, max);
        bots.forEach(self.getBot);
        self.version = version;
        return { list: list.map((data) => self.create(exports.EventEntity, data)), count };
    }),
    _subscribeToHomestream: (version) => {
        self.transport.subscribeToHomestream(version);
    },
    _onNotification: mobx_state_tree_1.flow(function* (_a) {
        var { changed, version } = _a, data = tslib_1.__rest(_a, ["changed", "version"]);
        if (!version) {
            console.error('No version for notification:', JSON.stringify(data));
        }
        self.version = version;
        // ignore /changed and /description delete
        // delete creation event if we have also delete event
        if (data.delete) {
            if (data.id.indexOf('/changed') !== -1 || data.id.indexOf('/description') !== -1) {
                return;
            }
            let existed = self.updates.findIndex((u) => u.id === data.id);
            if (existed !== -1 && mobx_state_tree_1.getType(self.updates[existed]).name === EventBotCreate_1.EventBotCreate.name) {
                while (existed !== -1) {
                    self.updates.splice(existed, 1);
                    existed = self.updates.findIndex((u) => u.id === data.id);
                }
                return;
            }
            let existedEvent = self.events.list.findIndex((u) => mobx_state_tree_1.isAlive(u) && u.id === data.id);
            if (existedEvent === -1) {
                return;
            }
        }
        if (changed && data.bot) {
            yield self.loadBot(data.bot.id, data.bot.server);
        }
        else {
            const item = self.create(exports.EventEntity, data);
            if (item.bot && !item.bot.owner) {
                yield self.loadBot(item.bot.id, null);
            }
            const existed = self.updates.findIndex((u) => u.id === item.id);
            if (existed !== -1) {
                self.updates.splice(existed, 1);
            }
            self.updates.unshift(item);
        }
    }),
    incorporateUpdates: () => {
        for (let i = self.updates.length - 1; i >= 0; i--) {
            const id = self.updates[i].id;
            // delete item
            self.events.remove(id);
            if (mobx_state_tree_1.getType(self.updates[i]).name !== EventDelete_1.EventDelete.name) {
                const event = self.updates[i];
                if (event.bot && mobx_state_tree_1.isAlive(event.bot)) {
                    self.events.addToTop(mobx_state_tree_1.clone(event));
                }
            }
            else {
                const parts = id.split('/');
                self.deleteBot(parts[parts.length - 1]);
            }
        }
        self.updates.clear();
    },
    _onGeoBot: (bot) => {
        self.geoBots.put(self.getBot(bot));
    },
    enablePush: mobx_state_tree_1.flow(function* (token) {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.enablePush(token);
    }),
    disablePush: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.connected);
        yield self.transport.disablePush();
    }),
    setSessionCount: (value) => {
        self.sessionCount = value;
    }
}))
    .actions(self => {
    function clearCache() {
        self.profiles.clear();
        self.roster.clear();
        self.chats.clear();
        self.bots.clear();
        self.geoBots.clear();
        self.events.refresh();
        self.updates.clear();
    }
    return {
        clearCache,
        logout: mobx_state_tree_1.flow(function* logout() {
            yield self.disablePush();
            yield self.disconnect();
            self.profile = null;
            clearCache();
            self.sessionCount = 0;
            self.version = '';
            self.username = null;
            self.password = null;
        }),
        afterCreate: () => {
            self.events.setRequest(self._loadHomestream);
            mobx_1.reaction(() => self.profile && self.connected, (connected) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (connected) {
                    yield self.loadChats();
                    self.requestRoster();
                    if (!self.version) {
                        yield self.events.load();
                    }
                    else {
                        yield self._loadUpdates();
                    }
                    self._subscribeToHomestream(self.version);
                }
                else {
                    self.profiles.storage.values().forEach((profile) => profile.setStatus('unavailable'));
                }
            }));
            mobx_1.reaction(() => self.transport.geoBot, self._onGeoBot);
            mobx_1.reaction(() => self.transport.presence, ({ id, status }) => {
                const profile = self.profiles.get(id);
                profile.setStatus(status);
                if (profile.isOwn && self.profile) {
                    self.profile.setStatus(status);
                }
            });
            mobx_1.reaction(() => self.transport.rosterItem, self.addRosterItem);
            mobx_1.reaction(() => self.transport.message, self._addMessage);
            mobx_1.reaction(() => self.transport.notification, self._onNotification);
        }
    };
});
//# sourceMappingURL=Wocky.js.map