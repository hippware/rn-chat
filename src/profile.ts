import {
  types,
  flow,
  getSnapshot,
  applySnapshot,
  IModelType,
  IExtendedObservableMap,
  ISnapshottable
} from 'mobx-state-tree'
import { Profile, IProfile, ProfileList } from './model'
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

export default types
  .compose(
    register,
    types.model('XmppProfile', {
      // own profile
      profile: types.maybe(types.reference(Profile)),
      profiles: types.optional(types.map(Profile), {})
    })
  )
  .actions(self => {
    return {
      registerProfile: (profile: IProfile): IProfile =>
        self.profiles.put(profile) && self.profiles.get(profile.user)!,
      unregisterProfile: (user: string) => self.profiles.delete(user)
    }
  })
  .actions(self => {
    return {
      loadProfile: flow(function*(user: string) {
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
          const fields = [
            'avatar',
            'handle',
            'first_name',
            'tagline',
            'last_name',
            'bots+size',
            'followers+size',
            'followed+size',
            'roles'
          ]
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
          const profile = self.registerProfile({ user, ...data })
          if (isOwn) {
            self.profile = profile
          }
          return profile
        } catch (e) {
          console.error(e)
        }
      }),
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
        // update own profile
        if (!self.profile) {
          self.profile = Profile.create({})
        }
        Object.assign(self.profile, d)
      }),
      remove: flow(function*() {
        yield self.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }))
        yield self.disconnect()
      })
      //   loadRelations: flow(function* (profileList: ProfileList, userId: string, relation: string = 'follower') {
      //     if (profileList.loading) {
      //       return
      //     }
      //     if (profileList.finished) {
      //       return
      //     }
      //     profileList.startLoading()

      //     const iq = $iq({
      //       type: 'get',
      //       to: self.host
      //     })
      //       .c('contacts', {
      //         xmlns: 'hippware.com/hxep/user',
      //         node: `user/${userId}`
      //       })
      //       .c('association')
      //       .t(relation)
      //       .up()
      //       .c('set', { xmlns: RSM_NS })
      //       .c('max')
      //       .t(25)
      //       .up()

      //     if (profileList.lastId) {
      //       iq
      //         .c('after')
      //         .t(profileList.lastId)
      //         .up()
      //     }

      //     try {
      //       const stanza = yield self.sendIQ(iq)

      //       let children = stanza.contacts.contact
      //       if (children && !Array.isArray(children)) {
      //         children = [children]
      //       }
      //       if (children) {
      //         children.forEach(child => {
      //           const { handle, jid } = child
      //           // ignore other domains
      //           if (Strophe.getDomainFromJid(jid) !== self.host) {
      //             return
      //           }
      //           const user = Strophe.getNodeFromJid(jid)
      //           const profileToAdd: IProfile = self.registerProfile({ user, handle })
      //           console.log('PROFILE', profileToAdd)
      //           profileList.add(profileToAdd)
      //         })
      //         profileList.setLastId(stanza.contacts.set.last)
      //         if (profileList.length === parseInt(stanza.contacts.set.count)) {
      //           profileList.complete()
      //         }
      //       }
      //     } catch (error) {
      //       console.warn('REQUEST RELATIONS error:', error)
      //     } finally {
      //       profileList.stopLoading()
      //     }
      //   }),
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
