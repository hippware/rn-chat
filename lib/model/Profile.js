"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Base_1 = require("./Base");
const PaginableList_1 = require("./PaginableList");
exports.Status = mobx_state_tree_1.types.enumeration('status', ['available', 'unavailable']);
exports.Profile = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.model('Profile', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    avatar: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File)),
    handle: '',
    firstName: '',
    lastName: '',
    isBlocked: false,
    isFollowed: false,
    isFollower: false,
    isNew: false,
    status: mobx_state_tree_1.types.optional(exports.Status, 'unavailable'),
    followersSize: 0,
    followedSize: 0,
    botsSize: 0,
    roles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), [])
}))
    .views(self => {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    let followers, followed;
    return {
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
            return (followers ||
                (followers = PaginableList_1.PaginableList.create({}, { request: self.service.loadRelations.bind(self.service, self.id, 'follower') })));
        },
        get followed() {
            return (followed ||
                (followed = PaginableList_1.PaginableList.create({}, { request: self.service.loadRelations.bind(self.service, self.id, 'following') })));
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
    };
});
exports.OwnProfile = mobx_state_tree_1.types.compose(exports.Profile, mobx_state_tree_1.types
    .model('OwnProfile', {
    email: '',
    phoneNumber: ''
})
    .named('OwnProfile'));
//# sourceMappingURL=Profile.js.map