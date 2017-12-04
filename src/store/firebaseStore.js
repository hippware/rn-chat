// @flow

import {observable, when, runInAction} from 'mobx';
import model from '../model/model';
import * as log from '../utils/log';
import analyticsStore from './analyticsStore';

let firebase;
let Actions;
try {
  firebase = require('react-native-firebase').default;
  Actions = require('react-native-router-flux').Actions;
} catch (e) {
  log.log(`No firebase ${e}`);
}

class FirebaseStore {
  @observable phone: string = '';
  confirmResult = null;
  @observable token: ?string = null;
  resource = null;
  unsubscribe: ?Function;
  verificationId: ?string = null;

  constructor() {
    if (firebase) {
      when(
        () => model.loaded,
        () => {
          this.unsubscribe = firebase.auth().onAuthStateChanged(this._onAuthStateChanged);
        },
      );
    }
  }

  _onAuthStateChanged = async (user) => {
    try {
      if (user) {
        await firebase.auth().currentUser.reload();
        const token = await firebase.auth().currentUser.getIdToken(true);
        runInAction(() => {
          this.token = token;
        });
        // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
      } else if (model.profile && model.connected) {
        Actions.logout();
      }
    } catch (err) {
      log.warn('Firebase onAuthStateChanged error:', err);
      analyticsStore.track('auth_error_firebase', {error: err});
      this.logout();
      if (model.profile && model.connected) {
        Actions.logout();
      }
    }
  };

  logout = async () => {
    analyticsStore.track('logout');
    if (firebase && this.token) {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        log.warn('Firebase logout error...maybe this is a bypass user?', err);
      }
    }
  };

  verifyPhone = async ({phone}) => {
    this.phone = phone;
    try {
      analyticsStore.track('sms_confirmation_try');
      this.confirmResult = await firebase.auth().signInWithPhoneNumber(phone);
      analyticsStore.track('sms_confirmation_success');
    } catch (err) {
      analyticsStore.track('sms_confirmation_fail', {error: err});
      throw err;
    }
  };

  confirmCode = async ({code, resource}) => {
    this.resource = resource;
    if (this.confirmResult) {
      analyticsStore.track('verify_confirmation_try');
      try {
        await this.confirmResult.confirm(code);
        analyticsStore.track('verify_confirmation_success');
      } catch (err) {
        analyticsStore.track('verify_confirmation_fail', {error: err});
        throw err;
      }
    } else {
      throw new Error('Phone not verified');
    }
    return true;
  };

  resendCode = async () => {
    try {
      analyticsStore.track('resend_code_try');
      await this.verifyPhone({phone: this.phone});
      analyticsStore.track('resend_code_success');
    } catch (err) {
      analyticsStore.track('resend_code_fail', {error: err});
      throw err;
    }
    return true;
  };

  checkToken = () => {
    return this.token;
  };
}

export default new FirebaseStore();
