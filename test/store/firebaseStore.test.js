// @flow

import {expect, assert} from 'chai';
import FirebaseStore from '../../src/store/FirebaseStore';
import {Wocky} from 'wocky-client';

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
// mock for xmpp provider
const provider = {};
const analytics = {
  track: () => {},
};
const env = {auth, provider, analytics};
const wocky = Wocky.create({resource: 'testing', host: 'test'}, env);

describe('FirebaseStore', () => {
  let store;
  it('creates the store', (done) => {
    store = FirebaseStore.create({wocky}, env);
    done();
  });

  it('verifies phone', async () => {
    await store.verifyPhone({phone: '1234567890'});
  });

  it('confirms code', async () => {
    await store.confirmCode({code: '1234', resource: 'resource'});
  });

  it('resends code', async () => {
    await store.resendCode();
  });
});
