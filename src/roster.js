import {types, flow, getEnv} from 'mobx-state-tree';
import {autorun} from 'mobx';
import Utils from './utils';

const ROSTER = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__blocked__';

export default types
  .model('XmppRoster', {
    roster: types.optional(types.array(types.frozen), []),
  })
  .actions((self) => {
    const {provider} = getEnv(self);
    return {
      afterCreate: () => {
        autorun(() => {
          if (self.connected) {
            self.requestRoster();
          } else {
            // TODO mark all statuses as unavailable
          }
        });
        provider.onPresence = self.onPresence;
      },
      onPresence: (presence) => {
        // TODO update roster profile status
      },
      sendPresence: provider.sendPresence,
      addToRoster: flow(function* (username: string, group = '') {
        self.sendPresence({to: `${username}@${self.host}`, type: 'subscribe'});
        const iq = $iq({type: 'set', to: `${self.username}@${self.host}`})
          .c('query', {xmlns: ROSTER})
          .c('item', {jid: `${username}@${self.host}`})
          .c('group')
          .t(group);
        yield self.sendIQ(iq);
      }),
      removeFromRoster: flow(function* (username: string) {
        const iq = $iq({type: 'set', to: `${self.username}@${self.host}`})
          .c('query', {xmlns: ROSTER})
          .c('item', {jid: `${username}@${self.host}`, subscription: 'remove'});
        yield self.sendIQ(iq);
        self.sendPresence({to: `${username}@${self.host}`, type: 'unsubscribe'});
      }),
      requestRoster: flow(function* () {
        const iq = $iq({type: 'get', to: `${self.username}@${self.host}`}).c('query', {
          xmlns: ROSTER,
        });
        const stanza = yield self.sendIQ(iq);
        let children = stanza.query.item;
        if (children && !Array.isArray(children)) {
          children = [children];
        }
        if (children) {
          for (let i = 0; i < children.length; i++) {
            self.roster.push(self.processItem(children[i]));
          }
        }
      }),
      processItem: ({handle, roles, avatar, jid, group, subscription, ask, created_at, ...props}) => {
        const firstName = props.first_name;
        const lastName = props.last_name;
        // ignore other domains
        if (Strophe.getDomainFromJid(jid) !== self.host) {
          return;
        }
        const user = Strophe.getNodeFromJid(jid);
        const createdTime = Utils.iso8601toDate(created_at).getTime();
        const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
        const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
        return {
          user,
          firstName,
          lastName,
          handle,
          avatar,
          roles: roles && roles.role,
          isNew: groups.includes(NEW_GROUP) && days <= 7,
          isBlocked: group === BLOCKED_GROUP,
          isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
          isFollower: subscription === 'from' || subscription === 'both',
        };
      },
    };
  });
