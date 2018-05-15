"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Base_1 = require("./Base");
const Loadable_1 = require("./Loadable");
const PaginableList_1 = require("./PaginableList");
exports.Profile = mobx_state_tree_1.types
    .compose(Base_1.Base, Loadable_1.Loadable, mobx_state_tree_1.types.model('Profile', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    avatar: File_1.FileRef,
    handle: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    status: 'unavailable',
    firstName: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    lastName: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    isBlocked: false,
    isFollowed: false,
    isFollower: false,
    isNew: false,
    followersSize: 0,
    followedSize: 0,
    botsSize: 0,
    roles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
}))
    .named('Profile')
    .extend(self => {
    let followers, followed, ownBots, subscribedBots;
    const { BotPaginableList } = require('./Bot');
    return {
        actions: {
            afterAttach: () => {
                if (self.service) {
                    followers = exports.ProfilePaginableList.create({});
                    followers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'));
                    followed = exports.ProfilePaginableList.create({});
                    followed.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'));
                    ownBots = BotPaginableList.create({});
                    ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id));
                    subscribedBots = BotPaginableList.create({});
                    subscribedBots.setRequest(self.service._loadSubscribedBots.bind(self.service, self.id));
                    if (!self.loaded) {
                        self.service.loadProfile(self.id);
                    }
                }
            },
            follow: mobx_state_tree_1.flow(function* () {
                yield self.service._follow(self.id);
                self.isFollowed = true;
            }),
            unfollow: mobx_state_tree_1.flow(function* () {
                yield self.service._unfollow(self.id);
                self.isFollowed = false;
            }),
            block: mobx_state_tree_1.flow(function* () {
                yield self.service._block(self.id);
                self.isFollowed = false;
                self.isBlocked = true;
                self.isNew = false;
            }),
            unblock: mobx_state_tree_1.flow(function* () {
                yield self.service._unblock(self.id);
                self.isBlocked = false;
                self.isNew = false;
            }),
            setStatus: (status) => {
                self.status = status;
            },
            postProcessSnapshot: (snapshot) => {
                const res = Object.assign({}, snapshot);
                delete res.status;
                return res;
            },
        },
        views: {
            get isOwn() {
                const ownProfile = self.service.profile;
                return ownProfile && self.id === ownProfile.id;
            },
            get isVerified() {
                return self.roles.length ? self.roles.indexOf('verified') !== -1 : false;
            },
            get isMutual() {
                return self.isFollowed && self.isFollower;
            },
            get followers() {
                return followers;
            },
            get followed() {
                return followed;
            },
            get ownBots() {
                return ownBots;
            },
            get subscribedBots() {
                return subscribedBots;
            },
            get displayName() {
                if (self.firstName && self.lastName) {
                    return `${self.firstName} ${self.lastName}`;
                }
                if (self.firstName) {
                    return self.firstName;
                }
                else if (self.lastName) {
                    return self.lastName;
                }
                else if (self.handle) {
                    return self.handle;
                }
                else {
                    return ' (Not completed) ';
                }
            },
        },
    };
});
exports.ProfilePaginableList = PaginableList_1.createPaginable(mobx_state_tree_1.types.reference(exports.Profile));
exports.ProfileRef = mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(exports.Profile, {
    get(id, parent) {
        return (parent &&
            parent.service &&
            parent.service.profiles &&
            mobx_state_tree_1.isAlive(parent.service.profiles.get(id)) &&
            parent.service.profiles.get(id));
    },
    set(value) {
        return value.id;
    },
}));
//# sourceMappingURL=Profile.js.map