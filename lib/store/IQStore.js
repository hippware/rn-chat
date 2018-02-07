"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const utils_1 = require("./utils");
const mobx_1 = require("mobx");
const ConnectStore_1 = require("./ConnectStore");
const iqStore = mobx_state_tree_1.types
    .compose(ConnectStore_1.default, mobx_state_tree_1.types.model('XmppIQ', {}))
    .volatile(self => ({ iq: {} }))
    .named('IQStore')
    .actions(self => {
    return {
        onIQ: (iq) => {
            self.iq = iq;
        }
    };
})
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        afterCreate: () => {
            self.iq = {};
            provider.onIQ = self.onIQ;
        },
        sendIQ: mobx_state_tree_1.flow(function* (data, withoutTo = false) {
            if (!data.tree().getAttribute('id')) {
                data.tree().setAttribute('id', utils_1.default.getUniqueId('iq'));
            }
            if (!data.tree().getAttribute('to') && !withoutTo) {
                data.tree().setAttribute('to', self.host);
            }
            if (!data.tree().getAttribute('from')) {
                data.tree().setAttribute('from', `${self.username}@${self.host}`);
            }
            const id = data.tree().getAttribute('id');
            provider.sendIQ(data);
            return yield new Promise((resolve, reject) => mobx_1.when(() => self.iq && self.iq.id === id, () => {
                const stanza = self.iq;
                if (stanza.type === 'error') {
                    reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error);
                    // reject('ERROR for stanza: ' + data.toString() + ' ' + (stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error))
                }
                else {
                    resolve(stanza);
                }
            }));
        })
    };
});
exports.default = iqStore;
//# sourceMappingURL=IQStore.js.map