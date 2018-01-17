import { types, flow, getEnv, IModelType } from "mobx-state-tree";
import { when } from "mobx";

const connect = types
// export default types
  .model("XmppConnect", {
    // connected: false,
    username: types.maybe(types.string),
    password: types.maybe(types.string),
    resource: types.string,
    host: types.string,
    // possibly should be set as 'volatile' state (?)
    connected: false,
    connecting: false,
  })
  .named('Connect')
  .actions(self => ({
    onConnect: () => {
      self.connected = true;
      self.connecting = false;
    },
    onDisconnect: () => {
      self.connected = false
      self.connecting = false
    }
  }))
  .actions(self => {
    const { provider, logger } = getEnv(self);

    function afterCreate() {
      self.connected = false
      self.connecting = false
      provider.onConnected = self.onConnect;
      provider.onDisconnected = self.onDisconnect;
    }

    const login = flow(function* login(user?: string, password?: string, host?: string) {
      logger.log('WOCKY: ProfileStore.login');
      if (user) {
        self.username = user;
      }
      if (password) {
        self.password = password;
      }
      if (host) {
        self.host = host;
      }
      try {
        yield provider.login(
          self.username,
          self.password,
          self.host,
          self.resource
        );
        logger.log('WOCKY: logged in');
        // return self.profile
        return true
      } catch (error) {
        // TODO: inject analytics?
        // analyticsStore.track('error_connection', {error});
        console.log('WOCKY login error:', error);
        throw error;
      }
    });

    const sendStanza = provider.sendStanza

    const disconnect = flow(function*() {
      provider.disconnectAfterSending();
      yield new Promise(resolve => when(() => !self.connected, resolve));
    });

    return {afterCreate, login, sendStanza, disconnect};
  });

export default connect;