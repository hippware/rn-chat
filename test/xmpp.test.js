// @flow

import {expect} from 'chai';
import {destroy} from 'mobx-state-tree';
import {createXmpp} from './support/testuser';
import {when} from 'mobx';
import {ProfileList} from '../src/model';

let user1, user2;

describe('ConnectStore', () => {
  it('creates the store and register and login', async (done) => {
    try {
      user1 = await createXmpp(22);
      expect(user1.username).to.be.not.null;
      expect(user1.connected).to.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it('check automatic loading profile', async (done) => {
    when(
      () => user1.profile,
      () => {
        const data = user1.profile;
        expect(data.handle).to.be.equal('');
        expect(data.firstName).to.be.equal('');
        expect(data.lastName).to.be.equal('');
        done();
      },
    );
  });

  it('update profile with invalid handle', async (done) => {
    try {
      await user1.updateProfile({handle: 'a', firstName: 'b', lastName: 'c'});
      done('exception should be raisen!');
    } catch (e) {
      expect(e).to.be.equal('Handle should be at least 3 character(s).');
      done();
    }
  });
  it('update profile', async (done) => {
    try {
      await user1.updateProfile({handle: 'aaa', firstName: 'b', lastName: 'c'});
      const data = user1.profile;
      expect(data.handle).to.be.equal('aaa');
      expect(data.firstName).to.be.equal('b');
      expect(data.lastName).to.be.equal('c');
      await user1.updateProfile({handle: 'aaab'});
      expect(data.handle).to.be.equal('aaab');
      expect(data.firstName).to.be.equal('b');
      expect(data.lastName).to.be.equal('c');
      done();
    } catch (e) {
      done(e);
    }
  });
  it('create second user', async (done) => {
    user2 = await createXmpp(18);
    expect(user2.connected).to.be.true;
    done();
  });
  it('make them friends', async (done) => {
    expect(user1.roster.length).to.be.equal(0);
    expect(user2.roster.length).to.be.equal(0);
    await user1.addToRoster(user2.username);
    await user2.addToRoster(user1.username);
    when(
      () => user1.roster.length === 1 && user2.roster.length === 1,
      () => {
        expect(user1.roster[0].user).to.be.equal(user2.username);
        expect(user2.roster[0].user).to.be.equal(user1.username);
        // check profile is online
        when(() => user2.roster[0].status === 'available', done);
      },
    );
  });
  it('send message', async (done) => {
    user1.sendMessage({body: 'hello', to: user2.username});
    const from = `${user1.username}@${user1.host}/testing`;
    when(() => user2.message.body === 'hello' && user2.message.from === from, done);
  });
  it('check roster', async (done) => {
    try {
      await user2.disconnect();
      expect(user1.roster[0].status).to.be.equal('unavailable');
      expect(user2.profile.status).to.be.equal('unavailable');
      await user2.login();
      when(
        () => user2.roster.length === 1,
        () => {
          expect(user2.roster[0].user === user1.username);
          expect(user2.roster[0].status === 'available');
          done();
        },
      );
    } catch (e) {
      done(e);
    }
  });
  // it('load relations', async (done) => {
  //   try {
  //     const list = ProfileList.create({});
  //     await user2.loadRelations(list, user1.username);
  //     expect(list.length).to.be.equal(1);
  //     done();
  //   } catch (e) {
  //     done(e);
  //   }
  // });
  after('remove', async () => {
    await user1.remove();
    await user2.remove();
    expect(user1.connected).to.be.false;
    expect(user2.connected).to.be.false;
    destroy(user1);
    destroy(user2);
  });
});
