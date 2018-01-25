"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("../model/Profile");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const FileStore_1 = require("./FileStore");
const USER = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
const RSM_NS = 'http://jabber.org/protocol/rsm';
function fromCamelCase(data = {}) {
    const { firstName, userID, phoneNumber, lastName, sessionID, uuid } = data, result = tslib_1.__rest(data, ["firstName", "userID", "phoneNumber", "lastName", "sessionID", "uuid"]);
    if (phoneNumber) {
        result.phone_number = phoneNumber;
        result.phoneNumber = phoneNumber;
    }
    if (userID) {
        result.auth_user = userID;
    }
    if (firstName) {
        result.first_name = firstName;
    }
    if (lastName) {
        result.last_name = lastName;
    }
    if (sessionID) {
        result.token = sessionID;
    }
    if (uuid) {
        result.user = uuid;
    }
    return result;
}
function camelize(str) {
    return str
        .replace(/\W|_|\d/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/\s+/g, '');
}
const profileStore = mobx_state_tree_1.types
    .compose(FileStore_1.FileStore, mobx_state_tree_1.types.model('XmppProfile', {
    // own profile
    profile: mobx_state_tree_1.types.maybe(Profile_1.OwnProfile),
    profiles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(Profile_1.Profile), {})
}))
    .named('ProfileStore')
    .actions(self => {
    return {
        getProfile: (id) => {
            return self.profiles.get(id);
        },
        registerProfile: (profile) => {
            self.profiles.put(profile);
            return self.profiles.get(profile.id);
        },
        unregisterProfile: (user) => self.profiles.delete(user),
        processMap: (data) => {
            const res = {};
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    if (key === 'roles') {
                        res.roles = Array.isArray(data.roles.role) ? data.roles.role : [data.roles.role];
                    }
                    else if (['followers', 'bots', 'followed'].indexOf(key) !== -1) {
                        res[key + 'Size'] = parseInt(data[key].size);
                    }
                    else if (key === 'avatar' && data.avatar) {
                        const avatar = {};
                        // full URL is useless because app may need it after allowed timeout (when user enters to bot details, etc)
                        // if (data.avatar.full_url) {
                        //   avatar.source = {uri: data.avatar.full_url}
                        // }
                        if (data.avatar.thumbnail_url) {
                            avatar.url = data.avatar.thumbnail_url;
                        }
                        res.avatar = self.createFile(data.avatar['#text'], avatar);
                    }
                    else {
                        res[camelize(key)] = data[key];
                    }
                }
            });
            return res;
        }
    };
})
    .actions(self => ({
    createProfile: (id, data) => {
        if (self.getProfile(id)) {
            Object.assign(self.getProfile(id), data);
            return self.getProfile(id);
        }
        else {
            const profile = Profile_1.Profile.create(Object.assign({}, data, { id }));
            return self.registerProfile(profile);
        }
    }
}))
    .actions(self => {
    return {
        loadProfile: mobx_state_tree_1.flow(function* (user) {
            const id = user;
            const isOwn = id === self.username;
            const node = `user/${user}`;
            const fields = ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
            if (isOwn) {
                fields.push('email');
                fields.push('phone_number');
            }
            let iq = $iq({ type: 'get' }).c('get', { xmlns: USER, node });
            fields.forEach(field => {
                iq = iq.c('field', { var: field }).up();
            });
            const stanza = yield self.sendIQ(iq);
            const data = self.processMap(stanza);
            const profile = Object.assign({}, data, { id });
            let res;
            if (isOwn) {
                if (self.profile) {
                    Object.assign(self.profile, profile);
                }
                else {
                    self.profile = Profile_1.OwnProfile.create(profile);
                }
                self.createProfile(id, profile);
                res = self.profile;
            }
            else {
                res = self.createProfile(id, profile);
            }
            return res;
        })
    };
})
    .actions(self => {
    return {
        updateProfile: mobx_state_tree_1.flow(function* (d) {
            // load profile if it is not loaded yet
            if (!self.profile) {
                yield self.loadProfile(self.username);
            }
            const data = fromCamelCase(d);
            let iq = $iq({ type: 'set' }).c('set', {
                xmlns: USER,
                node: `user/${self.username}`
            });
            Object.keys(data).forEach(field => {
                if (Object.prototype.hasOwnProperty.call(data, field) && data[field]) {
                    iq = iq
                        .c('field', {
                        var: field,
                        type: field === 'avatar' ? 'file' : 'string'
                    })
                        .c('value')
                        .t(data[field])
                        .up()
                        .up();
                }
            });
            yield self.sendIQ(iq);
            Object.assign(self.profile, d);
        }),
        lookup: mobx_state_tree_1.flow(function* (handle) {
            const iq = $iq({ type: 'get' })
                .c('lookup', { xmlns: HANDLE })
                .c('item', { id: handle });
            const stanza = yield self.sendIQ(iq);
            const { jid, error } = stanza.results.item;
            if (error) {
                throw error;
            }
            const user = Strophe.getNodeFromJid(jid);
            const profile = self.createProfile(user, self.processMap(stanza.results.item));
            return profile;
        }),
        remove: mobx_state_tree_1.flow(function* () {
            yield self.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }));
            yield self.disconnect();
        }),
        loadRelations: mobx_state_tree_1.flow(function* (userId, relation = 'following', lastId, max = 25) {
            const iq = $iq({
                type: 'get',
                to: self.host
            })
                .c('contacts', {
                xmlns: 'hippware.com/hxep/user',
                node: `user/${userId}`
            })
                .c('association')
                .t(relation)
                .up()
                .c('set', { xmlns: RSM_NS })
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('after')
                    .t(lastId)
                    .up();
            }
            const stanza = yield self.sendIQ(iq);
            let children = stanza.contacts.contact || [];
            if (!Array.isArray(children)) {
                children = [children];
            }
            const list = [];
            for (let i = 0; i < children.length; i++) {
                const { jid } = children[i];
                // ignore other domains
                if (Strophe.getDomainFromJid(jid) !== self.host) {
                    return;
                }
                const user = Strophe.getNodeFromJid(jid);
                // TODO avoid extra request to load profile (server-side)
                const profile = yield self.loadProfile(user);
                list.push(profile);
            }
            return { list, count: parseInt(stanza.contacts.set.count) };
        })
    };
})
    .actions(self => ({
    uploadAvatar: mobx_state_tree_1.flow(function* ({ file, size, width, height }) {
        const url = yield self.requestUpload({ file, size, width, height, access: 'all' });
        yield self.updateProfile({ avatar: url });
    })
}))
    .actions(self => {
    let handler1 = null;
    return {
        afterCreate: () => (handler1 = mobx_1.autorun(() => {
            if (self.connected && self.username) {
                self.loadProfile(self.username);
            }
        })),
        beforeDestroy: () => {
            self.profile = null;
            self.profiles.clear();
            handler1();
        }
    };
});
exports.default = profileStore;
//# sourceMappingURL=ProfileStore.js.map