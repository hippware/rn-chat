"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var mobx_1 = require("mobx");
var connect = mobx_state_tree_1.types
    .model("XmppConnect", {
    // connected: false,
    username: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    password: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    resource: mobx_state_tree_1.types.string,
    host: mobx_state_tree_1.types.string,
    // possibly should be set as 'volatile' state (?)
    connected: false,
    connecting: false,
})
    .named('Connect')
    .actions(function (self) { return ({
    onConnect: function () {
        self.connected = true;
        self.connecting = false;
    },
    onDisconnect: function () {
        self.connected = false;
        self.connecting = false;
    }
}); })
    .actions(function (self) {
    var _a = mobx_state_tree_1.getEnv(self), provider = _a.provider, logger = _a.logger;
    function afterCreate() {
        self.connected = false;
        self.connecting = false;
        provider.onConnected = self.onConnect;
        provider.onDisconnected = self.onDisconnect;
    }
    var login = mobx_state_tree_1.flow(function login(user, password, host) {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log('WOCKY: ProfileStore.login');
                    if (user) {
                        self.username = user;
                    }
                    if (password) {
                        self.password = password;
                    }
                    if (host) {
                        self.host = host;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, provider.login(self.username, self.password, self.host, self.resource)];
                case 2:
                    _a.sent();
                    logger.log('WOCKY: logged in');
                    // return self.profile
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    // TODO: inject analytics?
                    // analyticsStore.track('error_connection', {error});
                    console.log('WOCKY login error:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
    var sendStanza = provider.sendStanza;
    var disconnect = mobx_state_tree_1.flow(function () {
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
    });
    return { afterCreate: afterCreate, login: login, sendStanza: sendStanza, disconnect: disconnect };
});
exports.default = connect;
//# sourceMappingURL=connect.js.map