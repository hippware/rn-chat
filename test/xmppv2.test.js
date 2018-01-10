import {createXmpp} from './support/testuser';
import {expect, assert} from 'chai';

let user1, user2;

describe('xmpp', () => {
  step('create first user', async (done) => {
    user1 = await createXmpp(17);
    expect(user1.connected).to.be.true;
    done();
  });
  step('request profile', async (done) => {
    try {
      const data = await user1.loadProfile(user1.username);
      expect(data.handle).to.be.undefined;
      expect(data.firstName).to.be.undefined;
      expect(data.lastName).to.be.undefined;
      done();
    } catch (e) {
      done(e);
    }
  });
  step('update profile with invalid handle', async (done) => {
    try {
      await user1.updateProfile({handle: 'a', firstName: 'b', lastName: 'c'});
      done('error should be raisen');
    } catch (e) {
      expect(e).to.be.equal('Handle should be at least 3 character(s).');
      done();
    }
  });
  step('update profile', async (done) => {
    try {
      await user1.updateProfile({handle: 'aaa', firstName: 'b', lastName: 'c'});
      const data = await user1.loadProfile(user1.username);
      expect(data.handle).to.be.equal('aaa');
      expect(data.firstName).to.be.equal('b');
      expect(data.lastName).to.be.equal('c');
      done();
    } catch (e) {
      done(e);
    }
  });
  step('send message', async (done) => {
    try {
      user2 = await createXmpp(18);
      expect(user2.connected).to.be.true;
      await user1.addToRoster(user2.username);
      await user2.addToRoster(user1.username);
      user2.message.onValue(msg => msg.body === 'hello' && msg.from === `${user1.username}@${user1.server}/testing` && done());
      user1.sendMessage({body: 'hello', to: user2.username});
    } catch (e) {
      done(e);
    }
  });
  after(async (done) => {
    try {
      await user1.remove();
      await user2.remove();
      expect(user1.connected).to.be.false;
      expect(user2.connected).to.be.false;
      done();
    } catch (e) {
      done(e);
    }
  });
});
