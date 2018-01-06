import {types, flow, getEnv} from 'mobx-state-tree';
import assert from 'assert';
import Utils from './utils';

const XmppStore = types
  .model('XmppStore', {})
  .actions(self => ({
    register: flow(function* (resource, provider_data, providerName = 'digits') {
      assert(resource, 'resource must be defined');
      assert(provider_data, 'provider_data must be defined');
      const password = `$J$${JSON.stringify({provider: providerName, resource, token: true, provider_data})}`;
      const {provider, log} = getEnv(self);
      try {
        yield provider.login('register', password);
      } catch (error) {
        provider.disconnectAfterSending();
        let data;
        try {
          const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
          data = Utils.parseXml(xml).failure;
        } catch (e) {
          throw error;
        }
        if ('redirect' in data) {
          const {user, server, token} = JSON.parse(data.text);
          assert(user, "register response doesn't contain user");
          assert(server, "register response doesn't contain server");
          // modify provider host to response's server
          provider.host = server;
          assert(token, "register response doesn't contain token");
          return {user, server, password: token};
        } else {
          throw data.text ? new Error(data.text) : error;
        }
      }
      throw new Error('Cannot register user');
    }),
    login: flow(function* (user, password, resource) {
      const {provider, log} = getEnv(self);
      return yield provider.login(user, password, resource);
    }),
  }));

export default XmppStore;
