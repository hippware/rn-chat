// tslint:disable-next-line:no_unused-variable
import { types, flow, getEnv, IModelType, isAlive, ISnapshottable, IExtendedObservableMap } from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import { autorun, when, reaction, IReactionDisposer, IObservableArray } from 'mobx'
import Utils from './utils'
import { Profile } from './model'
import profileStore from './profile'

const ROSTER = 'jabber:iq:roster'
const NEW_GROUP = '__new__'
const BLOCKED_GROUP = '__blocked__'

export default types
  .compose(
    profileStore,
    types.model('XmppRoster', {
      // roster might work better as a map: https://mobx.js.org/refguide/map.html
      roster: types.optional(types.array(types.reference(Profile)), [])
    })
  )
  .named('WockyClient')
  .actions(self => {
    const { provider } = getEnv(self)
    return {
      sendPresence: provider.sendPresence,
      processItem: (item: any = {}) => {
        const { handle, roles, avatar, jid, group, subscription, ask, created_at, ...props } = item
        const firstName = props.first_name
        const lastName = props.last_name
        // ignore other domains
        if (Strophe.getDomainFromJid(jid) !== self.host) {
          return
        }
        const user = Strophe.getNodeFromJid(jid)
        const createdTime = Utils.iso8601toDate(created_at).getTime()
        const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24))
        const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group]
        const existed = self.roster.findIndex(u => u.user === user)
        const rolesArr = roles && roles.role ? (Array.isArray(roles.role) ? roles.role : [roles.role]) : []

        const data = {
          user,
          firstName,
          lastName,
          handle,
          avatar,
          roles: rolesArr,
          isNew: groups.includes(NEW_GROUP) && days <= 7,
          isBlocked: group === BLOCKED_GROUP,
          isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
          isFollower: subscription === 'from' || subscription === 'both'
        }
        const profile = self.profiles.get(user)
        if (profile) {
          Object.assign(profile, data)
        } else {
          self.registerProfile(Profile.create(data))
        }
        if (existed === -1) {
          self.roster.push(self.profiles.get(user)!)
        }
      }
    }
  })
  .actions(self => {
    return {
      onPresence: (stanza: any) => {
        try {
          const user = Utils.getNodeJid(stanza.from)!
          if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
            const status = stanza.type || 'available'
            const profile = self.profiles.get(user)
            if (profile) {
              profile.status = status
            } else {
              self.profiles.put(Profile.create({ user, status }))
            }
          }
        } catch (e) {
          console.warn(e)
        }
      },
      addToRoster: flow(function*(username: string, group = '') {
        self.sendPresence({ to: `${username}@${self.host}`, type: 'subscribe' })
        const iq = $iq({ type: 'set', to: `${self.username}@${self.host}` })
          .c('query', { xmlns: ROSTER })
          .c('item', { jid: `${username}@${self.host}` })
          .c('group')
          .t(group)
        yield self.sendIQ(iq)
      }),
      removeFromRoster: flow(function*(username: string) {
        const iq = $iq({ type: 'set', to: `${self.username}@${self.host}` })
          .c('query', { xmlns: ROSTER })
          .c('item', { jid: `${username}@${self.host}`, subscription: 'remove' })
        yield self.sendIQ(iq)
        self.sendPresence({ to: `${username}@${self.host}`, type: 'unsubscribe' })
      }),
      requestRoster: flow(function*() {
        const iq = $iq({ type: 'get', to: `${self.username}@${self.host}` }).c('query', {
          xmlns: ROSTER
        })
        const stanza = yield self.sendIQ(iq)
        let children = stanza.query.item
        if (children && !Array.isArray(children)) {
          children = [children]
        }
        if (children) {
          for (let i = 0; i < children.length; i++) {
            self.processItem(children[i])
          }
        }
      })
    }
  })
  .actions(self => {
    let handler1: any, handler2: any
    const { provider } = getEnv(self)

    return {
      afterCreate: () => {
        handler1 = autorun('roster.handler1', () => {
          if (self.iq.query && self.iq.query.item && !Array.isArray(self.iq.query.item) && self.iq.query.item.jid) {
            self.processItem(self.iq.query.item)
          }
        })
        handler2 = autorun('roster.handler2', () => {
          if (self.connected) {
            self.requestRoster()
          } else {
            self.roster.forEach(p => {
              if (isAlive(p)) {
                p.status = 'unavailable'
              }
            })
          }
        })
        provider.onPresence = self.onPresence
      },
      beforeDestroy: () => {
        provider.onPresence = null
        handler1()
        handler2()
        self.roster.clear()
      }
    }
  })
