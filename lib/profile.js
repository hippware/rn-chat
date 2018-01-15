"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var model_1 = require("./model");
var mobx_1 = require("mobx");
var register_1 = require("./register");
var USER = 'hippware.com/hxep/user';
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
function processFields(fields) {
    var result = {};
    fields.forEach(function (item) {
        if (item.var === 'roles') {
            result.roles = item.roles && item.roles.role ? item.roles.role : [];
        }
        else if (item.type === 'int') {
            result[camelize(item.var)] = parseInt(item.value);
        }
        else {
            result[camelize(item.var)] = item.value;
        }
    });
    return result;
}
exports.default = mobx_state_tree_1.types
    .compose(register_1.default, mobx_state_tree_1.types.model('XmppProfile', {
    // own profile
    profile: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(model_1.Profile)),
    profiles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(model_1.Profile), {})
}))
    .actions(function (self) {
    return {
        registerProfile: function (profile) {
            return self.profiles.put(profile) && self.profiles.get(profile.user);
        },
        unregisterProfile: function (user) { return self.profiles.delete(user); }
    };
})
    .actions(function (self) {
    return {
        loadProfile: mobx_state_tree_1.flow(function (user) {
            var isOwn, node, fields, iq_1, stanza, data, profile, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!user) {
                            throw new Error('User should not be null');
                        }
                        // try to connect
                        if (!self.connected) {
                            throw new Error('XMPP is not connected!');
                        }
                        isOwn = user === self.username;
                        node = "user/" + user;
                        fields = [
                            'avatar',
                            'handle',
                            'first_name',
                            'tagline',
                            'last_name',
                            'bots+size',
                            'followers+size',
                            'followed+size',
                            'roles'
                        ];
                        if (isOwn) {
                            fields.push('email');
                            fields.push('phone_number');
                        }
                        iq_1 = $iq({ type: 'get' }).c('get', { xmlns: USER, node: node });
                        fields.forEach(function (field) {
                            iq_1 = iq_1.c('field', { var: field }).up();
                        });
                        return [4 /*yield*/, self.sendIQ(iq_1)];
                    case 1:
                        stanza = _a.sent();
                        data = processFields(stanza.fields.field);
                        profile = self.registerProfile(tslib_1.__assign({ user: user }, data));
                        if (isOwn) {
                            self.profile = profile;
                        }
                        return [2 /*return*/, profile];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }),
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
                        return [4 /*yield*/, self.sendIQ(iq)
                            // update own profile
                        ];
                    case 1:
                        _a.sent();
                        // update own profile
                        if (!self.profile) {
                            self.profile = model_1.Profile.create({});
                        }
                        Object.assign(self.profile, d);
                        return [2 /*return*/];
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
        })
        //   loadRelations: flow(function* (profileList: ProfileList, userId: string, relation: string = 'follower') {
        //     if (profileList.loading) {
        //       return
        //     }
        //     if (profileList.finished) {
        //       return
        //     }
        //     profileList.startLoading()
        //     const iq = $iq({
        //       type: 'get',
        //       to: self.host
        //     })
        //       .c('contacts', {
        //         xmlns: 'hippware.com/hxep/user',
        //         node: `user/${userId}`
        //       })
        //       .c('association')
        //       .t(relation)
        //       .up()
        //       .c('set', { xmlns: RSM_NS })
        //       .c('max')
        //       .t(25)
        //       .up()
        //     if (profileList.lastId) {
        //       iq
        //         .c('after')
        //         .t(profileList.lastId)
        //         .up()
        //     }
        //     try {
        //       const stanza = yield self.sendIQ(iq)
        //       let children = stanza.contacts.contact
        //       if (children && !Array.isArray(children)) {
        //         children = [children]
        //       }
        //       if (children) {
        //         children.forEach(child => {
        //           const { handle, jid } = child
        //           // ignore other domains
        //           if (Strophe.getDomainFromJid(jid) !== self.host) {
        //             return
        //           }
        //           const user = Strophe.getNodeFromJid(jid)
        //           const profileToAdd: IProfile = self.registerProfile({ user, handle })
        //           console.log('PROFILE', profileToAdd)
        //           profileList.add(profileToAdd)
        //         })
        //         profileList.setLastId(stanza.contacts.set.last)
        //         if (profileList.length === parseInt(stanza.contacts.set.count)) {
        //           profileList.complete()
        //         }
        //       }
        //     } catch (error) {
        //       console.warn('REQUEST RELATIONS error:', error)
        //     } finally {
        //       profileList.stopLoading()
        //     }
        //   }),
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
//# sourceMappingURL=profile.js.map