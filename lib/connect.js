"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var mobx_1 = require("mobx");
exports.default = mobx_state_tree_1.types
    .model("XmppConnect", {
    connected: false,
    username: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    password: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    resource: mobx_state_tree_1.types.string,
    host: mobx_state_tree_1.types.string
})
    .actions(function (self) {
    return {
        onConnect: function () { return (self.connected = true); },
        onDisconnect: function () { return (self.connected = false); }
    };
})
    .actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        afterCreate: function () {
            provider.onConnected = self.onConnect;
            provider.onDisconnected = self.onDisconnect;
        },
        login: mobx_state_tree_1.flow(function (user, password, host) {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (user) {
                            self.username = user;
                        }
                        if (password) {
                            self.password = password;
                        }
                        if (host) {
                            self.host = host;
                        }
                        return [4 /*yield*/, provider.login(self.username, self.password, self.host, self.resource)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }),
        sendStanza: provider.sendStanza,
        disconnect: mobx_state_tree_1.flow(function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider.disconnectAfterSending();
                        return [4 /*yield*/, new Promise(function (resolve) { return mobx_1.when(function () { return !self.connected; }, resolve); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        })
    };
});
//# sourceMappingURL=connect.js.map