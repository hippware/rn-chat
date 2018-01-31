"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const File_1 = require("./File");
const Location_1 = require("./Location");
const BotPost_1 = require("./BotPost");
const moment = require("moment");
const Address_1 = require("./Address");
const utils_1 = require("../store/utils");
const Uploadable_1 = require("./Uploadable");
const Updatable_1 = require("./Updatable");
const PaginableList_1 = require("./PaginableList");
const Base_1 = require("./Base");
exports.VISIBILITY_OWNER = 0;
exports.VISIBILITY_PUBLIC = 100;
exports.Bot = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.compose(Uploadable_1.createUploadable('image', (self) => `redirect:${self.server}/bot/${self.id}`), Updatable_1.createUpdatable(self => self.service._updateBot(self))), mobx_state_tree_1.types.model('Bot', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    isSubscribed: false,
    title: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    server: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    radius: 30,
    owner: mobx_state_tree_1.types.reference(Profile_1.Profile),
    image: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File)),
    description: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    visibility: exports.VISIBILITY_PUBLIC,
    location: mobx_state_tree_1.types.maybe(Location_1.Location),
    address: '',
    followersSize: 0,
    totalItems: 0,
    time: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, () => Date.now()),
    addressData: mobx_state_tree_1.types.maybe(Address_1.Address)
}))
    .named('Bot')
    .extend(self => {
    let subscribers, posts;
    return {
        actions: {
            afterAttach: () => {
                subscribers = Profile_1.ProfilePaginableList.create({});
                subscribers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'));
                posts = BotPost_1.BotPostPaginableList.create({});
                posts.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'));
            },
            subscribe: mobx_state_tree_1.flow(function* () {
                self.isSubscribed = true;
                self.followersSize = yield self.service._subscribeBot(self.id);
            }),
            unsubscribe: mobx_state_tree_1.flow(function* () {
                self.isSubscribed = false;
                self.followersSize = yield self.service._unsubscribeBot(self.id);
            })
        },
        views: {
            get subscribers() {
                return subscribers;
            },
            get posts() {
                return posts;
            }
        }
    };
})
    .views(self => ({
    get isNew() {
        return self.server === null;
    },
    get date() {
        return new Date(self.time);
    },
    get dateAsString() {
        return moment(self.time).calendar();
    },
    get isPublic() {
        return self.visibility === exports.VISIBILITY_PUBLIC;
    },
    get coverColor() {
        return utils_1.default.hashCode(self.id);
    }
}));
exports.BotPaginableList = PaginableList_1.createPaginable(mobx_state_tree_1.types.reference(exports.Bot));
//# sourceMappingURL=Bot.js.map