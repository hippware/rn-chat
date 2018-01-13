// @flow

import {expect, assert} from 'chai';
import ProfileStore from '../../src/storeV2/profileStore';
import {destroy} from 'mobx-state-tree';

const mockService = {
  // updateProfile: Promise.resolve,
  register: () => Promise.resolve({user: 'user', server: 'server', password: 'password'}),
};

const logger = console;

// TODO: prevent prettier from converting `function` to `() =>`
// https://mochajs.org/#arrow-functions

describe('ProfileStore', () => {
  // let store;
  // it('creates the store', (done) => {
  //   store = ProfileStore.create({}, {service: mockService, logger});
  //   done();
  // });
  // it('registers', async (done) => {
  //   await store.register('resource', {provider: 'google'}, 'google');
  //   expect(store.resource).to.equal('resource');
  //   expect(store.user).to.equal('user');
  //   expect(store.server).to.equal('server');
  //   expect(store.password).to.equal('password');
  //   // assert(store.resource === 'resource', 'bad resource');
  //   done();
  // });
  // it('creates a profile', (done) => {
  //   const data = {
  //     firstName: 'Jenny',
  //   };
  //   const profile = store.create('12345', data, false);
  //   expect(profile).to.be.not.empty;
  //   expect(profile.firstName).to.equal('Jenny');
  //   expect(profile.lastName).to.be.empty;
  //   expect(store.list.size).to.be.greaterThan(0);
  //   done();
  // });
  // it("doesn't add 2 profiles with the same id to the list", (done) => {
  //   const profile = store.create('12345', {}, false);
  //   expect(profile).to.be.not.empty;
  //   expect(store.list.size).to.equal(1);
  //   expect(store.list.get('12345').firstName).to.equal('');
  //   done();
  // });
  // it('patches profile after download', async () => {
  //   mockService.requestProfile = () => Promise.resolve({id: '12345', lastName: 'Ong'});
  //   const profile = store.create('12345', {lastName: 'Kirkham'}, false);
  //   await store.downloadProfile(profile);
  //   expect(profile).to.be.not.empty;
  //   expect(profile.lastName).to.equal('Ong');
  // });
  // it('destroys', (done) => {
  //   destroy(store);
  //   done();
  // });
});
