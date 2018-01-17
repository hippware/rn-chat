"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
var mobx_state_tree_1 = require("mobx-state-tree");
var model_1 = require("./model");
// tslint:disable-next-line:no_unused-variable
var mobx_1 = require("mobx");
var register_1 = require("./register");
var USER = 'hippware.com/hxep/user';
var HANDLE = 'hippware.com/hxep/handle';
var RSM_NS = 'http://jabber.org/protocol/rsm';
function fromCamelCase(data) {
    if (data === void 0) { data = {}; }
    var firstName = data.firstName, userID = data.userID, phoneNumber = data.phoneNumber, lastName = data.lastName, sessionID = data.sessionID, uuid = data.uuid, result = tslib_1.__rest(data, ["firstName", "userID", "phoneNumber", "lastName", "sessionID", "uuid"]);
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
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/\s+/g, '');
}
function processMap(data) {
    var res = {};
    Object.keys(data).forEach(function (key) {
        if (data[key]) {
            res[camelize(key)] = data[key];
        }
    });
    return res;
}
var profileStore = mobx_state_tree_1.types
    .compose(register_1.default, mobx_state_tree_1.types.model('XmppProfile', {
    // own profile
    profile: mobx_state_tree_1.types.maybe(model_1.OwnProfile),
    profiles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(model_1.Profile), {})
}))
    .named('Profile')
    .actions(function (self) {
    return {
        registerProfile: function (profile) { return self.profiles.put(profile) && self.profiles.get(profile.user); },
        unregisterProfile: function (user) { return self.profiles.delete(user); }
    };
})
    .actions(function (self) {
    return {
        create: function (user, data) {
            return self.registerProfile(tslib_1.__assign({ user: user }, data));
        },
        loadProfile: mobx_state_tree_1.flow(function (user) {
            var isOwn, node, fields, iq, stanza, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user) {
                            throw new Error('User should not be null');
                        }
                        // try to connect
                        if (!self.connected) {
                            throw new Error('XMPP is not connected!');
                        }
                        isOwn = user === self.username;
                        node = "user/" + user;
                        fields = ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
                        if (isOwn) {
                            fields.push('email');
                            fields.push('phone_number');
                        }
                        iq = $iq({ type: 'get' }).c('get', { xmlns: USER, node: node });
                        fields.forEach(function (field) {
                            iq = iq.c('field', { var: field }).up();
                        });
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        stanza = _a.sent();
                        data = processMap(stanza);
                        if (isOwn) {
                            self.profile = model_1.OwnProfile.create(tslib_1.__assign({ user: user }, data));
                            return [2 /*return*/, self.profile];
                        }
                        else {
                            return [2 /*return*/, self.registerProfile(tslib_1.__assign({ user: user }, data))];
                        }
                        return [2 /*return*/];
                }
            });
        })
    };
})
    .actions(function (self) {
    return {
        updateProfile: mobx_state_tree_1.flow(function (d) {
            var data, iq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = fromCamelCase(d);
                        iq = $iq({ type: 'set' }).c('set', {
                            xmlns: USER,
                            node: "user/" + self.username
                        });
                        Object.keys(data).forEach(function (field) {
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
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        _a.sent();
                        if (self.profile) {
                            Object.assign(self.profile, d);
                        }
                        return [2 /*return*/];
                }
            });
        }),
        lookup: mobx_state_tree_1.flow(function (handle) {
            var iq, stanza, _a, jid, error, user;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        iq = $iq({ type: 'get' })
                            .c('lookup', { xmlns: HANDLE })
                            .c('item', { id: handle });
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        stanza = _b.sent();
                        _a = stanza.results.item, jid = _a.jid, error = _a.error;
                        if (error) {
                            throw error;
                        }
                        user = Strophe.getNodeFromJid(jid);
                        return [2 /*return*/, self.create(user, processMap(stanza.results.item))];
                }
            });
        }),
        remove: mobx_state_tree_1.flow(function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, self.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, self.disconnect()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }),
        loadRelations: mobx_state_tree_1.flow(function (userId, relation, lastId, max) {
            if (relation === void 0) { relation = 'following'; }
            if (max === void 0) { max = 25; }
            var iq, stanza, children, list, i, jid, user, profile;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iq = $iq({
                            type: 'get',
                            to: self.host
                        })
                            .c('contacts', {
                            xmlns: 'hippware.com/hxep/user',
                            node: "user/" + userId
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
                        return [4 /*yield*/, self.sendIQ(iq)];
                    case 1:
                        stanza = _a.sent();
                        children = stanza.contacts.contact || [];
                        if (!Array.isArray(children)) {
                            children = [children];
                        }
                        list = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < children.length)) return [3 /*break*/, 5];
                        jid = children[i].jid;
                        // ignore other domains
                        if (Strophe.getDomainFromJid(jid) !== self.host) {
                            return [2 /*return*/];
                        }
                        user = Strophe.getNodeFromJid(jid);
                        return [4 /*yield*/, self.loadProfile(user)];
                    case 3:
                        profile = _a.sent();
                        list.push(profile);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, { list: list, count: parseInt(stanza.contacts.set.count) }];
                }
            });
        })
    };
})
    .actions(function (self) {
    var handler1 = null;
    return {
        afterCreate: function () {
            return (handler1 = mobx_1.autorun(function () {
                if (self.connected && self.username) {
                    self.loadProfile(self.username);
                }
            }));
        },
        beforeDestroy: function () {
            self.profile = null;
            self.profiles.clear();
            handler1();
        }
    };
});
exports.default = profileStore;
//# sourceMappingURL=profile.js.map