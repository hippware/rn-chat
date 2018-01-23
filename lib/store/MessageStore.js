"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const IQStore_1 = require("./IQStore");
const MEDIA = 'hippware.com/hxep/media';
exports.default = mobx_state_tree_1.types
    .compose(IQStore_1.default, mobx_state_tree_1.types.model('XmppMessage', {
    message: mobx_state_tree_1.types.frozen
}))
    .named('MessageStore')
    .actions(self => {
    return {
        onMessage: (message) => (self.message = message)
    };
})
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        afterCreate: () => {
            self.message = {};
            provider.onMessage = self.onMessage;
        },
        sendMessage: (msg) => {
            let stanza = $msg({
                to: `${msg.to}@${self.host}`,
                type: 'chat',
                id: msg.id
            })
                .c('body')
                .t(msg.body || '');
            if (msg.media) {
                stanza = stanza
                    .up()
                    .c('image', { xmlns: MEDIA })
                    .c('url')
                    .t(msg.media);
            }
            provider.sendStanza(stanza);
        }
    };
});
//# sourceMappingURL=MessageStore.js.map