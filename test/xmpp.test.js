// @flow

import {expect, assert} from 'chai';
import xmpp from '../src/index';
import {destroy} from 'mobx-state-tree';
import XmppStropheV2 from '../src/XmppStropheV2';
import {createXmpp, testDataNew} from './support/testuser';
import {when} from 'mobx';
const logger = console;
const host = 'testing.dev.tinyrobot.com';
const data = testDataNew(11);
let user1, user2;

describe('ConnectStore', () => {
  it('creates the store and register and login', async (done) => {
    try {
      user1 = await createXmpp(17);
      expect(user1.username).to.be.not.null;
      expect(user1.connected).to.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it('load profile', async (done) => {
    const data = await user1.loadProfile(user1.username);
    expect(data.handle).to.be.undefined;
    expect(data.firstName).to.be.undefined;
    expect(data.lastName).to.be.undefined;
    done();
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
    await user1.updateProfile({handle: 'aaa', firstName: 'b', lastName: 'c'});
    const data = await user1.loadProfile(user1.username);
    expect(data.handle).to.be.equal('aaa');
    expect(data.firstName).to.be.equal('b');
    expect(data.lastName).to.be.equal('c');
    done();
  });
  it('send message', async (done) => {
    user2 = await createXmpp(18);
    expect(user2.connected).to.be.true;
    await user1.addToRoster(user2.username);
    await user2.addToRoster(user1.username);
    user1.sendMessage({body: 'hello', to: user2.username});
    const from = `${user1.username}@${user1.host}/testing`;
    when(() => user2.message.body === 'hello' && user2.message.from === from, done);
  });
  it('check roster', async (done) => {
    try {
      await user2.disconnect();
      await user2.login();
      when(
        () => user2.roster.length === 1,
        () => {
          expect(user2.roster[0].user === user1.username);
          done();
        }
      );
    } catch (e) {
      done(e);
    }
  });
  after('remove', async (done) => {
    await user1.remove();
    await user2.remove();
    expect(user1.connected).to.be.false;
    expect(user2.connected).to.be.false;
    destroy(user1);
    destroy(user2);
    done();
  });
});
