// @flow

import {types, getEnv, flow, applySnapshot} from 'mobx-state-tree';
import {autorun, when} from 'mobx';
import assert from 'assert';

import Persistable from './compose/Persistable';
import Profile from '../modelV2/Profile';

const ProfileStore = Persistable.named('ProfileStore')
  .props({
    isNew: false,
    profile: types.maybe(types.reference(Profile)),
    list: types.optional(types.map(Profile), {}),
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
    const {service, logger, firebaseStore, fileStore} = getEnv(self);
    let handler;

    function afterCreate(): void {
      handler = autorun(() => {
        if (self.profile) {
          self.profile.status = service.connected ? 'available' : 'unavailable';
        }
      });
    }

    function beforeDestroy() {
      handler();
    }

    const connect = flow(function* connect() {
      assert(self.resource, 'ProfileStore.connect: resource is not defined');
      const {userId, resource, password, server} = self;
      logger.log('ProfileStore.connect', userId, resource, password, server);

      if (service.connecting) {
        return new Promise((resolve, reject) => {
          when(
            () => !service.connecting && service.connected,
            () => {
              if (self.profile) {
                resolve(self.profile);
              } else {
                reject();
              }
            },
          );
        });
      }
      if (!service.connected || !self.profile) {
        try {
          yield service.login(userId, password, resource);
          // self.userId = service.username;
          // self.password = service.password;
          self.profile = this.create(self.userId);
          if (self.profile) {
            self.profile.status = 'available';
          }
        } catch (error) {
          // analyticsStore.track('error_connection', {error});
          throw error;
        }
      }
      return self.profile;
    });

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

    const firebaseRegister = flow(function* firebaseRegister() {
      return yield new Promise((resolve, reject) => {
        when(
          () => firebaseStore.token,
          async () => {
            try {
              register(firebaseStore.resource, {jwt: firebaseStore.token}, 'firebase');
              resolve(true);
            } catch (e) {
              // analyticsStore.track('error_firebase_register', {error: e});
              reject(e);
            }
          },
        );
      });
    });

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

    const remove = flow(function* () {
      yield service.remove();
      clear();
    });

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

    function hidePosts(profile: Profile): void {
      self.profile.hidePosts = true;
    }

    function showPosts(profile: Profile): void {
      self.profile.hidePosts = false;
    }

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

    const lookup = flow(function* (handle) {
      assert(handle, 'Handle should not be null');
      const {userId, ...rest} = yield service.lookup(handle);
      return create(userId, {...rest, handle});
    });

    const uploadAvatar = flow(function* uploadAvatar({file, size, width, height}) {
      assert(self.userId, 'userId should not be null');
      assert(self.server, 'server should not be null');
      const purpose = 'avatar'; // :${model.user}@${model.server}`;
      const url = yield fileStore.requestUpload({
        file,
        size,
        width,
        height,
        purpose,
        access: 'all',
      });
      this.update({avatar: url});
    });

    // profileFactory.create
    function create(userId: string, data?: Object, force?: boolean): Profile {
      // TODO: data validation?
      const profile = Profile.create({
        id: userId,
        ...data,
      });
      self.list.put(profile.toJSON());
      if (force) downloadProfile(profile.id);
      return profile;
    }

    const downloadProfile = flow(function* downloadProfile(profile: Profile) {
      try {
        const data = yield service.requestProfile(profile.id, profile.isOwn);
        // logger.log('download profile', data);
        // TODO: data validation
        applySnapshot(profile, data);
      } catch (err) {
        logger.log('PROFILE REQUEST ERROR:', err);
      }
    });

    const requestOwn = flow(function* requestOwn() {
      try {
        if (!service.connected) {
          yield connect();
        }
        return requestProfile(self.userId, true);
      } catch (error) {
        // analyticsStore.track('error_profile_request_own', {error});
      }
    });

    const requestProfile = flow(function* requestProfile(userId: string, isOwn: boolean = false) {
      const user = yield service.requestProfile(userId, isOwn);
      if (isOwn) {
        self.profile = create(userId, user);
      }
    });

    const logout = flow(function* logout({remove} = {}) {
      // globalStore.logout();
      self.isNew = false;
      if (remove) {
        //    if (remove || (model.profile && model.profile.handle && model.profile.handle.endsWith('2remove'))) {
        yield remove();
      } else {
        clear();
        yield service.disconnect();
      }
      return true;
    });

    return {
      afterCreate,
      beforeDestroy,
      register,
      save,
      firebaseRegister,
      remove,
      hidePosts,
      showPosts,
      lookup,
      uploadAvatar,
      create,
      downloadProfile,
      connect,
      requestOwn,
      requestProfile,
      logout,
    };
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

export default ProfileStore;
