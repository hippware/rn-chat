"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const paging_1 = require("./paging");
const utils_1 = require("./utils");
exports.SERVICE_NAME = 'WockyClient';
// Base class for entities that want access to parent wocky service
exports.Base = mobx_state_tree_1.types.model('Base', {}).views(self => ({
    get service() {
        let target = self;
        while (mobx_state_tree_1.getParent(target) && mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name !== exports.SERVICE_NAME) {
            target = mobx_state_tree_1.getParent(target);
        }
        return mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name === exports.SERVICE_NAME ? mobx_state_tree_1.getParent(target) : null;
    }
}));
exports.Status = mobx_state_tree_1.types.enumeration('status', ['available', 'unavailable']);
exports.FileSource = mobx_state_tree_1.types
    .model('FileSource', {
    uri: mobx_state_tree_1.types.string,
    contentType: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    width: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    height: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    cached: false
})
    .named('FileSource');
exports.File = mobx_state_tree_1.types
    .compose(exports.Base, mobx_state_tree_1.types.model('File', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    item: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    source: mobx_state_tree_1.types.maybe(exports.FileSource),
    thumbnail: mobx_state_tree_1.types.maybe(exports.FileSource),
    url: '',
    isNew: false
}))
    .named('File')
    .volatile(self => ({
    loading: false
}))
    .views(self => ({
    get loaded() {
        return self.source !== null;
    }
}))
    .actions(self => {
    return {
        downloadThumbnail: mobx_state_tree_1.flow(function* () {
            const service = self.service;
            if (!self.loading && !self.thumbnail && self.url) {
                try {
                    self.loading = true;
                    self.thumbnail = yield self.service.downloadThumbnail(self.url, self.id);
                    self.url = '';
                }
                catch (e) {
                    console.warn(e);
                }
                finally {
                    self.loading = false;
                }
            }
        }),
        download: mobx_state_tree_1.flow(function* () {
            if (!self.source && !self.loading) {
                try {
                    self.loading = true;
                    self.source = yield self.service.downloadTROS(self.id);
                    self.thumbnail = self.source;
                }
                catch (e) {
                    console.warn(e);
                }
                finally {
                    self.loading = false;
                }
            }
        })
    };
})
    .actions(self => ({
    afterAttach: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.service.connected);
        if (!self.thumbnail) {
            if (self.url) {
                yield self.downloadThumbnail();
            }
            else {
                yield self.download();
            }
        }
    })
}));
exports.Profile = mobx_state_tree_1.types
    .compose(exports.Base, mobx_state_tree_1.types.model('Profile', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    avatar: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(exports.File)),
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
                (followers = paging_1.PaginableList.create({}, { request: self.service.loadRelations.bind(self.service, self.id, 'follower') })));
        },
        get followed() {
            return (followed ||
                (followed = paging_1.PaginableList.create({}, { request: self.service.loadRelations.bind(self.service, self.id, 'following') })));
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
//# sourceMappingURL=model.js.map