"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
var mobx_state_tree_1 = require("mobx-state-tree");
var utils_1 = require("./utils");
var message_1 = require("./message");
exports.default = mobx_state_tree_1.types.compose(message_1.default, mobx_state_tree_1.types.model('XmppRegister', {})).actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        register: mobx_state_tree_1.flow(function (data, providerName) {
            if (providerName === void 0) { providerName = 'digits'; }
            var password, error_1, d, xml, _a, user, server, token;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        password = "$J$" + JSON.stringify({
                            provider: providerName,
                            resource: self.resource,
                            token: true,
                            provider_data: data
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, provider.login('register', password, self.host, self.resource)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        provider.disconnectAfterSending();
                        d = void 0;
                        try {
                            xml = new DOMParser().parseFromString(error_1, 'text/xml').documentElement;
                            d = utils_1.default.parseXml(xml).failure;
                        }
                        catch (e) {
                            throw error_1;
                        }
                        if ('redirect' in d) {
                            _a = JSON.parse(d.text), user = _a.user, server = _a.server, token = _a.token;
                            // modify provider host to response's server
                            provider.host = server;
                            self.host = server;
                            self.username = user;
                            self.password = token;
                            return [2 /*return*/, { user: user, server: server, password: token }];
                        }
                        else {
                            throw d.text ? new Error(d.text) : error_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        })
    };
});
//# sourceMappingURL=register.js.map