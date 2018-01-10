// @flow

import {types, getEnv, flow} from 'mobx-state-tree';
import {autorun} from 'mobx';
import assert from 'assert';

import Persistable from './compose/Persistable';
import Profile from '../modelV2/Profile';

const ProfileStore = Persistable.named('ProfileStore')
  .props({
    isNew: false,
    profile: types.maybe(Profile),
    resource: types.maybe(types.string),
    userId: types.maybe(types.string),
    password: types.maybe(types.string),
    server: types.maybe(types.string),
    registered: false,
    sessionCount: 0,
    botsCreatedCount: 0,
  })
  .views(self => ({
    // get alert() {
    //   return getEnv(self).alert;
    // },
  }))
  .actions((self) => {
    const {service, logger} = getEnv(self);
    let handler;

    function afterCreate(): void {
      handler = autorun(() => {
        if (self.profile) {
          self.profile.status = service.connected ? 'available' : 'unavailable';
        }
      })
    }

    function beforeDestroy() {
      handler();
    }

    const register = flow(function* register(resource: any, provider_data: ?Object, provider: string) {
      const {user, server, password} = yield service.register(resource, provider_data, provider);
      clear();
      self.resource = resource;
      self.registered = true;
      self.user = user;
      self.server = server;
      self.password = password;
      return true;
    });

    // const firebaseRegister = flow(function* firebaseRegister() {
    //   throw new Error('TODO');
    // });

    const save = flow(function* save() {
      const updateObj = {
        handle: self.profile.handle,
        firstName: self.profile.firstName,
        lastName: self.profile.lastName,
        email: self.profile.email,
      };
      try {
        yield update(updateObj);
        self.sessionCount = 1;
        // analyticsStore.track('createprofile_complete', {profile: updateObj});
      } catch (error) {
        // analyticsStore.track('createprofile_fail', {profile: updateObj, error});
        throw error;
      }
    });

    // const remove = flow(function* () {
    //   throw new Error('TODO');
    //   // await xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
    //   // model.clear();
    //   // model.connected = false;
    //   // await xmpp.disconnectAfterSending();
    // });

    const update = flow(function* update(d: Object): Profile {
      assert(self.profile, 'No logged profile is defined!');
      assert(self.userId, 'No logged user is defined!');
      assert(d, 'data should not be null');
      const data = fromCamelCase(d);
      assert(data, 'file data should be defined');
      self.profile.load(d);
      yield service.updateProfile(d);
      self.profile.loaded = true;
      return self.profile;
    });

    // function hidePosts(profile: Profile): void {
    //   profile.hidePosts = true;
    // }

    // function showPosts(profile: Profile): void {
    //   profile.hidePosts = false;
    // }

    function clear(): void {
      self.profile = undefined;
      self.registered = false;
      self.password = undefined;
      self.user = undefined;
      self.server = undefined;
      self.resource = undefined;
      self.sessionCount = 0;
      self.botsCreatedCount = 0;
      self.sessionCount = 0;
    }

    // async lookup(handle): Profile {
    //   assert(handle, 'Handle should not be null');
    //   const iq = $iq({type: 'get'})
    //     .c('lookup', {xmlns: HANDLE})
    //     .c('item', {id: handle});
    //   const stanza = await xmpp.sendIQ(iq);
    //   const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    //   if (error) {
    //     throw error;
    //   }
    //   const user = Strophe.getNodeFromJid(jid);
    //   return this.create(user, {first_name, last_name, handle, avatar});
    // }

    // async uploadAvatar({file, size, width, height}): Promise<void> {
    //   assert(model.user, 'model.user should not be null');
    //   assert(model.server, 'model.server should not be null');
    //   const purpose = 'avatar'; // :${model.user}@${model.server}`;
    //   const url = await fileStore.requestUpload({
    //     file,
    //     size,
    //     width,
    //     height,
    //     purpose,
    //     access: 'all',
    //   });
    //   this.update({avatar: url});
    // }

    // requestBatch = async (users: string[]): Promise<Object[]> => {
    //   assert(model.server, 'model.server should not be null');
    //   let iq = $iq({type: 'get'}).c('users', {xmlns: NS});
    //   users.forEach((user) => {
    //     iq = iq.c('user', {jid: `${user}@${model.server}`}).up();
    //   });
    //   const stanza = await xmpp.sendIQ(iq);
    //   let arr = stanza.users.user;
    //   if (!Array.isArray(arr)) {
    //     arr = [arr];
    //   }
    //   const res = [];
    //   arr.forEach((user) => {
    //     const result = this.processFields(user.field);
    //     res.push(this.create(user.jid, result));
    //   });
    //   return res;
    // };

    // async requestOwn(): Promise<Object> {
    //   try {
    //     if (!model.connected) {
    //       await this.connect();
    //     }
    //     return this.request(model.user, true);
    //   } catch (error) {
    //     analyticsStore.track('error_profile_request_own', {error});
    //   }
    // }

    // processFields = (fields: Object[]): Object => {
    //   const result = {};
    //   // TODO: handle empty or null `fields`?
    //   fields &&
    //     fields.forEach((item) => {
    //       if (item.var === 'roles') {
    //         result.roles = item.roles && item.roles.role ? item.roles.role : [];
    //       } else {
    //         result[camelize(item.var)] = item.value;
    //       }
    //     });
    //   return result;
    // };

    // async request(user: string, isOwn: boolean = false): Promise<Object> {
    //   if (!user) {
    //     throw new Error('User should not be null');
    //   }
    //   // try to connect
    //   if (!model.connected) {
    //     throw new Error('XMPP is not connected!');
    //   }
    //   const node = `user/${user}`;
    //   const fields = isOwn
    //     ? ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles', 'email', 'phone_number']
    //     : ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
    //   assert(node, 'Node should be defined');
    //   let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    //   fields.forEach((field) => {
    //     iq = iq.c('field', {var: field}).up();
    //   });
    //   const stanza = await xmpp.sendIQ(iq);
    //   if (!stanza || stanza.type === 'error' || stanza.error) {
    //     return new Error(stanza && stanza.error ? stanza.error : 'empty data');
    //   }
    //   const result = this.processFields(stanza.fields.field);
    //   if (isOwn) {
    //     model.profile = factory.create(user, result);
    //   }
    //   return result;
    // }

    // async logout({remove} = {}): Promise<boolean> {
    //   globalStore.logout();
    //   this.isNew = false;
    //   if (remove) {
    //     //    if (remove || (model.profile && model.profile.handle && model.profile.handle.endsWith('2remove'))) {
    //     await this.remove();
    //   } else {
    //     model.clear();
    //     await xmpp.disconnectAfterSending(null);
    //   }
    //   return true;
    // }

    return {afterCreate, beforeDestroy, register, save};
  });

function fromCamelCase(data: ?Object): Object {
  const {firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = data || {};
  if (phoneNumber) {
    result.phone_number = phoneNumber;
    result.phoneNumber = phoneNumber;
  }
  if (userID) {
    result.auth_user = userID;
  }
  if (firstName) {
    result.first_name = firstName;
  }
  if (lastName) {
    result.last_name = lastName;
  }
  if (sessionID) {
    result.token = sessionID;
  }
  if (uuid) {
    result.user = uuid;
  }
  return result;
}

function camelize(str) {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export default ProfileStore;
