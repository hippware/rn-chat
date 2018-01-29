"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const utils_1 = require("./utils");
const Profile_1 = require("../model/Profile");
const ProfileStore_1 = require("./ProfileStore");
const ROSTER = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__blocked__';
exports.default = mobx_state_tree_1.types
    .compose(ProfileStore_1.default, mobx_state_tree_1.types.model('XmppRoster', {
    // roster might work better as a map: https://mobx.js.org/refguide/map.html
    roster: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(Profile_1.Profile)), [])
}))
    .views(self => ({
    get sortedRoster() {
        return self.roster.filter(x => x.handle).sort((a, b) => {
            return a.handle.toLocaleLowerCase().localeCompare(b.handle.toLocaleLowerCase());
        });
    }
}))
    .views(self => ({
    get all() {
        return self.sortedRoster.filter(x => !x.isBlocked);
    },
    get followers() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower);
    },
    get newFollowers() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower && x.isNew);
    },
    get followed() {
        return self.sortedRoster.filter(x => !x.isBlocked && x.isFollowed);
    }
}))
    .named('Roster')
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        sendPresence: provider.sendPresence,
        processItem: (item = {}) => {
            const { handle, roles, avatar, jid, group, subscription, ask, created_at } = item, props = tslib_1.__rest(item, ["handle", "roles", "avatar", "jid", "group", "subscription", "ask", "created_at"]);
            const firstName = props.first_name;
            const lastName = props.last_name;
            // ignore other domains
            if (Strophe.getDomainFromJid(jid) !== self.host) {
                return;
            }
            const id = Strophe.getNodeFromJid(jid);
            const createdTime = utils_1.default.iso8601toDate(created_at).getTime();
            const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
            const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
            const existed = self.roster.findIndex(u => u.id === id);
            const rolesArr = roles && roles.role ? (Array.isArray(roles.role) ? roles.role : [roles.role]) : [];
            const data = {
                id,
                firstName,
                lastName,
                handle,
                avatar,
                roles: rolesArr,
                isNew: groups.includes(NEW_GROUP) && days <= 7,
                isBlocked: group === BLOCKED_GROUP,
                isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
                isFollower: subscription === 'from' || subscription === 'both'
            };
            if (avatar) {
                self.createFile(avatar);
            }
            self.createProfile(id, data);
            if (existed === -1) {
                self.roster.push(self.profiles.get(id));
            }
        }
    };
})
    .actions(self => {
    return {
        addToRoster: mobx_state_tree_1.flow(function* (username, group) {
            const iq = $iq({ type: 'set', to: `${self.username}@${self.host}` })
                .c('query', { xmlns: ROSTER })
                .c('item', { jid: `${username}@${self.host}` })
                .c('group')
                .t(group);
            yield self.sendIQ(iq);
        }),
        removeFromRoster: mobx_state_tree_1.flow(function* (username) {
            const iq = $iq({ type: 'set', to: `${self.username}@${self.host}` })
                .c('query', { xmlns: ROSTER })
                .c('item', { jid: `${username}@${self.host}`, subscription: 'remove' });
            yield self.sendIQ(iq);
        })
    };
})
    .actions(self => {
    const { logger } = mobx_state_tree_1.getEnv(self);
    return {
        onPresence: (stanza) => {
            try {
                const id = utils_1.default.getNodeJid(stanza.from);
                if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
                    const status = stanza.type || 'available';
                    const profile = self.profiles.get(id);
                    if (profile) {
                        profile.status = status;
                    }
                    else {
                        self.profiles.put(Profile_1.Profile.create({ id, status }));
                    }
                }
            }
            catch (e) {
                logger.log('error onPresence: ', e);
            }
        },
        follow: mobx_state_tree_1.flow(function* (profile) {
            const username = profile.id;
            yield self.addToRoster(username, '');
            self.sendPresence({ to: `${username}@${self.host}`, type: 'subscribe' });
            profile.isFollowed = true;
        }),
        unfollow: mobx_state_tree_1.flow(function* (profile) {
            const username = profile.id;
            yield self.removeFromRoster(username);
            self.sendPresence({ to: `${username}@${self.host}`, type: 'unsubscribe' });
            profile.isFollowed = false;
        }),
        block: mobx_state_tree_1.flow(function* (profile) {
            const username = profile.id;
            yield self.addToRoster(username, BLOCKED_GROUP);
            profile.isFollowed = false;
            profile.isBlocked = true;
            profile.isNew = false;
        }),
        unblock: mobx_state_tree_1.flow(function* (profile) {
            const username = profile.id;
            yield self.addToRoster(username, '');
            profile.isBlocked = false;
            profile.isNew = false;
        }),
        requestRoster: mobx_state_tree_1.flow(function* () {
            const iq = $iq({ type: 'get', to: `${self.username}@${self.host}` }).c('query', {
                xmlns: ROSTER
            });
            const stanza = yield self.sendIQ(iq);
            let children = stanza.query.item;
            if (children && !Array.isArray(children)) {
                children = [children];
            }
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    self.processItem(children[i]);
                }
            }
        })
    };
})
    .actions(self => {
    let handler1, handler2;
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        followAll: mobx_state_tree_1.flow(function* (profiles) {
            for (let i = 0; i < profiles.length; i++) {
                yield self.follow(profiles[i]);
            }
        }),
        afterCreate: () => {
            handler1 = mobx_1.autorun('roster.handler1', () => {
                if (self.iq && self.iq.query && self.iq.query.item && !Array.isArray(self.iq.query.item) && self.iq.query.item.jid) {
                    self.processItem(self.iq.query.item);
                }
            });
            handler2 = mobx_1.autorun('roster.handler2', () => {
                if (self.connected) {
                    self.requestRoster();
                }
                else {
                    self.roster.forEach(p => {
                        if (mobx_state_tree_1.isAlive(p)) {
                            p.status = 'unavailable';
                        }
                    });
                }
            });
            provider.onPresence = self.onPresence;
        },
        beforeDestroy: () => {
            provider.onPresence = null;
            handler1();
            handler2();
            self.roster.clear();
        }
    };
});
//# sourceMappingURL=RosterStore.js.map