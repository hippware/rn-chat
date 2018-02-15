"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const mobx_1 = require("mobx");
const Base_1 = require("../model/Base");
exports.default = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.model('XmppConnect', {
    username: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    password: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    resource: mobx_state_tree_1.types.string,
    host: mobx_state_tree_1.types.string,
    sessionCount: 0
}))
    .named('ConnectStore')
    .volatile(self => ({
    connected: false,
    connecting: false
}))
    .named('Connect')
    .actions(self => {
    return {
        onConnect: () => {
            self.connected = true;
        },
        onDisconnect: () => {
            self.connected = false;
        }
    };
})
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        setSessionCount: (count) => {
            self.sessionCount = count;
        },
        afterCreate: () => {
            provider.onConnected = self.onConnect;
            provider.onDisconnected = self.onDisconnect;
        },
        beforeDestroy: () => {
            provider.onConnected = null;
            provider.onDisconnected = null;
        },
        login: mobx_state_tree_1.flow(function* (user, password, host) {
            try {
                if (user) {
                    self.username = user;
                }
                if (password) {
                    self.password = password;
                }
                if (host) {
                    self.host = host;
                }
                self.connecting = true;
                yield provider.login(self.username, self.password, self.host, self.resource);
                self.sessionCount++;
                return true;
            }
            catch (e) {
                throw e;
            }
            finally {
                self.connecting = false;
            }
        }),
        sendStanza: provider.sendStanza,
        disconnect: mobx_state_tree_1.flow(function* () {
            provider.disconnectAfterSending();
            yield new Promise(resolve => mobx_1.when(() => !self.connected, resolve));
        })
    };
});
//# sourceMappingURL=ConnectStore.js.map