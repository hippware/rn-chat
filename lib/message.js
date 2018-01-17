"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var iq_1 = require("./iq");
var MEDIA = 'hippware.com/hxep/media';
exports.default = mobx_state_tree_1.types
    .compose(iq_1.default, mobx_state_tree_1.types.model('XmppMessage', {
    message: mobx_state_tree_1.types.frozen
}))
    .named('Message')
    .actions(function (self) {
    return {
        onMessage: function (message) { return (self.message = message); }
    };
})
    .actions(function (self) {
    var provider = mobx_state_tree_1.getEnv(self).provider;
    return {
        afterCreate: function () {
            self.message = {};
            provider.onMessage = self.onMessage;
        },
        sendMessage: function (msg) {
            var stanza = $msg({
                to: msg.to + "@" + self.host,
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
//# sourceMappingURL=message.js.map