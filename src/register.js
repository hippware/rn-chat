import {types, flow, getEnv} from 'mobx-state-tree';
import assert from 'assert';
import Utils from './utils';

export default types.model('XmppRegister', {}).actions(self => {
  const {provider} = getEnv(self);
  return {
    register: flow(function* (data, providerName = 'digits') {
      assert(data, 'provider_data must be defined');
      const password = `$J$${JSON.stringify({
        provider: providerName,
        resource: self.resource,
        token: true,
        provider_data: data,
      })}`;
      try {
        yield provider.login('register', password, self.host, self.resource);
      } catch (error) {
        provider.disconnectAfterSending();
        let d;
        try {
          const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
          d = Utils.parseXml(xml).failure;
        } catch (e) {
          throw error;
        }
        if ('redirect' in d) {
          const {user, server, token} = JSON.parse(d.text);
          assert(user, "register response doesn't contain user");
          assert(server, "register response doesn't contain server");
          // modify provider host to response's server
          provider.host = server;
          self.host = server;
          self.username = user;
          self.password = token;
          assert(token, "register response doesn't contain token");
          return {user, server, password: token};
        } else {
          throw d.text ? new Error(d.text) : error;
        }
      }
      throw new Error('Cannot register user');
    }),
  };
});
