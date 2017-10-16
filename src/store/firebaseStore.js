// @flow

import {observable, when, runInAction} from 'mobx';
import profileStore from './profileStore';
import model from '../model/model';
import * as log from '../utils/log';
import {Actions} from 'react-native-router-flux';

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
  verificationId: ?string = null;

  constructor() {
    if (firebase) {
      when(() => model.loaded, () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          try {
            if (user && !model.connected) {
              await firebase.auth().currentUser.reload();
              const token = await firebase.auth().currentUser.getIdToken(true);
              runInAction(() => {
                this.token = token;
                if (!model.user || !model.profile) {
                  Actions.register();
                }
              });
              // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
            } else if (model.profile && model.connected) {
              Actions.logout();
            }
          } catch (err) {
            console.warn('Firebase onAuthStateChanged error:', err);
            when(() => model.profile && model.connected, () => {
              Actions.logout();
            });
          }
        });
      });
    }
  }

  logout = async () => {
    if (firebase) {
      await firebase.auth().signOut();
    }
  };

  verifyPhone = async ({phone}) => {
    this.phone = phone;
    this.confirmResult = await firebase.auth().signInWithPhoneNumber(phone);
    // return new Promise((resolve, reject) => {
    //   firebase
    //     .auth()
    //     .verifyPhoneNumber(phone)
    //     .on(
    //       'state_changed',
    //       (phoneAuthSnapshot) => {
    //         console.log('& phoneAuthSnapshot', phoneAuthSnapshot);
    //         switch (phoneAuthSnapshot.state) {
    //           case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
    //             console.log('& code sent');
    //             this.verificationId = phoneAuthSnapshot.verificationId;
    //             // on ios this is the final phone auth state event you'd receive
    //             // so you'd then ask for user input of the code and build a credential from it
    //             resolve();
    //             break;
    //           case firebase.auth.PhoneAuthState.ERROR: // or 'error'
    //             console.log('& verification error');
    //             console.log(phoneAuthSnapshot.error);
    //             reject(phoneAuthSnapshot.error);
    //             break;
    //           default:
    //             console.log('& firebase verifyPhoneNumber default case', phoneAuthSnapshot.state);
    //             reject(null);
    //         }
    //       },
    //       (error) => {
    //         // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
    //         // the ERROR case in the above observer then there's no need to handle it here
    //         console.log('& firebase error', error);
    //         // verificationId is attached to error if required
    //         console.log('& verification id', error.verificationId);
    //       },
    //     );
    // });
  };

  confirmCode = async ({code, resource}) => {
    this.resource = resource;
    if (this.confirmResult) {
      await this.confirmResult.confirm(code);
    } else {
      throw new Error('Phone not verified');
    }
    // const credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, code);
    // console.log('& phone credential', credential);
    // const result = await firebase.auth().signInWithCredential(credential);
    // this.token = credential.token;
    // console.log('& sign in result', result);
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
