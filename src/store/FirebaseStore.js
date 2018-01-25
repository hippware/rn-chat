// @flow

import {types, getEnv, flow, getParent} from 'mobx-state-tree';
import {Actions} from 'react-native-router-flux';
import {when} from 'mobx';

const FirebaseStore = types
  .model('FirebaseStore', {
    phone: '',
    token: types.maybe(types.string),
    resource: types.maybe(types.string),
  })
  .volatile(self => ({
    buttonText: 'Verify',
    registered: false,
    errorMessage: types.maybe(types.string),
  }))
  .actions((self) => {
    const {auth, logger} = getEnv(self);
    const {wocky} = getParent(self);

    let unsubscribe, confirmResult, user, password;

    function afterCreate() {
      unsubscribe = auth.onAuthStateChanged(processFirebaseAuthChange);
    }

    // NOTE: this is not a MST action
    async function processFirebaseAuthChange(user) {
      logger.log('FIREBASESTORE: AUTH STATE CHANGED', user);
      if (user) {
        try {
          await auth.currentUser.reload();
          const token = await auth.currentUser.getIdToken(true);
          self.setToken(token);
          // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});)
        } catch (err) {
          logger.warn('Firebase onAuthStateChanged error:', err);
          // analyticsStore.track('auth_error_firebase', {error: err});
          if (wocky.profile && wocky.connected) {
            Actions.logout();
          }
        }
      } else if (wocky.profile && wocky.connected) {
        Actions.logout();
      }
    }

    function setToken(token: string): void {
      self.token = token;
    }

    const logout = flow(function* logout() {
      // analyticsStore.track('logout');
      if (self.token) {
        try {
          yield auth.signOut();
        } catch (err) {
          // analyticsStore.track('logout_error');
          logger.log('Firebase logout error...maybe this is a bypass user?', err);
        }
        yield wocky.logout();
        return true;
      }
    });

    const verifyPhone = flow(function* verifyPhone({phone}) {
      self.phone = phone;
      try {
        self.errorMessage = null;
        // analyticsStore.track('sms_confirmation_try');
        confirmResult = yield auth.signInWithPhoneNumber(phone);
        // analyticsStore.track('sms_confirmation_success');
      } catch (err) {
        // analyticsStore.track('sms_confirmation_fail', {error: err, phone});
        switch (err.code) {
          case 'auth/too-many-requests':
            self.errorMessage = 'Too many login attempts from this phone. Try again later.';
            break;
          case 'auth/network-request-failed':
            self.errorMessage = 'Network error. Check your connection and try again.';
            break;
          default:
            // message = err.message;
            self.errorMessage = 'Error verifying phone number. Please check the number and try again.';
        }
        throw err;
      }
    });

    const confirmCode = flow(function* confirmCode({code, resource}) {
      self.errorMessage = null;
      self.buttonText = 'Verifying...';
      self.resource = resource;
      if (!confirmResult) {
        throw new Error('Phone not verified');
      }
      // analyticsStore.track('verify_confirmation_try');
      try {
        yield confirmResult.confirm(code);
        self.register();
        // analyticsStore.track('verify_confirmation_success');
      } catch (err) {
        // analyticsStore.track('verify_confirmation_fail', {error: err, code});
        logger.warn('confirmation fail', err);
        self.errorMessage = 'Error confirming code, please try again or resend code';
        self.buttonText = 'Verify';
        throw err;
      }
    });

    const resendCode = flow(function* resendCode() {
      try {
        // analyticsStore.track('resend_code_try');
        yield verifyPhone({phone: this.phone});
        // analyticsStore.track('resend_code_success');
      } catch (err) {
        // analyticsStore.track('resend_code_fail', {error: err});
        throw err;
      }
      return true;
    });

    // const register = flow(function* register(token: string) {
    function register(): void {
      self.buttonText = 'Registering...';
      // TODO: set a timeout here
      when(() => self.token, registerWithToken);
    }

    const registerWithToken = flow(function* register() {
      try {
        yield wocky.register({jwt: self.token}, 'firebase');
        self.buttonText = 'Connecting...';
        yield wocky.login();
        self.buttonText = 'Verify';
        self.registered = true;
      } catch (err) {
        logger.warn('RegisterWithToken error', err);
        self.errorMessage = 'Error registering, please try again';
      } finally {
        self.buttonText = 'Verify';
        self.errorMessage = null;
      }
    });

    return {afterCreate, logout, verifyPhone, confirmCode, resendCode, register, setToken};
  });

export default FirebaseStore;
