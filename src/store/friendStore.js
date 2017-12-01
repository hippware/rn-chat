// @flow

require('./xmpp/strophe');

const Strophe = global.Strophe;
const NS = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__blocked__';
const RSM_NS = 'http://jabber.org/protocol/rsm';

import {when, action, runInAction, toJS} from 'mobx';
import profileStore from './profileStore';
import Profile from '../model/Profile';
import model from '../model/model';
import * as xmpp from './xmpp/xmpp';
import assert from 'assert';
import autobind from 'autobind-decorator';
import Utils from './xmpp/utils';
import FriendList from '../model/FriendList';
import * as log from '../utils/log';
import _ from 'lodash';
import analyticsStore from './analyticsStore';

type RelationType = 'follower' | 'following';

@autobind
class FriendStore {
  pushHandler: any;

  start = () => {
    this.requestRoster();
    if (!this.pushHandler) {
      this.pushHandler = xmpp.iq.onValue(this.onRosterPush);
    }
    if (!this.presenceHandler) {
      this.presenceHandler = xmpp.presence.onValue(this.onPresence);
    }
  };

  finish = () => {
    // mark all friends offline
    model.friends.list.forEach((profile: Profile) => {
      // TODO replace status to enum (possible during migration to mobx-state-tree)
      profile.status = 'unavailable';
    });
  };

  @action
  onRosterPush = (stanza) => {
    if (stanza.query && stanza.query.item && !Array.isArray(stanza.query.item) && stanza.query.item.jid) {
      this.processItem(stanza.query.item);
    }
  };

  @action
  onPresence = (stanza) => {
    const user = Utils.getNodeJid(stanza.from);
    if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
      const profile: Profile = profileStore.create(user);
      profile.status = stanza.type || 'available';
    }
  };

  processItem = ({handle, roles, avatar, jid, group, subscription, ask, created_at, ...props}) => {
    const firstName = props.first_name;
    const lastName = props.last_name;
    // ignore other domains
    if (Strophe.getDomainFromJid(jid) !== model.server) {
      return;
    }
    const user = Strophe.getNodeFromJid(jid);
    const createdTime = Utils.iso8601toDate(created_at).getTime();
    const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
    if (!handle) {
      profileStore.create(user);
    }
    const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
    const profile: Profile = profileStore.create(user, {
      firstName,
      lastName,
      handle,
      avatar,
      roles: roles && roles.role,
      isNew: groups.includes(NEW_GROUP) && days <= 7,
      isBlocked: group === BLOCKED_GROUP,
      isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
      isFollower: subscription === 'from' || subscription === 'both',
    });
    model.friends.add(profile);
  };

  @action
  requestRoster = async () => {
    assert(model.user, 'Model user should not be null');
    assert(model.server, 'Model server should not be null');
    const iq = $iq({type: 'get', to: `${model.user}@${model.server}`}).c('query', {
      xmlns: NS,
    });
    try {
      const stanza = await xmpp.sendIQ(iq);
      runInAction(() => {
        let children = stanza.query.item;
        if (children && !Array.isArray(children)) {
          children = [children];
        }
        if (children) {
          for (let i = 0; i < children.length; i++) {
            this.processItem(children[i]);
          }
        }
      });
    } catch (error) {
      log.log('ROSTER ERROR:', error, {level: log.levels.ERROR});
    }
  };

  @action
  requestRelations = async (profileList: FriendList, userId: string, relation?: RelationType = 'follower') => {
    assert(userId, 'User id should not be null');
    assert(profileList, 'Profile list should not be null');
    assert(relation, 'Relation type must be defined');

    const iq = $iq({
      type: 'get',
      to: model.server,
    })
      .c('contacts', {
        xmlns: 'hippware.com/hxep/user',
        node: `user/${userId}`,
      })
      .c('association')
      .t(relation)
      .up()
      .c('set', {xmlns: RSM_NS})
      .c('max')
      .t(25)
      .up();

    if (profileList.lastId) {
      iq
        .c('after')
        .t(profileList.lastId)
        .up();
    }

    try {
      const stanza = await xmpp.sendIQ(iq);

      let children = stanza.contacts.contact;
      if (children && !Array.isArray(children)) {
        children = [children];
      }
      if (children) {
        children.forEach((child) => {
          const {handle, jid} = child;
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) !== model.server) {
            return;
          }
          const user = Strophe.getNodeFromJid(jid);
          const profileToAdd: Profile = profileStore.create(user, {
            handle,
          });
          profileToAdd.tryDownload();
          profileList.add(profileToAdd);
        });
        profileList.lastId = stanza.contacts.set.last;
      }
    } catch (error) {
      log.log('REQUEST RELATIONS error:', error, {level: log.levels.ERROR});
    }
  };

  /**
   * Send 'subscribe' request for given user
   * @param username username to subscribe
   */
  subscribe(username) {
    log.log('SUBSCRIBE::::', username, {level: log.levels.VERBOSE});
    xmpp.sendPresence({to: `${username}@${model.server}`, type: 'subscribe'});
  }

  /**
   * Send 'subscribed' request for given user
   * @param username user to send subscribed
   */
  authorize(username) {
    xmpp.sendPresence({to: `${username}@${model.server}`, type: 'subscribed'});
  }

  /**
   * unsubscribe from the user's with username presence
   * @param username username to unsubscribe
   */
  unsubscribe(username) {
    xmpp.sendPresence({to: `${username}@${model.server}`, type: 'unsubscribe'});
  }

  /**
   * Unauthorize the user with username to subscribe to the authenticated user's presence
   * @param username username to unauthorize
   */
  unauthorize(username) {
    xmpp.sendPresence({to: `${username}@${model.server}`, type: 'unsubscribed'});
  }

  addToRoster(profile: Profile, group = '') {
    const iq = $iq({type: 'set', to: `${model.user}@${model.server}`})
      .c('query', {xmlns: NS})
      .c('item', {jid: `${profile.user}@${model.server}`})
      .c('group')
      .t(group);
    xmpp.sendIQ(iq);
  }

  @action
  add = (profile: Profile) => {
    this.addToRoster(profile);
    this.subscribe(profile.user);
    model.friends.add(profile);
    // TODO: consider combining `add` and `follow` to remove redundancy
    analyticsStore.track('user_follow', toJS(profile));
  };

  @action
  addAll = (profiles: Profile[]) => {
    profiles.forEach(profile => this.add(profile));
  };

  async addByHandle(handle) {
    const profile: Profile = await profileStore.lookup(handle);
    this.add(profile);
  }

  @action
  block = (profile: Profile): void => {
    profile.isBlocked = true;
    profile.isNew = false;
    this.addToRoster(profile, BLOCKED_GROUP);
  };

  @action
  unblock = (profile: Profile): void => {
    profile.isBlocked = false;
    profile.isNew = false;
    this.addToRoster(profile);
  };

  @action
  follow = async (profile: Profile): Promise<void> => {
    this.subscribe(profile.user);
    this.addToRoster(profile);
    analyticsStore.track('user_follow', toJS(profile));
    return new Promise((resolve) => {
      when(() => profile.isFollowed, resolve());
    });
  };

  @action
  unfollow = async (profile: Profile): Promise<void> => {
    assert(profile, 'Profile is not defined to remove');
    this.addToRoster(profile);
    this.unsubscribe(profile.user);
    analyticsStore.track('user_unfollow', toJS(profile));
    return new Promise((resolve) => {
      when(() => !profile.isFollowed, resolve());
    });
  };

  removeFromRoster(profile: Profile) {
    const user = profile.user;
    const iq = $iq({type: 'set', to: `${model.user}@${model.server}`})
      .c('query', {xmlns: NS})
      .c('item', {jid: `${user}@${model.server}`, subscription: 'remove'});
    xmpp.sendIQ(iq);
  }
}

export default new FriendStore();
