// tslint:disable-next-line:no_unused-variable
import {types, flow, getSnapshot, applySnapshot, IModelType, IExtendedObservableMap, ISnapshottable} from 'mobx-state-tree'
import {IProfile} from '../model/Profile'
import {OwnProfile} from '../model/OwnProfile'
import utils from './utils'

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
      profile: types.maybe(OwnProfile)
    })
  )
  .named('ProfileStore')
  .actions(self => {
    return {
      _processMap: (data: {[key: string]: any}): any => {
        const res: {[key: string]: any} = {}
        Object.keys(data).forEach(key => {
          const value = data[key]
          try {
            if (value && value !== 'null' && key !== 'field') {
              if (key === 'roles') {
                res.roles = Array.isArray(data.roles.role) ? data.roles.role : [data.roles.role]
              } else if (['followers', 'bots', 'followed'].indexOf(key) !== -1) {
                res[key + 'Size'] = parseInt(data[key].size)
              } else if (data[key].thumbnail_url !== undefined) {
                // we have image here!
                if (data[key]['#text']) {
                  const file = self.files.get(data[key]['#text'])
                  if (data[key].thumbnail_url) {
                    file.setURL(data[key].thumbnail_url)
                  }
                  res[key] = file
                }
              } else if (key === 'subscribed') {
                res.isSubscribed = value === 'true'
              } else if (key === 'owner') {
                res.owner = Strophe.getNodeFromJid(value)
              } else if (key === 'subscribers') {
                res.followersSize = parseInt(value.size)
              } else if (key === 'location') {
                res.location = {latitude: parseFloat(value.geoloc.lat), longitude: parseFloat(value.geoloc.lon)}
              } else if (key === 'updated') {
                res.time = utils.iso8601toDate(value).getTime()
              } else if (key === 'radius') {
                res.radius = parseFloat(value)
              } else {
                const numbers = ['image_items', 'total_items', 'visibility']
                res[camelize(key)] = numbers.indexOf(key) !== -1 ? parseInt(value) : value
              }
            }
          } catch (e) {
            console.error(`Cannot process key ${key} value: ${value}`)
          }
        })
        delete res.id
        return res
      }
    }
  })
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
        const data = self._processMap(stanza)
        let res: IProfile = self.profiles.get(id, data)
        if (isOwn) {
          self.profile = OwnProfile.create(getSnapshot(res))
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
      _requestProfiles: flow(function*(users: string[]) {
        if (!users || !users.length) {
          return []
        }
        let iq = $iq({type: 'get'}).c('users', {xmlns: USER})
        users.forEach(user => {
          iq = iq.c('user', {jid: `${user}@${self.host}`}).up()
        })
        const stanza = yield self.sendIQ(iq)
        let arr = stanza.users.user
        if (!Array.isArray(arr)) {
          arr = [arr]
        }
        return arr.map((user: any) => self.profiles.get(user.user, self._processMap(user)))
      }),
      _updateProfile: flow(function*(d: Object) {
        const fields = ['avatar', 'handle', 'email', 'first_name', 'tagline', 'last_name']
        const data = fromCamelCase(d)
        let iq = $iq({type: 'set'}).c('set', {
          xmlns: USER,
          node: `user/${self.username}`
        })
        fields.forEach(field => {
          if (data[field]) {
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
        return self.profiles.get(user, self._processMap(stanza.results.item))
      }),
      remove: flow(function*() {
        yield self.sendIQ($iq({type: 'set'}).c('delete', {xmlns: USER}))
        yield self.disconnect()
      }),
      _loadRelations: flow(function*(userId: string, relation: string = 'following', lastId?: string, max: number = 10) {
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
        (handler1 = autorun('ProfileStore', () => {
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
