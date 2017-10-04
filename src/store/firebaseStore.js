// @flow

import {observable, runInAction} from 'mobx';
import profileStore from './profileStore';
import model from '../model/model';
import * as log from '../utils/log';

let firebase;
try {
  firebase = require('react-native-firebase').default;
} catch (e) {
  log.log(`No firebase ${e}`);
}

class FirebaseStore {
  @observable phone: string = '';
  confirmResult = null;
  @observable token: ?string = null;
  resource = null;
  unsubscribe: ?Function;

  constructor() {
    if (firebase) {
      this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        log.log('firebase.onAuthStateChanged', user);
        try {
          if (user && !model.connected) {
            await firebase.auth().currentUser.reload();
            const token = await firebase.auth().currentUser.getIdToken(true);
            runInAction(() => (this.token = token));
            // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
          } else if (model.profile && model.connected) {
            profileStore.logout();
          }
        } catch (err) {
          console.warn('Firebase onAuthStateChanged error:', err);
          // this error wouldn't get caught
          // throw err;
        }
      });
    }
  }

  verifyPhone = async ({phone}) => {
    this.phone = phone;
    this.confirmResult = await firebase.auth().signInWithPhoneNumber(phone);
    return true;
  };

  confirmCode = async ({code, resource}) => {
    this.resource = resource;
    if (this.confirmResult) {
      await this.confirmResult.confirm(code);
    } else {
      throw new Error('Phone not verified');
    }
    return true;
  };

  resendCode = async () => {
    await this.verifyPhone({phone: this.phone});
    return true;
  };

  checkToken = () => {
    return this.token;
  };
}

export default new FirebaseStore();
