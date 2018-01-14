import {types, getEnv} from 'mobx-state-tree';
import assert from 'assert';

const MEDIA = 'hippware.com/hxep/media';

export default types
  .model('XmppMessage', {
    message: types.frozen,
  })
  .actions(self => {
    const {provider} = getEnv(self);
    return {
      afterCreate: () => {
        self.message = {};
        provider.onMessage = self.onMessage;
      },
      onMessage: message => (self.message = message),
      sendMessage: msg => {
        assert(msg, 'msg is not defined');
        assert(msg.to, 'msg.to is not defined');
        let stanza = $msg({
          to: `${msg.to}@${self.host}`,
          type: 'chat',
          id: msg.id,
        })
          .c('body')
          .t(msg.body || '');
        if (msg.media) {
          stanza = stanza
            .up()
            .c('image', {xmlns: MEDIA})
            .c('url')
            .t(msg.media);
        }
        provider.sendStanza(stanza);
      },
    };
  });
