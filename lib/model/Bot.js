"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const File_1 = require("./File");
const Location_1 = require("./Location");
const BotPost_1 = require("./BotPost");
const Address_1 = require("./Address");
const utils = require("../transport/utils");
const Uploadable_1 = require("./Uploadable");
const Updatable_1 = require("./Updatable");
const PaginableList_1 = require("./PaginableList");
const Base_1 = require("./Base");
exports.VISIBILITY_OWNER = 0;
exports.VISIBILITY_PUBLIC = 100;
exports.Bot = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.compose(Uploadable_1.createUploadable('image', (self) => `redirect:${self.service.host}/bot/${self.id}`), Updatable_1.createUpdatable(self => self.service._updateBot(self))), mobx_state_tree_1.types.model('Bot', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    isSubscribed: false,
    guest: false,
    visitor: false,
    title: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    server: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    radius: 100,
    geofence: false,
    owner: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(Profile_1.Profile)),
    image: File_1.FileRef,
    description: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    visibility: exports.VISIBILITY_PUBLIC,
    location: mobx_state_tree_1.types.maybe(Location_1.Location),
    address: '',
    followersSize: 0,
    guestsSize: 0,
    visitorsSize: 0,
    totalItems: 0,
    addressData: mobx_state_tree_1.types.optional(Address_1.Address, {}),
    subscribers: mobx_state_tree_1.types.optional(Profile_1.ProfilePaginableList, {}),
    guests: mobx_state_tree_1.types.optional(Profile_1.ProfilePaginableList, {}),
    visitors: mobx_state_tree_1.types.optional(Profile_1.ProfilePaginableList, {}),
    posts: mobx_state_tree_1.types.optional(BotPost_1.BotPostPaginableList, {}),
    error: ''
}))
    .volatile(self => ({
    isNew: false,
    loading: false
}))
    .named('Bot')
    .actions(self => ({
    setError: (value) => {
        self.error = value;
        self.loading = false;
    },
    startLoading() {
        self.loading = true;
    },
    finishLoading() {
        self.loading = false;
    },
    setGeofence: (value) => {
        self.geofence = value;
    },
    setPublic: (value) => {
        self.visibility = value ? exports.VISIBILITY_PUBLIC : exports.VISIBILITY_OWNER;
    },
    afterAttach: () => {
        self.subscribers.setRequest(self.service._loadBotSubscribers.bind(self.service, self.id));
        self.guests.setRequest(self.service._loadBotGuests.bind(self.service, self.id));
        self.visitors.setRequest(self.service._loadBotVisitors.bind(self.service, self.id));
        self.posts.setRequest(self.service._loadBotPosts.bind(self.service, self.id));
    },
    createPost: (content = '') => {
        const id = utils.generateID();
        const botPost = BotPost_1.BotPost.create({ id, content, profile: self.service.profile.id });
        self.posts.add(botPost);
        self.totalItems += 1;
        return botPost;
    },
    removePost: mobx_state_tree_1.flow(function* (postId) {
        if (self.posts.list.find((el) => el.id === postId)) {
            yield self.service._removeBotPost(self.id, postId);
            self.posts.remove(postId);
            self.totalItems -= 1;
        }
    }),
    subscribe: mobx_state_tree_1.flow(function* () {
        self.isSubscribed = true;
        self.service.profile.subscribedBots.addToTop(self);
        self.followersSize = yield self.service._subscribeBot(self.id);
    }),
    subscribeGeofence: mobx_state_tree_1.flow(function* () {
        self.isSubscribed = true;
        self.guest = true;
        self.service.profile.subscribedBots.addToTop(self);
        self.service.geofenceBots.addToTop(self);
        self.followersSize = yield self.service._subscribeGeofenceBot(self.id);
    }),
    unsubscribe: mobx_state_tree_1.flow(function* () {
        self.guest = false;
        self.isSubscribed = false;
        self.service.profile.subscribedBots.remove(self.id);
        self.followersSize = yield self.service._unsubscribeBot(self.id);
    }),
    unsubscribeGeofence: mobx_state_tree_1.flow(function* () {
        self.guest = false;
        self.service.profile.subscribedBots.remove(self.id);
        self.service.geofenceBots.remove(self.id);
        self.followersSize = yield self.service._unsubscribeGeofenceBot(self.id);
    }),
    share: (userIDs, message = '', action = 'share') => {
        self.service._shareBot(self.id, self.server || self.service.host, userIDs, message, action);
    },
    setNew: (value) => {
        self.isNew = value;
    },
    load: (d = {}) => {
        const data = Object.assign({}, d);
        if (data.addressData && typeof data.addressData === 'string') {
            data.addressData = JSON.parse(data.addressData);
            delete data.addressData;
        }
        // load visitors
        if (data.visitors) {
            self.visitors.refresh();
            data.visitors.forEach(p => self.visitors.add(self.service.profiles.get(p.id, p)));
            delete data.visitors;
        }
        Object.assign(self, data);
    }
}))
    .actions(self => ({
    shareToFriends: (message = '') => {
        self.share(['friends'], message);
    },
    shareToFollowers: (message = '') => {
        self.share(['followers'], message);
    },
    postProcessSnapshot: (snapshot) => {
        const res = Object.assign({}, snapshot);
        delete res.posts;
        delete res.error;
        delete res.subscribers;
        delete res.guests;
        return res;
    }
}))
    .views(self => ({
    get isPublic() {
        return self.visibility === exports.VISIBILITY_PUBLIC;
    },
    get coverColor() {
        return utils.hashCode(self.id);
    }
}));
exports.BotPaginableList = PaginableList_1.createPaginable(mobx_state_tree_1.types.reference(exports.Bot));
exports.BotRef = mobx_state_tree_1.types.reference(exports.Bot, {
    get(id, parent) {
        return parent.service && parent.service.bots && mobx_state_tree_1.isAlive(parent.service.bots.get(id)) && parent.service.bots.get(id);
    },
    set(value) {
        return value.id;
    }
});
//# sourceMappingURL=Bot.js.map