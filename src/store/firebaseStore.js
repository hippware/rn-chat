import firebase from 'react-native-firebase';
import {observable} from 'mobx';
import profileStore from './profileStore';
import model from '../model/model';

class FirebaseStore {
  constructor() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      console.log("AUTH STATE CHANGE!", user)
      if (user) {
        await firebase.auth().currentUser.reload();
        console.log("SUCCESS", await firebase.auth().currentUser.toJSON());
        const token = await firebase.auth().currentUser.getIdToken(true);
        await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
        console.log("TOKEN ", token);
      } else if (model.profile && model.connected) {
        profileStore.logout();
      }
    });
  }

  signIn = async (phoneNumber) => {
    const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
    return confirmResult;
  };

  confirmCode = async (confirmResult, codeInput) => {
    await confirmResult.confirm(codeInput);
  };
}

export default new FirebaseStore();
