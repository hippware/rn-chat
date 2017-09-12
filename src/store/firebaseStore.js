import {observable} from 'mobx';
import profileStore from './profileStore';
import model from '../model/model';
import * as log from '../utils/log';

let firebase;
try {
  firebase = require('react-native-firebase');
} catch (e) {
  log.log(`No firebase ${e}`);
}

class FirebaseStore {
  phone: string = '';
  confirmResult = null;
  @observable token = null;
  resource = null;
  constructor() {
    if (firebase){
      this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (user && !model.connected) {
          await firebase.auth().currentUser.reload();
          this.token = await firebase.auth().currentUser.getIdToken(true);
          //await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
        } else if (model.profile && model.connected) {
          profileStore.logout();
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
    await this.confirmResult.confirm(code);
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
