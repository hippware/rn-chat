import { types, flow, getSnapshot, applySnapshot, IModelType, IExtendedObservableMap, ISnapshottable } from 'mobx-state-tree'
import { Profile, OwnProfile, IProfile, ProfileList, IProfileList } from './model'
import { autorun, IReactionDisposer, IObservableArray } from 'mobx'
import register from './register'

const USER = 'hippware.com/hxep/user'
const RSM_NS = 'http://jabber.org/protocol/rsm'

function fromCamelCase(data: any = {}) {
  const { firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result } = data
  if (phoneNumber) {
    result.phone_number = phoneNumber
    result.phoneNumber = phoneNumber
  }
  if (userID) {
    result.auth_user = userID
  }
  if (firstName) {
    result.first_name = firstName
  }
  if (lastName) {
    result.last_name = lastName
  }
  if (sessionID) {
    result.token = sessionID
  }
  if (uuid) {
    result.user = uuid
  }
  return result
}

function camelize(str: string) {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

function processFields(fields: [any]) {
  const result: any = {}
  fields.forEach(item => {
    if (item.var === 'roles') {
      result.roles = item.roles && item.roles.role ? item.roles.role : []
    } else if (item.type === 'int') {
      result[camelize(item.var)] = parseInt(item.value)
    } else {
      result[camelize(item.var)] = item.value
    }
  })
  return result
}

const profile = types
  .compose(
    register,
    types.model('XmppProfile', {
      // own profile
      profile: types.maybe(OwnProfile),
      profiles: types.optional(types.map(Profile), {})
    })
  )
  .named('Profile')
  .actions(self => {
    return {
      registerProfile: (profile: IProfile): IProfile => self.profiles.put(profile) && self.profiles.get(profile.user)!,
      unregisterProfile: (user: string) => self.profiles.delete(user)
    }
  })
  .actions(self => {
    return {
      loadProfile: flow(function*(user: string) {
        console.log('WOCKY: loadProfile')
        try {
          if (!user) {
            throw new Error('User should not be null')
          }
          // try to connect
          if (!self.connected) {
            throw new Error('XMPP is not connected!')
          }
          const isOwn = user === self.username
          const node = `user/${user}`
          const fields = ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles']
          if (isOwn) {
            fields.push('email')
            fields.push('phone_number')
          }
          let iq = $iq({ type: 'get' }).c('get', { xmlns: USER, node })
          fields.forEach(field => {
            iq = iq.c('field', { var: field }).up()
          })
          const stanza = yield self.sendIQ(iq)
          const data = processFields(stanza.fields.field)
          if (isOwn) {
            self.profile = OwnProfile.create({ user, ...data })
            return self.profile
          } else {
            return self.registerProfile({ user, ...data })
          }
        } catch (e) {
          console.error(e)
        }
      })
    }
  })
  .actions(self => {
    return {
      updateProfile: flow(function*(d: Object) {
        const data = fromCamelCase(d)
        let iq = $iq({ type: 'set' }).c('set', {
          xmlns: USER,
          node: `user/${self.username}`
        })
        Object.keys(data).forEach(field => {
          if (Object.prototype.hasOwnProperty.call(data, field) && data[field]) {
            iq = iq
              .c('field', {
                var: field,
                type: field === 'avatar' ? 'file' : 'string'
              })
              .c('value')
              .t(data[field])
              .up()
              .up()
          }
        })
        yield self.sendIQ(iq)
        if (self.profile) {
          Object.assign(self.profile, d)
        }
      }),
      remove: flow(function*() {
        yield self.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }))
        yield self.disconnect()
      }),
      loadRelations: flow(function*(userId: string, relation: string = 'following', lastId?: string, max: number = 25) {
        const iq = $iq({
          type: 'get',
          to: self.host
        })
          .c('contacts', {
            xmlns: 'hippware.com/hxep/user',
            node: `user/${userId}`
          })
          .c('association')
          .t(relation)
          .up()
          .c('set', { xmlns: RSM_NS })
          .c('max')
          .t(max.toString())
          .up()

        if (lastId) {
          iq
            .c('after')
            .t(lastId!)
            .up()
        }
        const stanza = yield self.sendIQ(iq)
        let children = stanza.contacts.contact || []
        if (!Array.isArray(children)) {
          children = [children]
        }
        const list = []
        for (let i = 0; i < children.length; i++) {
          const { jid } = children[i]
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) !== self.host) {
            return
          }
          const user = Strophe.getNodeFromJid(jid)
          // TODO avoid extra request to load profile (server-side)
          const profile = yield self.loadProfile(user)
          list.push(profile)
        }
        return { list, count: parseInt(stanza.contacts.set.count) }
      })
    }
  })
  .actions(self => {
    let handler1: any = null
    return {
      afterCreate: () =>
        (handler1 = autorun(() => {
          if (self.connected && self.username) {
            self.loadProfile(self.username)
          }
        })),
      beforeDestroy: () => {
        self.profile = null
        self.profiles.clear()
        handler1()
      }
    }
  })

export default profile