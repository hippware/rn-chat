// @flow

import {expect, assert} from 'chai';
import FirebaseStore from '../../src/storeV2/FirebaseStore';

// const mockService = {
//   connected: {onValue: () => {}},
//   disconnected: {onValue: () => {}},
//   // updateProfile: Promise.resolve,
//   register: () => Promise.resolve({user: 'user', server: 'server', password: 'password'}),
// };

const auth = {
  onAuthStateChanged: (cb) => {},
  signInWithPhoneNumber: () => Promise.resolve({confirm: code => Promise.resolve()}),
};

describe('FirebaseStore', () => {
  let store;
  it('creates the store', (done) => {
    store = FirebaseStore.create({}, {auth});
    done();
  });

  it('verifies phone', async () => {
    await store.verifyPhone({phone: '1234567890'});
  });

  it('confirms code', async () => {
    await store.confirmCode({code: '1234', resource: {some: 'resource'}});
  });

  it('resends code', async () => {
    await store.resendCode();
  });
});
