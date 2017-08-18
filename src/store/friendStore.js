// @flow

require('./xmpp/strophe');

const Strophe = global.Strophe;
const NS = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__block__';
const RSM_NS = 'http://jabber.org/protocol/rsm';

import {observable, when, action, autorunAsync, runInAction} from 'mobx';
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

type RelationType = 'follower' | 'following';

@autobind
export class FriendStore {
  start = () => {
    if (!model.friends.list.length) {
      this.requestRoster();
    }
    if (!this.pushHandler) {
      this.pushHandler = xmpp.iq.onValue(this.onRosterPush);
    }
  };

  finish = () => {};

  @action
  onRosterPush = (stanza) => {
    if (stanza.query && !Array.isArray(stanza.query.item) && stanza.query.item.jid) {
      this.processItem(stanza.query.item);
    }
  };
  processItem = ({handle, avatar, jid, group, subscription, ask, created_at, ...props}) => {
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
    const profile: Profile = profileStore.create(user, {
      firstName,
      lastName,
      handle,
      avatar,
      isNew: group === NEW_GROUP && days <= 7,
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
      .t(50); // @TODO: max + paging?

    try {
      const stanza = await xmpp.sendIQ(iq);
      let children = stanza.contacts.contact;
      if (children && !Array.isArray(children)) {
        children = [children];
      }
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const {association, handle, jid} = children[i];
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) !== model.server) {
            continue;
          }
          const user = Strophe.getNodeFromJid(jid);
          // console.log('& from jid', user);
          const profileToAdd: Profile = profileStore.create(user, {
            handle,
          });
          profileList.add(profileToAdd);
        }
      }
    } catch (error) {
      log.log('& REQUEST RELATIONS error:', error, {level: log.levels.ERROR});
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
    const iq = $iq({type: 'set', to: `${model.user}@${model.server}`}).c('query', {xmlns: NS}).c('item', {jid: `${profile.user}@${model.server}`}).c('group').t(group);
    xmpp.sendIQ(iq);
  }

  @action
  add = (profile: Profile) => {
    this.addToRoster(profile);
    this.subscribe(profile.user);
    model.friends.add(profile);
  };

  @action
  addAll = (profiles: Profile[]) => {
    for (const profile of profiles.map(x => x)) {
      this.add(profile);
    }
  };

  async addByHandle(handle) {
    const profile: Profile = await profileStore.lookup(handle);
    this.add(profile);
  }

  @action
  unfollow = (profile: Profile) => {
    assert(profile, 'Profile is not defined to remove');
    this.addToRoster(profile);
    const user = profile.user;
    this.unsubscribe(user);
  };

  @action
  block = (profile: Profile) => {
    profile.isBlocked = true;
    profile.isNew = false;
    this.addToRoster(profile, BLOCKED_GROUP);
  };

  @action
  unblock = (profile: Profile) => {
    profile.isBlocked = false;
    profile.isNew = false;
    this.addToRoster(profile);
  };

  @action
  follow = (profile: Profile) => {
    this.subscribe(profile.user);
    this.addToRoster(profile);
  };

  removeFromRoster(profile: Profile) {
    const user = profile.user;
    const iq = $iq({type: 'set', to: `${model.user}@${model.server}`}).c('query', {xmlns: NS}).c('item', {jid: `${user}@${model.server}`, subscription: 'remove'});
    xmpp.sendIQ(iq);
  }

  _searchFilter = (p: Profile, searchFilter: string) => {
    const s = searchFilter && searchFilter.toLowerCase().trim();
    return s && s.length ? p.handle.toLowerCase().startsWith(s) || p.firstName.toLowerCase().startsWith(s) || p.lastName.toLowerCase().startsWith(s) : true;
  };

  alphaSectionIndex = (searchFilter: string, list: Profile[]): Object[] => {
    const theList = list.filter(f => this._searchFilter(f, searchFilter));
    const dict = _.groupBy(theList, p => p.handle.charAt(0).toLocaleLowerCase());
    return Object.keys(dict).sort().map(key => ({key: key.toUpperCase(), data: dict[key]}));
  };

  followersSectionIndex = (searchFilter: string, followers: Profile[], newFollowers: Profile[] = []): Object[] => {
    const newFilter = newFollowers.filter(f => this._searchFilter(f, searchFilter));
    const followFilter = followers.filter(f => this._searchFilter(f, searchFilter)).filter(f => !f.isNew);
    const sections = [];
    if (newFilter.length > 0) sections.push({key: 'new', data: _.sortBy(newFilter, ['handle'])});
    sections.push({key: 'followers', data: _.sortBy(followFilter, ['handle'])});
    return sections;
  };

  followingSectionIndex = (searchFilter: string, following: Profile[]): Object[] => {
    const followFilter = following.filter(f => this._searchFilter(f, searchFilter));
    return [{key: 'following', data: _.sortBy(followFilter, ['handle'])}];
  };
}

export default new FriendStore();
