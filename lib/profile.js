"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const model_1 = require("./model");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const register_1 = require("./register");
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
function processMap(data) {
    const res = {};
    Object.keys(data).forEach(key => {
        if (data[key]) {
            res[camelize(key)] = data[key];
        }
    });
    return res;
}
const profileStore = mobx_state_tree_1.types
    .compose(register_1.default, mobx_state_tree_1.types.model('XmppProfile', {
    // own profile
    profile: mobx_state_tree_1.types.maybe(model_1.OwnProfile),
    profiles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(model_1.Profile), {})
}))
    .named('Profile')
    .actions(self => {
    return {
        registerProfile: (profile) => self.profiles.put(profile) && self.profiles.get(profile.user),
        unregisterProfile: (user) => self.profiles.delete(user)
    };
})
    .actions(self => {
    return {
        create(user, data) {
            return self.registerProfile(Object.assign({ user }, data));
        },
        loadProfile: mobx_state_tree_1.flow(function* (user) {
            if (!user) {
                throw new Error('User should not be null');
            }
            // try to connect
            if (!self.connected) {
                throw new Error('XMPP is not connected!');
            }
            const isOwn = user === self.username;
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
            const data = processMap(stanza);
            if (isOwn) {
                self.profile = model_1.OwnProfile.create(Object.assign({ user }, data));
                return self.profile;
            }
            else {
                return self.registerProfile(Object.assign({ user }, data));
            }
        })
    };
})
    .actions(self => {
    return {
        updateProfile: mobx_state_tree_1.flow(function* (d) {
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
            if (self.profile) {
                Object.assign(self.profile, d);
            }
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
            return self.create(user, processMap(stanza.results.item));
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
//# sourceMappingURL=profile.js.map