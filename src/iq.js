import {types, flow, getEnv} from 'mobx-state-tree';
import Utils from './utils';
import assert from 'assert';
import {when} from 'mobx';

export default types
  .model('XmppIQ', {
    iq: types.frozen,
  })
  .actions(self => {
    const {provider} = getEnv(self);
    return {
      afterCreate: () => {
        self.iq = {};
        provider.onIQ = self.onIQ;
      },
      onIQ: iq => (self.iq = iq),
      sendIQ: flow(function* (data, withoutTo) {
        if (!data.tree().getAttribute('id')) {
          data.tree().setAttribute('id', Utils.getUniqueId('iq'));
        }
        if (!data.tree().getAttribute('to') && !withoutTo) {
          assert(self.host, 'Host should be not null!');
          data.tree().setAttribute('to', self.host);
        }
        if (!data.tree().getAttribute('from')) {
          assert(self.username, 'No provider.username is defined');
          data.tree().setAttribute('from', `${self.username}@${self.host}`);
        }
        const id = data.tree().getAttribute('id');
        provider.sendIQ(data);
        return yield new Promise((resolve, reject) =>
          when(
            () => self.iq && self.iq.id === id,
            () => {
              const stanza = self.iq;
              if (stanza.type === 'error') {
                reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error);
              } else {
                resolve(stanza);
              }
            },
          ));
      }),
    };
  });
