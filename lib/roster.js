"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var mobx_1 = require("mobx");
var utils_1 = require("./utils");
var model_1 = require("./model");
var profile_1 = require("./profile");
var ROSTER = 'jabber:iq:roster';
var NEW_GROUP = '__new__';
var BLOCKED_GROUP = '__blocked__';
exports.default = mobx_state_tree_1.types
    .compose(profile_1.default, mobx_state_tree_1.types.model('XmppRoster', {
    roster: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(model_1.Profile)), [])
}))
    .actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        sendPresence: provider.sendPresence,
        processItem: function (item) {
            if (item === void 0) { item = {}; }
            var handle = item.handle, roles = item.roles, avatar = item.avatar, jid = item.jid, group = item.group, subscription = item.subscription, ask = item.ask, created_at = item.created_at, props = tslib_1.__rest(item, ["handle", "roles", "avatar", "jid", "group", "subscription", "ask", "created_at"]);
            var firstName = props.first_name;
            var lastName = props.last_name;
            // ignore other domains
            if (Strophe.getDomainFromJid(jid) !== self.host) {
                return;
            }
            var user = Strophe.getNodeFromJid(jid);
            var createdTime = utils_1.default.iso8601toDate(created_at).getTime();
            var days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
            var groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
            var existed = self.roster.findIndex(function (u) { return u.user === user; });
            var data = {
                user: user,
                firstName: firstName,
                lastName: lastName,
                handle: handle,
                avatar: avatar,
                roles: roles && roles.role,
                isNew: groups.includes(NEW_GROUP) && days <= 7,
                isBlocked: group === BLOCKED_GROUP,
                isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
                isFollower: subscription === 'from' || subscription === 'both'
            };
            var profile = self.profiles.get(user);
            if (profile) {
                Object.assign(profile, data);
            }
            else {
                self.registerProfile(model_1.Profile.create(data));
            }
            if (existed === -1) {
                self.roster.push(self.profiles.get(user));
            }
        }
    };
})
    .actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        onPresence: function (stanza) {
            try {
                var user = utils_1.default.getNodeJid(stanza.from);
                if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
                    var status_1 = stanza.type || 'available';
                    var profile = self.profiles.get(user);
                    if (profile) {
                        profile.status = status_1;
                    }
                    else {
                        self.profiles.put(model_1.Profile.create({ user: user, status: status_1 }));
                    }
                }
            }
            catch (e) {
                console.warn(e);
            }
        },
        addToRoster: mobx_state_tree_1.flow(function (username, group) {
            if (group === void 0) { group = ''; }
            var iq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self.sendPresence({ to: username + "@" + self.host, type: 'subscribe' });
                        iq = $iq({ type: 'set', to: self.username + "@" + self.host })
                            .c('query', { xmlns: ROSTER })
                            .c('item', { jid: username + "@" + self.host })
                            .c('group')
                            .t(group);
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }),
        removeFromRoster: mobx_state_tree_1.flow(function (username) {
            var iq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iq = $iq({ type: 'set', to: self.username + "@" + self.host })
                            .c('query', { xmlns: ROSTER })
                            .c('item', { jid: username + "@" + self.host, subscription: 'remove' });
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        _a.sent();
                        self.sendPresence({ to: username + "@" + self.host, type: 'unsubscribe' });
                        return [2 /*return*/];
                }
            });
        }),
        requestRoster: mobx_state_tree_1.flow(function () {
            var iq, stanza, children, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iq = $iq({ type: 'get', to: self.username + "@" + self.host }).c('query', {
                            xmlns: ROSTER
                        });
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        stanza = _a.sent();
                        children = stanza.query.item;
                        if (children && !Array.isArray(children)) {
                            children = [children];
                        }
                        if (children) {
                            for (i = 0; i < children.length; i++) {
                                self.processItem(children[i]);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        })
    };
})
    .actions(function (self) {
    var handler1, handler2;
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        afterCreate: function () {
            handler1 = mobx_1.autorun(function () {
                if (self.iq.query &&
                    self.iq.query.item &&
                    !Array.isArray(self.iq.query.item) &&
                    self.iq.query.item.jid) {
                    self.processItem(self.iq.query.item);
                }
            });
            handler2 = mobx_1.autorun(function () {
                if (self.connected) {
                    self.requestRoster();
                }
                else {
                    self.roster.forEach(function (p) { return (p.status = 'unavailable'); });
                }
            });
            provider.onPresence = self.onPresence;
        },
        beforeDestroy: function () {
            provider.onPresence = null;
            handler1();
            handler2();
        }
    };
});
//# sourceMappingURL=roster.js.map