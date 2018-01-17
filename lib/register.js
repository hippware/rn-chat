"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const utils_1 = require("./utils");
const message_1 = require("./message");
exports.default = mobx_state_tree_1.types
    .compose(message_1.default, mobx_state_tree_1.types.model('XmppRegister', {}))
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        register: mobx_state_tree_1.flow(function* (data, providerName = 'digits') {
            const password = `$J$${JSON.stringify({
                provider: providerName,
                resource: self.resource,
                token: true,
                provider_data: data
            })}`;
            try {
                yield provider.login('register', password, self.host, self.resource);
            }
            catch (error) {
                provider.disconnectAfterSending();
                let d;
                try {
                    const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
                    d = utils_1.default.parseXml(xml).failure;
                }
                catch (e) {
                    throw error;
                }
                if ('redirect' in d) {
                    const { user, server, token } = JSON.parse(d.text);
                    // modify provider host to response's server
                    provider.host = server;
                    self.host = server;
                    self.username = user;
                    self.password = token;
                    return { user, server, password: token };
                }
                else {
                    throw d.text ? new Error(d.text) : error;
                }
            }
        })
    };
})
    .actions(self => {
    return {
        testRegister: mobx_state_tree_1.flow(function* testRegister({ phoneNumber }) {
            try {
                yield self.register({
                    userID: `000000${phoneNumber}`,
                    phoneNumber: `+1555${phoneNumber}`,
                    authTokenSecret: '',
                    authToken: '',
                    emailAddressIsVerified: false,
                    'X-Auth-Service-Provider': 'http://localhost:9999',
                    emailAddress: '',
                    'X-Verify-Credentials-Authorization': ''
                });
                return true;
            }
            catch (error) {
                console.log('testRegister error', error);
            }
            return false;
        })
    };
});
//# sourceMappingURL=register.js.map