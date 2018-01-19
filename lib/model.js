"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const paging_1 = require("./paging");
exports.Status = mobx_state_tree_1.types.enumeration('status', ['available', 'unavailable']);
exports.Image = mobx_state_tree_1.types
    .model('Image', {
    tros: mobx_state_tree_1.types.string,
    url: mobx_state_tree_1.types.string,
    thumbnail: mobx_state_tree_1.types.string // S3 URL that will be replaced to local path after loading
})
    .actions(self => {
    return {
        setURL: (url) => (self.url = url),
        setThumbnail: (thumbnail) => (self.thumbnail = thumbnail)
    };
});
exports.Profile = mobx_state_tree_1.types
    .model('Profile', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    // avatar: types.maybe(Image),
    // NOTE: causes errors after staging push
    // avatar: '',
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
})
    .views(self => {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    let followers, followed;
    return {
        get isOwn() {
            const ownProfile = mobx_state_tree_1.getParent(self).profile;
            // parent is Profile map if self is not own profile
            // not the cleanest, but it works
            return ownProfile && self.id === ownProfile.id;
        },
        get followers() {
            return followers || (followers = paging_1.create(self, 'loadRelations', self.id, 'follower'));
        },
        get followed() {
            return followed || (followed = paging_1.create(self, 'loadRelations', self.id, 'following'));
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
exports.OwnProfile = mobx_state_tree_1.types.compose(exports.Profile, mobx_state_tree_1.types.model('OwnProfile', {
    email: '',
    phoneNumber: ''
}));
//# sourceMappingURL=model.js.map