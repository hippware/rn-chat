import {types, flow, getEnv} from 'mobx-state-tree';
import {when} from 'mobx';

export default types
  .model('XmppConnect', {
    connected: false,
    username: types.maybe(types.string),
    password: types.maybe(types.string),
    resource: types.string,
    host: types.string,
  })
  .actions((self) => {
    const {provider} = getEnv(self);
    return {
      onConnect: () => (self.connected = true),
      onDisconnect: () => (self.connected = false),
      afterCreate: () => {
        provider.onConnected = self.onConnect;
        provider.onDisconnected = self.onDisconnect;
      },
      login: flow(function* (user, password, host) {
        if (user) {
          self.username = user;
        }
        if (password) {
          self.password = password;
        }
        if (host) {
          self.host = host;
        }
        yield provider.login(self.username, self.password, self.host, self.resource);
      }),
      sendStanza: provider.sendStanza,
      disconnect: flow(function* () {
        provider.disconnectAfterSending();
        yield new Promise(resolve => when(() => !self.connected, resolve));
      }),
    };
  });
