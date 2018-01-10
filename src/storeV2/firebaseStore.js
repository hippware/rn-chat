// @flow

import {types, getEnv, flow, getParent} from 'mobx-state-tree';
import {when} from 'mobx';

import Persistable from './compose/Persistable';
// import Profile from '../modelV2/Profile';

const FirebaseStore = Persistable.named('FirebaseStore')
  .props({
    phone: '',
    token: types.maybe(types.string),
    // resource: types.maybe(types.map),
    // unsubscribe: ?Function,
    // verificationId: ?string = null,
  })
  .views(self => ({
    get profile() {
      // TODO: is this the best way to do this? Or should I pass it down explicitly?
      return getParent(self).profile;
    },
  }))
  .actions((self) => {
    const {auth, logger, service} = getEnv(self);

    let unsubscribe, confirmResult;

    function afterCreate() {
      // when(
      //   () => model.loaded,
      //   () => {
      unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
      //   },
      // );
    }

    // async function onAuthStateChanged(user) {
    const onAuthStateChanged = flow(function* onAuthStateChanged(user: ?Object) {
      try {
        if (user) {
          yield auth.currentUser.reload();
          const token = yield auth.currentUser.getIdToken(true);
          self.token = token;
          // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});
        } else if (self.profile && service.connected) {
          // Actions.logout();
        }
      } catch (err) {
        logger.warn('Firebase onAuthStateChanged error:', err);
        // analyticsStore.track('auth_error_firebase', {error: err});
        logout();
        if (self.profile && service.connected) {
          // Actions.logout();
        }
      }
    });

    const logout = flow(function* logout() {
      // analyticsStore.track('logout');
      if (self.token) {
        try {
          yield auth.signOut();
        } catch (err) {
          logger.warn('Firebase logout error...maybe this is a bypass user?', err);
        }
      }
    });

    const verifyPhone = flow(function* verifyPhone({phone}) {
      self.phone = phone;
      try {
        // analyticsStore.track('sms_confirmation_try');
        confirmResult = yield auth.signInWithPhoneNumber(phone);
        // analyticsStore.track('sms_confirmation_success');
      } catch (err) {
        // analyticsStore.track('sms_confirmation_fail', {error: err, phone});
        throw err;
      }
    });

    const confirmCode = flow(function* confirmCode({code, resource}) {
      if (confirmResult) {
        // analyticsStore.track('verify_confirmation_try');
        try {
          yield confirmResult.confirm(code);
          // analyticsStore.track('verify_confirmation_success');
        } catch (err) {
          // analyticsStore.track('verify_confirmation_fail', {error: err, code});
          throw err;
        }
      } else {
        throw new Error('Phone not verified');
      }
      return true;
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

    return {afterCreate, logout, verifyPhone, confirmCode, resendCode};
  });

export default FirebaseStore;
