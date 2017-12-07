// @flow

import firebaseStore from './firebaseStore';

require('./xmpp/strophe');

import assert from 'assert';
import autobind from 'autobind-decorator';

const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
import {when, action, observable, runInAction} from 'mobx';
import model from '../model/model';
import * as xmpp from './xmpp/xmpp';
import Profile from '../model/Profile';
import fileStore from './fileStore';
import factory from '../factory/profileFactory';
import Utils from './xmpp/utils';
import globalStore from './globalStore';
import * as log from '../utils/log';
import analyticsStore from './analyticsStore';

function camelize(str) {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

@autobind
class ProfileStore {
  @observable isNew: boolean = false;

  constructor() {
    xmpp.disconnected.onValue(() => {
      model.connected = false;
      if (model.profile) {
        model.profile.status = 'unavailable';
      }
      model.connecting = false;
    });
    xmpp.connected.onValue(() => {
      model.connected = true;
      if (model.profile) {
        model.profile.status = 'available';
      }
      model.connecting = false;
    });
    xmpp.authError.onValue((error) => {
      let data = '';
      try {
        const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
        data = Utils.parseXml(xml).failure;
      } catch (e) {
        log.log('AUTHERROR', e, error);
      }
      if (!data || !('redirect' in data)) {
        model.connected = false;
        model.connecting = false;
        log.log('PROFILESTORE onAuthError ', error, model.connected);
      }
    });
  }

  @action
  create = (user: string, data?: Object, force?: boolean): Profile => {
    return factory.create(user, data, force);
  };

  createAsync = async (user: string, data: Object, force: boolean): Promise<Profile> => {
    return new Promise((resolve, reject) => when(() => model.connected, () => resolve(this.create(user, data, force))));
  };

  @action
  async testRegister({resource, phoneNumber}): Promise<boolean> {
    try {
      await this.register('testing', {
        userID: `000000${phoneNumber}`,
        phoneNumber: `+1555${phoneNumber}`,
        authTokenSecret: '',
        authToken: '',
        emailAddressIsVerified: false,
        'X-Auth-Service-Provider': 'http://localhost:9999',
        emailAddress: '',
        'X-Verify-Credentials-Authorization': '',
      });
      model.resource = resource;
      log.log('USER:', model.user, model.password, model.resource);
      return true;
    } catch (error) {
      analyticsStore.track('error_bypass_register', {error});
    }
  }

  // NOTE: for whatever reason, adding the @action decorator here breaks the 'when' function listening for changes on firebaseStore
  // @action
  async firebaseRegister(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      when(
        () => firebaseStore.token,
        async () => {
          try {
            const {user, server, password} = await xmpp.register(firebaseStore.resource, {jwt: firebaseStore.token}, 'firebase');
            runInAction(() => {
              model.init();
              model.resource = firebaseStore.resource;
              model.registered = true;
              model.user = user;
              model.server = server;
              model.password = password;
            });
            resolve(true);
          } catch (e) {
            analyticsStore.track('error_firebase_register', {error: e});
            reject(e);
          }
        },
      );
    });
  }

  @action
  async register(resource, provider_data, provider): Promise<boolean> {
    const {user, server, password} = await xmpp.register(resource, provider_data, provider);
    model.init();
    model.resource = resource;
    model.registered = true;
    model.user = user;
    model.server = server;
    model.password = password;
    return true;
  }

  @action
  async save(): Promise<boolean> {
    await this.update({
      handle: model.profile.handle,
      firstName: model.profile.firstName,
      lastName: model.profile.lastName,
      email: model.profile.email,
    });
    analyticsStore.track('createprofile_complete');
    model.sessionCount = 1;
    return true;
  }

  @action
  async connect(): Promise<Profile> {
    // user = 'ffd475a0-cbde-11e6-9d04-0e06eef9e066';
    // password = '$T$osXMMILEWAk1ysTB9I5sp28bRFKcjd2T1CrxnnxC/dc=';
    //
    assert(model.resource, 'ProfileStore.connect: resource is not defined');
    const user = model.user;
    const resource = model.resource;
    const password = model.password;
    const server = model.server;
    log.log('ProfileStore.connect', user, resource, password, server);
    if (model.connecting) {
      return new Promise((resolve, reject) => {
        when(
          () => !model.connecting && model.connected,
          () => {
            if (model.profile) {
              resolve(model.profile);
            } else {
              reject();
            }
          },
        );
      });
    }
    if (!model.connected || !model.profile) {
      try {
        model.connecting = true;
        await xmpp.connect(user, password, server, resource);
        model.user = user;
        const profile = this.create(user);
        model.profile = profile;
        if (profile) {
          model.profile.status = 'available';
        }
        model.server = server;
        model.password = password;
        model.connected = true;
      } catch (error) {
        analyticsStore.track('error_connection', {error});
        throw error;
      } finally {
        model.connecting = false;
      }
    }
    return model.profile;
  }

  async remove() {
    await xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
    model.clear();
    model.connected = false;
    await xmpp.disconnectAfterSending();
  }

  async lookup(handle): Profile {
    assert(handle, 'Handle should not be null');
    const iq = $iq({type: 'get'})
      .c('lookup', {xmlns: HANDLE})
      .c('item', {id: handle});
    const stanza = await xmpp.sendIQ(iq);
    const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    if (error) {
      throw error;
    }
    const user = Strophe.getNodeFromJid(jid);
    return this.create(user, {first_name, last_name, handle, avatar});
  }

  async uploadAvatar({file, size, width, height}): Promise<void> {
    assert(model.user, 'model.user should not be null');
    assert(model.server, 'model.server should not be null');
    const purpose = 'avatar'; // :${model.user}@${model.server}`;
    const url = await fileStore.requestUpload({
      file,
      size,
      width,
      height,
      purpose,
      access: 'all',
    });
    this.update({avatar: url});
  }

  requestBatch = async (users: string[]): Promise<Object[]> => {
    assert(model.server, 'model.server should not be null');
    let iq = $iq({type: 'get'}).c('users', {xmlns: NS});
    users.forEach((user) => {
      iq = iq.c('user', {jid: `${user}@${model.server}`}).up();
    });
    const stanza = await xmpp.sendIQ(iq);
    let arr = stanza.users.user;
    if (!Array.isArray(arr)) {
      arr = [arr];
    }
    const res = [];
    arr.forEach((user) => {
      const result = this.processFields(user.field);
      res.push(this.create(user.jid, result));
    });
    return res;
  };

  async requestOwn(): Promise<Object> {
    try {
      if (!model.connected) {
        await this.connect();
      }
      return this.request(model.user, true);
    } catch (error) {
      analyticsStore.track('error_profile_request_own', {error});
    }
  }

  processFields = (fields: Object[]): Object => {
    const result = {};
    // TODO: handle empty or null `fields`?
    fields &&
      fields.forEach((item) => {
        if (item.var === 'roles') {
          result.roles = item.roles && item.roles.role ? item.roles.role : [];
        } else {
          result[camelize(item.var)] = item.value;
        }
      });
    return result;
  };

  async request(user: string, isOwn: boolean = false): Promise<Object> {
    if (!user) {
      throw new Error('User should not be null');
    }
    // try to connect
    if (!model.connected) {
      throw new Error('XMPP is not connected!');
    }
    const node = `user/${user}`;
    const fields = isOwn
      ? ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles', 'email', 'phone_number']
      : ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
    assert(node, 'Node should be defined');
    let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    fields.forEach((field) => {
      iq = iq.c('field', {var: field}).up();
    });
    const stanza = await xmpp.sendIQ(iq);
    if (!stanza || stanza.type === 'error' || stanza.error) {
      return new Error(stanza && stanza.error ? stanza.error : 'empty data');
    }
    const result = this.processFields(stanza.fields.field);
    if (isOwn) {
      model.profile = factory.create(user, result);
    }
    return result;
  }

  async logout({remove} = {}): Promise<boolean> {
    globalStore.logout();
    this.isNew = false;
    if (remove) {
      //    if (remove || (model.profile && model.profile.handle && model.profile.handle.endsWith('2remove'))) {
      await this.remove();
    } else {
      model.clear();
      await xmpp.disconnectAfterSending(null);
    }
    return true;
  }

  async update(d: Object): Promise<Profile> {
    assert(model.profile, 'No logged profile is defined!');
    assert(model.user, 'No logged user is defined!');
    assert(d, 'data should not be null');
    const data = this.fromCamelCase(d);
    assert(data, 'file data should be defined');
    model.profile.load(d);
    let iq = $iq({type: 'set'}).c('set', {xmlns: NS, node: `user/${model.user}`});
    Object.keys(data).forEach((field) => {
      if (data.hasOwnProperty(field) && data[field]) {
        iq = iq
          .c('field', {
            var: field,
            type: field === 'avatar' ? 'file' : 'string',
          })
          .c('value')
          .t(data[field])
          .up()
          .up();
      }
    });
    await xmpp.sendIQ(iq);
    model.profile.loaded = true;
    return model.profile;
  }

  fromCamelCase(data: ?Object): Object {
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

  @action
  hidePosts = (profile: Profile): void => {
    profile.hidePosts = true;
  };

  @action
  showPosts = (profile: Profile): void => {
    profile.hidePosts = false;
  };
}

export default new ProfileStore();
