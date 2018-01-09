// @flow

import {types, getEnv} from 'mobx-state-tree';
// import {when, reaction} from 'mobx';
import assert from 'assert';

import * as log from '../utils/log';
import Persistable from './compose/Persistable';
// import Bot from '../modelV2/Bot';
import Profile from '../modelV2/Profile';
import Utils from '../store/xmpp/utils';

const ProfileStore = Persistable.named('ProfileStore')
  .props({
    isNew: false,
    connecting: false,
    connected: false,
    profile: types.maybe(Profile),
  })
  .actions((self) => {
    const {service} = getEnv(self);

    function afterCreate(): void {
      service.disconnected.onValue(() => {
        self.connected = false;
        if (self.profile) {
          self.profile.status = 'unavailable';
        }
        self.connecting = false;
      });
      service.connected.onValue(() => {
        self.connected = true;
        if (self.profile) {
          self.profile.status = 'available';
        }
        self.connecting = false;
      });
      service.authError.onValue((error) => {
        let data = '';
        try {
          const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
          data = Utils.parseXml(xml).failure;
        } catch (e) {
          log.log('AUTHERROR', e, error);
        }
        if (!data || !('redirect' in data)) {
          self.connected = false;
          self.connecting = false;
          log.log('PROFILESTORE onAuthError ', error, self.connected);
        }
      });
    }

    return {afterCreate};
  });

export default ProfileStore;
