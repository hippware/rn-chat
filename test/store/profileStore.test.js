// @flow

import {expect, assert} from 'chai';
import ProfileStore from '../../src/storeV2/profileStore';
import {destroy} from 'mobx-state-tree';

const mockService = {
  // updateProfile: Promise.resolve,
  register: () => Promise.resolve({user: 'user', server: 'server', password: 'password'}),
};

// TODO: prevent prettier from converting `function` to `() =>`
// https://mochajs.org/#arrow-functions

describe('ProfileStore', () => {
  let store;
  it('creates the store', (done) => {
    store = ProfileStore.create({}, {service: mockService});
    done();
  });

  it('registers', async () => {
    await store.register('resource', {provider: 'google'}, 'google');
    expect(store.resource).to.equal('resource');
    expect(store.user).to.equal('user');
    expect(store.server).to.equal('server');
    expect(store.password).to.equal('password');
    // assert(store.resource === 'resource', 'bad resource');
  });

  it('destroy', () => {
    destroy(store);
  });
});
