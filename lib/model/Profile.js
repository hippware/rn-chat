"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Base_1 = require("./Base");
const PaginableList_1 = require("./PaginableList");
const Uploadable_1 = require("./Uploadable");
exports.Profile = mobx_state_tree_1.types
    .compose(Base_1.Base, Uploadable_1.createUploadable('avatar', 'all'), mobx_state_tree_1.types.model('Profile', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    avatar: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File)),
    handle: '',
    firstName: '',
    lastName: '',
    isBlocked: false,
    isFollowed: false,
    isFollower: false,
    followersSize: 0,
    followedSize: 0,
    botsSize: 0,
    roles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), [])
}))
    .volatile(self => ({
    isNew: false,
    status: 'unavailable'
}))
    .named('Profile')
    .extend(self => {
    let followers, followed, ownBots, subscribedBots;
    const { BotPaginableList } = require('./Bot');
    return {
        actions: {
            afterAttach: () => {
                followers = exports.ProfilePaginableList.create({});
                followers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'));
                followed = exports.ProfilePaginableList.create({});
                followed.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'));
                ownBots = BotPaginableList.create({});
                ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id));
                subscribedBots = BotPaginableList.create({});
                subscribedBots.setRequest(self.service._loadSubscribedBots.bind(self.service, self.id));
            }
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
                    return '(Not completed)';
                }
            }
        }
    };
});
exports.ProfilePaginableList = PaginableList_1.createPaginable(mobx_state_tree_1.types.reference(exports.Profile));
//# sourceMappingURL=Profile.js.map