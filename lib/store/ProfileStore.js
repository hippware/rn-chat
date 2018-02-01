"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("../model/Profile");
const OwnProfile_1 = require("../model/OwnProfile");
const utils_1 = require("./utils");
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
    profile: mobx_state_tree_1.types.maybe(OwnProfile_1.OwnProfile),
    profiles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(Profile_1.Profile), {})
}))
    .named('ProfileStore')
    .actions(self => ({
    registerProfile: (profile) => {
        self.profiles.put(profile);
        return self.profiles.get(profile.id);
    }
}))
    .actions(self => ({
    createProfile: (id, data = {}) => {
        if (self.profiles.get(id)) {
            Object.assign(self.profiles.get(id), Object.assign({}, data, { id }));
            return self.profiles.get(id);
        }
        else {
            const profile = Profile_1.Profile.create(Object.assign({}, data, { id }));
            return self.registerProfile(profile);
        }
    }
}))
    .actions(self => {
    return {
        unregisterProfile: (user) => self.profiles.delete(user),
        _processMap: (data) => {
            const res = {};
            Object.keys(data).forEach(key => {
                const value = data[key];
                try {
                    if (value && value !== 'null' && key !== 'field') {
                        if (key === 'roles') {
                            res.roles = Array.isArray(data.roles.role) ? data.roles.role : [data.roles.role];
                        }
                        else if (['followers', 'bots', 'followed'].indexOf(key) !== -1) {
                            res[key + 'Size'] = parseInt(data[key].size);
                        }
                        else if (data[key].thumbnail_url !== undefined) {
                            // we have image here!
                            if (data[key]['#text']) {
                                const file = self.createFile(data[key]['#text']);
                                if (data[key].thumbnail_url) {
                                    file.setURL(data[key].thumbnail_url);
                                }
                                res[key] = file;
                            }
                        }
                        else if (key === 'subscribed') {
                            res.isSubscribed = value === 'true';
                        }
                        else if (key === 'owner') {
                            res.owner = self.createProfile(Strophe.getNodeFromJid(value));
                        }
                        else if (key === 'subscribers') {
                            res.followersSize = parseInt(value.size);
                        }
                        else if (key === 'location') {
                            res.location = { latitude: parseFloat(value.geoloc.lat), longitude: parseFloat(value.geoloc.lon) };
                        }
                        else if (key === 'updated') {
                            res.time = utils_1.default.iso8601toDate(value).getTime();
                        }
                        else if (key === 'radius') {
                            res.radius = parseFloat(value);
                        }
                        else {
                            const numbers = ['image_items', 'total_items', 'visibility'];
                            res[camelize(key)] = numbers.indexOf(key) !== -1 ? parseInt(value) : value;
                        }
                    }
                }
                catch (e) {
                    console.error(`Cannot process key ${key} value: ${value}`);
                }
            });
            return res;
        }
    };
})
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
            const data = self._processMap(stanza);
            const profile = Object.assign({}, data, { id });
            let res;
            if (isOwn) {
                if (self.profile) {
                    Object.assign(self.profile, profile);
                }
                else {
                    self.profile = OwnProfile_1.OwnProfile.create(profile);
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
    .actions(self => ({
    getProfile: mobx_state_tree_1.flow(function* (id) {
        return self.profiles.get(id) || (yield self.loadProfile(id));
    })
}))
    .actions(self => {
    return {
        _requestProfiles: mobx_state_tree_1.flow(function* (users) {
            let iq = $iq({ type: 'get' }).c('users', { xmlns: USER });
            users.forEach(user => {
                iq = iq.c('user', { jid: `${user}@${self.host}` }).up();
            });
            const stanza = yield self.sendIQ(iq);
            let arr = stanza.users.user;
            if (!Array.isArray(arr)) {
                arr = [arr];
            }
            return arr.map((user) => self.createProfile(user.user, self._processMap(user)));
        }),
        _updateProfile: mobx_state_tree_1.flow(function* (d) {
            const fields = ['avatar', 'handle', 'email', 'first_name', 'tagline', 'last_name'];
            const data = fromCamelCase(d);
            let iq = $iq({ type: 'set' }).c('set', {
                xmlns: USER,
                node: `user/${self.username}`
            });
            fields.forEach(field => {
                if (data[field]) {
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
            const profile = self.createProfile(user, self._processMap(stanza.results.item));
            return profile;
        }),
        remove: mobx_state_tree_1.flow(function* () {
            yield self.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }));
            yield self.disconnect();
        }),
        _loadRelations: mobx_state_tree_1.flow(function* (userId, relation = 'following', lastId, max = 10) {
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
                const profile = yield self.getProfile(user);
                list.push(profile);
            }
            return { list, count: parseInt(stanza.contacts.set.count) };
        })
    };
})
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