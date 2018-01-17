"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
var mobx_state_tree_1 = require("mobx-state-tree");
var utils_1 = require("./utils");
var mobx_1 = require("mobx");
var connect_1 = require("./connect");
var iqStore = mobx_state_tree_1.types
    .compose(connect_1.default, mobx_state_tree_1.types.model('XmppIQ', {
    iq: mobx_state_tree_1.types.frozen
}))
    .named('IQ')
    .actions(function (self) {
    return {
        onIQ: function (iq) { return (self.iq = iq); }
    };
})
    .actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        afterCreate: function () {
            self.iq = {};
            provider.onIQ = self.onIQ;
        },
        sendIQ: mobx_state_tree_1.flow(function (data, withoutTo) {
            if (withoutTo === void 0) { withoutTo = false; }
            var id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.tree().getAttribute('id')) {
                            data.tree().setAttribute('id', utils_1.default.getUniqueId('iq'));
                        }
                        if (!data.tree().getAttribute('to') && !withoutTo) {
                            data.tree().setAttribute('to', self.host);
                        }
                        if (!data.tree().getAttribute('from')) {
                            data.tree().setAttribute('from', self.username + "@" + self.host);
                        }
                        id = data.tree().getAttribute('id');
                        provider.sendIQ(data);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                return mobx_1.when(function () { return self.iq && self.iq.id === id; }, function () {
                                    var stanza = self.iq;
                                    if (stanza.type === 'error') {
                                        reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error);
                                    }
                                    else {
                                        resolve(stanza);
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        })
    };
});
exports.default = iqStore;
//# sourceMappingURL=iq.js.map