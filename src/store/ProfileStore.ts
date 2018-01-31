// tslint:disable-next-line:no_unused-variable
import {types, flow, getSnapshot, applySnapshot, IModelType, IExtendedObservableMap, ISnapshottable} from 'mobx-state-tree'
import {Profile, OwnProfile, IProfile} from '../model/Profile'
// tslint:disable-next-line:no_unused-variable
import {autorun, IReactionDisposer, IObservableArray} from 'mobx'
import {FileStore} from './FileStore'

const USER = 'hippware.com/hxep/user'
const HANDLE = 'hippware.com/hxep/handle'
const RSM_NS = 'http://jabber.org/protocol/rsm'

function fromCamelCase(data: any = {}) {
  const {firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = data
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

function camelize(str: string): string {
  return str
    .replace(/\W|_|\d/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

const profileStore = types
  .compose(
    FileStore,
    types.model('XmppProfile', {
      // own profile
      profile: types.maybe(OwnProfile),
      profiles: types.optional(types.map(Profile), {})
    })
  )
  .named('ProfileStore')
  .actions(self => {
    return {
      registerProfile: (profile: IProfile): IProfile => {
        self.profiles.put(profile)
        return self.profiles.get(profile.id)!
      },
      unregisterProfile: (user: string) => self.profiles.delete(user),
      processMap: (data: {[key: string]: any}): any => {
        const res: {[key: string]: any} = {}
        Object.keys(data).forEach(key => {
          if (data[key]) {
            if (key === 'roles') {
              res.roles = Array.isArray(data.roles.role) ? data.roles.role : [data.roles.role]
            } else if (['followers', 'bots', 'followed'].indexOf(key) !== -1) {
              res[key + 'Size'] = parseInt(data[key].size)
            } else if (key === 'avatar' && data.avatar) {
              if (data.avatar['#text']) {
                const file = self.createFile(data.avatar['#text'])
                if (data.avatar.thumbnail_url) {
                  file.setURL(data.avatar.thumbnail_url)
                }
                res.avatar = file
              }
            } else {
              res[camelize(key)] = data[key]
            }
          }
        })
        return res
      }
    }
  })
  .actions(self => ({
    createProfile: (id: string, data: any) => {
      if (self.profiles.get(id)) {
        Object.assign(self.profiles.get(id), {...data, id})
        return self.profiles.get(id)!
      } else {
        const profile = Profile.create({...data, id})
        return self.registerProfile(profile)
      }
    }
  }))
  .actions(self => {
    return {
      loadProfile: flow(function*(user: string) {
        const id = user
        const isOwn = id === self.username
        const node = `user/${user}`
        const fields = ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles']
        if (isOwn) {
          fields.push('email')
          fields.push('phone_number')
        }
        let iq = $iq({type: 'get'}).c('get', {xmlns: USER, node})
        fields.forEach(field => {
          iq = iq.c('field', {var: field}).up()
        })
        const stanza = yield self.sendIQ(iq)
        const data = self.processMap(stanza)
        const profile = {...data, id}
        let res: IProfile
        if (isOwn) {
          if (self.profile) {
            Object.assign(self.profile, profile)
          } else {
            self.profile = OwnProfile.create(profile)
          }
          self.createProfile(id, profile)
          res = self.profile
        } else {
          res = self.createProfile(id, profile)
        }
        return res
      })
    }
  })
  .actions(self => ({
    getProfile: flow(function*(id: string) {
      return self.profiles.get(id) || (yield self.loadProfile(id))
    })
  }))
  .actions(self => {
    return {
      updateProfile: flow(function*(d: Object) {
        // load profile if it is not loaded yet
        if (!self.profile) {
          yield self.loadProfile(self.username!)
        }
        const data = fromCamelCase(d)
        let iq = $iq({type: 'set'}).c('set', {
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
        Object.assign(self.profile, d)
      }),
      lookup: flow<string>(function*(handle: string) {
        const iq = $iq({type: 'get'})
          .c('lookup', {xmlns: HANDLE})
          .c('item', {id: handle})
        const stanza = yield self.sendIQ(iq)
        const {jid, error} = stanza.results.item
        if (error) {
          throw error
        }
        const user = Strophe.getNodeFromJid(jid)
        const profile = self.createProfile(user, self.processMap(stanza.results.item))
        return profile
      }),
      remove: flow(function*() {
        yield self.sendIQ($iq({type: 'set'}).c('delete', {xmlns: USER}))
        yield self.disconnect()
      }),
      loadRelations: flow(function*(userId: string, relation: string = 'following', lastId?: string, max: number = 10) {
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
          .c('set', {xmlns: RSM_NS})
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
          const {jid} = children[i]
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) !== self.host) {
            return
          }
          const user = Strophe.getNodeFromJid(jid)
          // TODO avoid extra request to load profile (server-side)
          const profile = yield self.getProfile(user!)
          list.push(profile)
        }
        return {list, count: parseInt(stanza.contacts.set.count)}
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

export default profileStore
