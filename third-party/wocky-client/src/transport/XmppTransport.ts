declare var Strophe, $iq, $pres, $msg: any

import {observable, when, action, runInAction} from 'mobx'
import * as Utils from './utils'
import {upload} from './FileService'
import './XmppStropheV2'
import {isArray, processMap} from './utils'
import {IWockyTransport, IPagingList} from './IWockyTransport'
import {IProfilePartial} from '../model/Profile'
const TIMEOUT = 30000
const BOT_NS = 'hippware.com/hxep/bot'
const EXPLORE_NEARBY = 'explore-nearby-result'
const FILE_NS = 'hippware.com/hxep/http-file'
const ROSTER = 'jabber:iq:roster'
const NEW_GROUP = '__new__'
const BLOCKED_GROUP = '__blocked__'
const GEOLOC_NS = 'http://jabber.org/protocol/geoloc'
const PUSH_NS = 'hippware.com/hxep/notifications'
const MEDIA = 'hippware.com/hxep/media'
const CONVERSATION_NS = 'hippware.com/hxep/conversations'
const RSM_NS = 'http://jabber.org/protocol/rsm'
const MAM_NS = 'urn:xmpp:mam:1'
const MAXINT = 1000
const USER = 'hippware.com/hxep/user'
const HANDLE = 'hippware.com/hxep/handle'
const EVENT_NS = 'hippware.com/hxep/publishing'

export class XmppTransport implements IWockyTransport {
  provider: any
  botVisitor: any
  resource: string
  @observable connected: boolean = false
  @observable connecting: boolean = false
  @observable iq: any = {}
  @observable rosterItem: any = {}
  @observable message: {id: string; message: any}
  @observable presence: {status: string; id: string}
  @observable username: string
  @observable password: string
  @observable host: string
  @observable geoBot: any
  @observable notification: any
  isGeoSearching: boolean = false

  constructor(provider: any, resource: string) {
    this.provider = provider
    this.resource = resource
    provider.onConnected = action(() => (this.connected = true))
    provider.onDisconnected = action(() => (this.connected = false))
    provider.onIQ = action((iq: any) => {
      this.iq = iq
      // console.log('ON IQ:', JSON.stringify(iq))
      if (iq.query && iq.query.item && !isArray(iq.query.item) && iq.query.item.jid) {
        this.rosterItem = processRosterItem(iq.query.item, this.host)
      }
    })
    provider.onMessage = action((msg: any) => {
      if (msg.body || msg.media || msg.image || msg.result) {
        const {chatId, ...message} = processMessage({...msg, unread: true}, this.username!)
        this.message = {id: chatId, message}
      } else if (msg[EXPLORE_NEARBY] && msg[EXPLORE_NEARBY].bot) {
        if (msg[EXPLORE_NEARBY].bot) {
          const bot = msg[EXPLORE_NEARBY].bot
          this.geoBot = {id: bot.id, ...processMap(bot)}
        }
      } else if (msg.notification) {
        if (msg.notification['reference-changed']) {
          this.notification = {changed: true, ...msg.notification['reference-changed']}
        } else if (msg.notification.item) {
          const item = processItem(msg.notification.item, msg.delay, this.username)
          if (item) {
            this.notification = {...item, version: msg.notification.item.version}
          }
        } else if (msg.notification.delete) {
          this.notification = {...msg.notification.delete, delete: true}
        } else {
          // console.warn('& notification: unhandled homestream notification', msg.notification) TODO logger
        }
      }
    })
    provider.onPresence = action((stanza: any) => {
      const id = Utils.getNodeJid(stanza.from)!
      if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
        const status = stanza.type || 'available'
        this.presence = {status, id}
      }
    })
  }
  @action
  async login(user?: string, password?: string, host?: string): Promise<boolean> {
    try {
      if (user) {
        this.username = user
      }
      if (password) {
        this.password = password
      }
      if (host) {
        this.host = host
      }
      runInAction(() => (this.connecting = true))
      await timeout(
        this.provider.login(this.username, this.password, this.host, this.resource),
        TIMEOUT
      )
      return true
    } catch (e) {
      runInAction(() => (this.connected = false))
      throw e
    } finally {
      runInAction(() => (this.connecting = false))
    }
  }

  @action
  async register(
    data: any,
    host?: string,
    providerName = 'digits'
  ): Promise<{username: string; password: string; host: string}> {
    if (host) {
      this.host = host
    }
    const password = `$J$${JSON.stringify({
      provider: providerName,
      resource: this.resource,
      token: true,
      provider_data: data!,
    })}`
    try {
      await this.provider.login('register', password, this.host, this.resource)
    } catch (error) {
      await this.disconnect()
      let d
      try {
        const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement
        d = Utils.parseXml(xml).failure
      } catch (e) {
        throw error
      }
      if ('redirect' in d) {
        const {user, server, token} = JSON.parse(d.text)
        runInAction(() => {
          // modify provider host to response's server
          this.provider.host = server!
          this.host = server!
          this.username = user!
          this.password = token!
        })
        return {username: user, host: server, password: token}
      } else {
        throw d.text ? new Error(d.text) : error
      }
    }
    throw new Error('register must throw exception')
  }
  async testRegister({phoneNumber}: {phoneNumber: string}, host: string) {
    return await this.register(
      {
        userID: `000000${phoneNumber}`,
        phoneNumber: `+1555${phoneNumber}`,
        authTokenSecret: '',
        authToken: '',
        emailAddressIsVerified: false,
        'X-Auth-Service-Provider': 'http://localhost:9999',
        emailAddress: '',
        'X-Verify-Credentials-Authorization': '',
      },
      host
    )
  }

  async disconnect() {
    this.provider.disconnectAfterSending()
    await timeout(new Promise(resolve => when(() => !this.connected, resolve)), TIMEOUT)
  }

  async sendIQ(data: any, withoutTo: boolean = false): Promise<any> {
    if (!data.tree().getAttribute('id')) {
      data.tree().setAttribute('id', Utils.getUniqueId('iq'))
    }
    if (!data.tree().getAttribute('to') && !withoutTo) {
      data.tree().setAttribute('to', this.host!)
    }
    if (!data.tree().getAttribute('from')) {
      data.tree().setAttribute('from', `${this.username!}@${this.host}`)
    }
    const id = data.tree().getAttribute('id')
    // console.log('SEND IQ:', data.toString())
    this.provider.sendIQ(data)
    return await new Promise((resolve, reject) =>
      when(
        () => this.iq && this.iq.id === id,
        () => {
          const stanza = this.iq
          if (stanza.type === 'error') {
            reject(
              stanza.error && stanza.error.text
                ? stanza.error.text['#text']
                : stanza.error['#text'] || stanza.error
            )
            // reject('ERROR for stanza: ' + data.toString() + ' ' + (stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error))
          } else {
            resolve(stanza)
          }
        }
      )
    )
  }
  async loadProfile(user: string): Promise<IProfilePartial | null> {
    const id = user
    const isOwn = id === this.username
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
      'roles',
    ]
    if (isOwn) {
      fields.push('email')
      fields.push('phone_number')
    }
    let iq = $iq({type: 'get'}).c('get', {xmlns: USER, node})
    fields.forEach(field => {
      iq = iq.c('field', {var: field}).up()
    })
    const stanza = await this.sendIQ(iq)
    return {id, ...processMap(stanza)} as IProfilePartial
  }
  async requestProfiles(users: string[]): Promise<any> {
    if (!users || !users.length) {
      return []
    }
    let iq = $iq({type: 'get'}).c('users', {xmlns: USER})
    users.forEach(user => {
      iq = iq.c('user', {jid: `${user}@${this.host}`}).up()
    })
    const stanza = await this.sendIQ(iq)
    let arr = stanza.users.user
    if (!isArray(arr)) {
      arr = [arr]
    }
    return arr.map((user: any) => ({id: user.user, ...processMap(user)}))
  }
  async updateProfile(d: any) {
    const fields = ['avatar', 'handle', 'email', 'first_name', 'tagline', 'last_name']
    const data = fromCamelCase(d)
    let iq = $iq({type: 'set'}).c('set', {
      xmlns: USER,
      node: `user/${this.username}`,
    })
    fields.forEach(field => {
      if (data[field]) {
        iq = iq
          .c('field', {
            var: field,
            type: field === 'avatar' ? 'file' : 'string',
          })
          .c('value')
          .t(data[field])
          .up()
          .up()
      }
    })
    await this.sendIQ(iq)
  }
  async lookup(handle: string) {
    const iq = $iq({type: 'get'})
      .c('lookup', {xmlns: HANDLE})
      .c('item', {id: handle})
    const stanza = await this.sendIQ(iq)
    const {jid, error} = stanza.results.item
    if (error) {
      throw error
    }
    const user = Strophe.getNodeFromJid(jid)
    return {id: user, ...processMap(stanza.results.item)}
  }
  async remove() {
    await this.sendIQ($iq({type: 'set'}).c('delete', {xmlns: USER}))
    await this.disconnect()
  }
  async loadRelations(
    userId: string,
    relation: string = 'following',
    lastId?: string,
    max: number = 10
  ) {
    const iq = $iq({
      type: 'get',
      to: this.host,
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
      .t(max.toString())
      .up()

    if (lastId) {
      iq
        .c('after')
        .t(lastId!)
        .up()
    }
    const stanza = await this.sendIQ(iq)
    let children = stanza.contacts.contact || []
    if (!isArray(children)) {
      children = [children]
    }
    const list = children
      .filter(({jid}: any) => Strophe.getDomainFromJid(jid))
      .map(({jid}: any) => ({id: Strophe.getNodeFromJid(jid)}))
    return {list, count: parseInt(stanza.contacts.set.count)}
  }

  async downloadURL(tros: string) {
    const iq = $iq({type: 'get'})
      .c('download-request', {xmlns: FILE_NS})
      .c('id', {})
      .t(tros)
    let data: any = await this.sendIQ(iq)
    if (!data) {
      throw new Error('invalid data')
    }
    if (!data.download) {
      throw new Error('file data should be defined')
    }
    data = data.download
    const headers: any = {}
    if (data.headers && data.headers.header) {
      let arr = data.headers.header
      if (!isArray(arr)) {
        arr = [arr]
      }
      for (const header of arr) {
        headers[header.name] = header.value
      }
    }
    return {url: data.url, headers}
  }
  async requestUpload({file, size, width, height, access}: any) {
    const iq = $iq({type: 'set'})
      .c('upload-request', {xmlns: FILE_NS})
      .c('filename', {})
      .t(file!.name!)
      .up()
      .c('size', {})
      .t(size!)
      .up()
      .c('mime-type', {})
      .t(file.type!)
      .up()
      .c('width', {})
      .t(width!)
      .up()
      .c('height', {})
      .t(height!)
      .up()
    if (access) {
      iq.c('access', {}).t(access)
    }
    // pass file to the result
    const stanza = await this.sendIQ(iq)
    const data = {...stanza.upload, file}
    // run upload in background
    await upload(data)
    return data.reference_url
  }
  sendStanza(stanza: any) {
    this.provider.sendStanza(stanza)
  }
  sendPresence(stanza: any) {
    this.provider.sendPresence(stanza)
  }
  async addToRoster(username: string, group: string) {
    const iq = $iq({type: 'set', to: `${this.username}@${this.host}`})
      .c('query', {xmlns: ROSTER})
      .c('item', {jid: `${username}@${this.host}`})
      .c('group')
      .t(group)
    await this.sendIQ(iq)
  }
  async removeFromRoster(username: string) {
    const iq = $iq({type: 'set', to: `${this.username}@${this.host}`})
      .c('query', {xmlns: ROSTER})
      .c('item', {jid: `${username}@${this.host}`, subscription: 'remove'})
    await this.sendIQ(iq)
  }
  async follow(username: string) {
    this.sendPresence({to: `${username}@${this.host}`, type: 'subscribe'})
    await this.addToRoster(username, '')
  }
  async unfollow(username: string) {
    this.sendPresence({to: `${username}@${this.host}`, type: 'unsubscribe'})
  }
  async block(username: string) {
    await this.addToRoster(username, BLOCKED_GROUP)
  }
  async unblock(username: string) {
    await this.addToRoster(username, '')
  }
  async requestRoster() {
    const iq = $iq({type: 'get', to: `${this.username}@${this.host}`}).c('query', {
      xmlns: ROSTER,
    })
    const stanza = await this.sendIQ(iq)
    let children = stanza.query.item
    if (children && !isArray(children)) {
      children = [children]
    }
    return children.map((rec: any) => processRosterItem(rec, this.host))
  }
  async enablePush(token: string): Promise<void> {
    const iq = $iq({type: 'set'}).c('enable', {
      xmlns: PUSH_NS,
      platform: 'apple',
      device: token,
    })
    const data = await this.sendIQ(iq)
    if (!data || !(data.enabled || data.enabled === '')) throw data
  }
  async disablePush(): Promise<void> {
    const iq = $iq({type: 'set'}).c('disable', {xmlns: PUSH_NS})
    const data = await this.sendIQ(iq)
    if (!data || !(data.disabled || data.disabled === '')) throw data
  }
  sendMessage(msg: any) {
    let stanza = $msg({
      to: `${msg!.to!}@${this.host}`,
      type: 'chat',
      id: msg.id,
    })
      .c('body')
      .t(msg.body ? msg.body.trim() : '')
    if (msg.media) {
      stanza = stanza
        .up()
        .c('image', {xmlns: MEDIA})
        .c('url')
        .t(msg.media.id)
    }
    this.provider.sendStanza(stanza)
  }
  async loadChat(userId: string, lastId?: string, max: number = 20) {
    const iq = $iq({type: 'set', to: `${this.username}@${this.host}`})
      .c('query', {xmlns: MAM_NS})
      .c('x', {xmlns: 'jabber:x:data', type: 'submit'})
      .c('field', {var: 'FORM_TYPE', type: 'hidden'})
      .c('value')
      .t(MAM_NS)
      .up()
      .up()
      .c('field', {var: 'reverse'})
      .c('value')
      .t('true')
      .up()
      .up()
      .c('field', {var: 'with'})
      .c('value')
      .t(`${userId}@${this.host}`)
      .up()
      .up()
      .up()
      .c('set', {xmlns: RSM_NS})
      .c('max')
      .t(max.toString())
      .up()
      .c('before')
    if (lastId) {
      iq.t(lastId).up()
    }
    return await this.sendIQ(iq)
  }
  async loadChats(max: number = 50): Promise<Array<{id: string; message: any}>> {
    const items: any = []
    let count = MAXINT
    let last
    while (items.length < count) {
      const iq = $iq({type: 'get', to: this.username + '@' + this.host})
        .c('query', {xmlns: CONVERSATION_NS})
        .c('set', {xmlns: RSM_NS})

      if (last) {
        iq
          .c('after')
          .t(last)
          .up()
      }
      iq.c('max').t(max.toString())
      const data = await this.sendIQ(iq)
      if (!data || !data.query || !data.query.item) {
        return []
      }
      let res = data.query.item
      count = data.query.set.count
      last = data.query.set.last
      if (!isArray(res)) {
        res = [res]
      }
      for (const item of res) {
        items.push(item)
      }
    }
    return items.map((item: any) => {
      const {other_jid, message, outgoing, timestamp} = item
      const sender: string = Utils.getNodeJid(other_jid)!
      const from = outgoing === 'true' ? this.username : sender
      const to = outgoing === 'true' ? sender : this.username
      return {
        id: sender,
        message: processMessage(
          {...message, to, from, time: Utils.iso8601toDate(timestamp).getTime()},
          this.username!
        ),
      }
    })
  }

  async generateId() {
    const iq = $iq({type: 'set'}).c('new-id', {xmlns: BOT_NS})
    const data = await this.sendIQ(iq)
    if (data['new-id']) {
      if (data['new-id']['#text']) {
        return data['new-id']['#text']
      } else {
        return data['new-id']
      }
    } else {
      throw new Error('Cannot generate ID')
    }
  }
  async removeBot(id: string) {
    const iq = $iq({type: 'set', to: this.host}).c('delete', {xmlns: BOT_NS, node: `bot/${id}`})
    await this.sendIQ(iq)
  }
  async loadGeofenceBots(): Promise<IPagingList> {
    throw new Error('Not supported')
  }
  async loadOwnBots(userId: string, lastId?: string, max: number = 10) {
    const iq = $iq({type: 'get', to: this.host})
      .c('bot', {xmlns: BOT_NS, user: `${userId}@${this.host}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(max.toString())
      .up()

    if (lastId) {
      iq
        .c('before')
        .t(lastId!)
        .up()
    } else {
      iq.c('before').up()
    }
    const data = await this.sendIQ(iq)
    let bots = data.bots.bot
    if (!bots) {
      bots = []
    }
    if (!isArray(bots)) {
      bots = [bots]
    }
    return {
      list: bots.map((item: any) => ({id: item.id, ...processMap(item)})),
      count: parseInt(data.bots.set.count),
    }
  }
  async loadBotSubscribers(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    const iq = $iq({type: 'get', to: this.host})
      .c('subscribers', {
        xmlns: BOT_NS,
        node: `bot/${id}`,
      })
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .up()
      .c('max')
      .t(max.toString())
      .up()
    if (lastId) {
      iq
        .c('after')
        .t(lastId!)
        .up()
    }
    const data = await this.sendIQ(iq)
    let arr = data.subscribers.subscriber || []
    if (!isArray(arr)) {
      arr = [arr]
    }
    const list = await this.requestProfiles(arr.map((rec: any) => rec.jid.split('@')[0]))
    return {list, count: parseInt(data.subscribers.set.count)}
  }
  async loadBotGuests(id: string, lastId?: string, max: number = 10) {
    // console.log('loadBotGuests', id, lastId, max)
    const iq = $iq({type: 'get', to: this.host})
      .c('guests', {
        xmlns: BOT_NS,
        node: `bot/${id}`,
      })

      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .up()
      .c('max')
      .t(max.toString())
      .up()
    if (lastId) {
      iq
        .c('after')
        .t(lastId!)
        .up()
    }

    const data = await this.sendIQ(iq)
    let arr = data.guests.guest || []
    if (!isArray(arr)) {
      arr = [arr]
    }
    const list = await this.requestProfiles(arr.map((rec: any) => rec.jid.split('@')[0]))
    return {list, count: parseInt(data.guests.set.count)}
  }
  async loadBotVisitors(id: string, lastId?: string, max: number = 10) {
    const iq = $iq({type: 'get', to: this.host})
      .c('visitors', {
        xmlns: BOT_NS,
        node: `bot/${id}`,
      })

      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .up()
      .c('max')
      .t(max.toString())
      .up()
    if (lastId) {
      iq
        .c('after')
        .t(lastId!)
        .up()
    }

    const data = await this.sendIQ(iq)
    let arr = data.visitors.visitor || []
    if (!isArray(arr)) {
      arr = [arr]
    }
    const list = await this.requestProfiles(arr.map((rec: any) => rec.jid.split('@')[0]))
    return {list, count: parseInt(data.visitors.set.count)}
  }
  async setLocation(): Promise<void> {
    throw new Error('Not supported')
  }
  async getLocationsVisited(): Promise<object[]> {
    throw new Error('Not supported')
  }
  async loadBotPosts(id: string, before?: string) {
    const iq = $iq({type: 'get', to: this.host})
      .c('query', {xmlns: BOT_NS, node: `bot/${id}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      // .c('reverse')
      // .up()
      // .c('max')
      // .t(limit)
      .up()

    if (before) {
      iq
        .c('before')
        .t(before)
        .up()
    } else {
      iq.c('before').up()
    }

    const data = await this.sendIQ(iq)
    let res = data.query.item
    if (!res) {
      res = []
    }
    if (!isArray(res)) {
      res = [res]
    }
    return {
      count: parseInt(data.query.set.count),
      list: res.map((x: any) => {
        const post = {...x, ...x.entry}
        const profile = {
          id: Utils.getNodeJid(x.author)!,
          handle: post.author_handle,
          firstName: post.author_first_name,
          lastName: post.author_last_name,
          avatar: post.author_avatar,
        }
        return {
          id: post.id,
          content: post.content,
          image: post.image,
          time: Utils.iso8601toDate(post.updated).getTime(),
          profile,
        }
      }),
    }
  }
  async loadSubscribedBots(userId: string, lastId?: string, max: number = 10) {
    const iq = $iq({type: 'get', to: this.host})
      .c('subscribed', {xmlns: BOT_NS, user: `${userId}@${this.host}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(max.toString())
      .up()

    if (lastId) {
      iq
        .c('before')
        .t(lastId)
        .up()
    } else {
      iq.c('before').up()
    }
    const data = await this.sendIQ(iq)
    let bots = data.bots.bot
    if (!bots) {
      bots = []
    }
    if (!isArray(bots)) {
      bots = [bots]
    }
    return {
      list: bots.map((item: any) => ({id: item.id, ...processMap(item)})),
      count: parseInt(data.bots.set.count),
    }
  }
  async updateBot(bot: any) {
    const {
      title,
      image,
      description,
      address,
      location,
      visibility,
      geofence,
      radius,
      id,
      addressData,
    } = bot
    const iq = bot.isNew
      ? $iq({type: 'set'}).c('create', {xmlns: BOT_NS})
      : $iq({type: 'set'}).c('fields', {
          xmlns: BOT_NS,
          node: `bot/${bot.id}`,
        })

    addValues(iq, {
      id,
      title,
      address_data: JSON.stringify(addressData),
      description,
      geofence,
      radius: Math.round(radius),
      address,
      image,
      visibility,
    })
    if (location && location.latitude !== undefined && location.longitude !== undefined) {
      addField(iq, 'location', 'geoloc')
      iq
        .c('geoloc', {xmlns: GEOLOC_NS})
        .c('lat')
        .t(location.latitude)
        .up()
        .c('lon')
        .t(location.longitude)
        .up()

      if (location.accuracy) {
        iq.c('accuracy').t(location.accuracy)
      }
    }
    await this.sendIQ(iq)
  }
  async loadBot(id: string, server: any) {
    const iq = $iq({type: 'get', to: server || this.host}).c('bot', {
      xmlns: BOT_NS,
      node: `bot/${id}`,
    })
    const data = await this.sendIQ(iq)
    return {id: data.bot.id, ...processMap(data.bot)}
  }
  async removeBotPost(id: string, postId: string) {
    const iq = $iq({type: 'set', to: this.host})
      .c('retract', {xmlns: BOT_NS, node: `bot/${id}`})
      .c('item', {id: postId})
    await this.sendIQ(iq)
  }
  shareBot(id: string, server: string, recepients: string[], message: string, shareAction: string) {
    const msg = $msg({
      from: this.username + '@' + this.host,
      type: 'headline',
      to: this.host,
    }).c('addresses', {xmlns: 'http://jabber.org/protocol/address'})

    recepients.forEach(user => {
      if (user === 'friends') {
        msg.c('address', {type: 'friends'}).up()
      } else if (user === 'followers') {
        msg.c('address', {type: 'followers'}).up()
      } else {
        msg.c('address', {type: 'to', jid: `${user}@${this.host}`}).up()
      }
    })
    msg.up()
    msg
      .c('body')
      .t(message)
      .up()
    msg
      .c('bot', {xmlns: BOT_NS})
      .c('jid')
      .t(`${server}/bot/${id}`)
      .up()
      .c('id')
      .t(id)
      .up()
      .c('server')
      .t(server)
      .up()
      .c('action')
      .t(shareAction)

    this.sendStanza(msg)
  }

  async publishBotPost(botId: string, post: any) {
    const iq = $iq({type: 'set', to: this.host})
      .c('publish', {xmlns: BOT_NS, node: `bot/${botId}`})
      .c('item', {id: post.id, contentID: post.id})
      .c('entry', {xmlns: 'http://www.w3.org/2005/Atom'})
      .c('title')
      .t(post.title)
      .up()
    if (post.content) {
      iq
        .c('content')
        .t(post.content)
        .up()
    }
    if (post.image) {
      iq
        .c('image')
        .t(post.image.id)
        .up()
    }
    await this.sendIQ(iq)
  }
  async subscribeBot(id: string, geofence: boolean = false) {
    const iq = $iq({type: 'set', to: this.host})
      .c('subscribe', {
        xmlns: BOT_NS,
        node: `bot/${id}`,
      })
      .c('geofence')
      .t(geofence.toString())
    const data = await this.sendIQ(iq)
    return parseInt(data['subscriber_count'])
  }
  async unsubscribeBot(id: string, geofence: boolean = false) {
    const iq = $iq({type: 'set', to: this.host})
      .c('unsubscribe', {
        xmlns: BOT_NS,
        node: `bot/${id}`,
      })
      .c('geofence')
      .t(geofence.toString())
    const data = await this.sendIQ(iq)
    return parseInt(data['subscriber_count'])
  }
  async loadUpdates(ver: string) {
    const iq = $iq({type: 'get', to: this.username + '@' + this.host})
    iq.c('catchup', {xmlns: EVENT_NS, node: 'home_stream', version: ver})
    const data = await this.sendIQ(iq)
    const {list, version, bots} = processHomestreamResponse(data, this.username)
    return {list, version, bots: bots.map((bot: any) => ({id: bot.id, ...processMap(bot)}))}
  }
  async loadHomestream(lastId: any, max: number = 3) {
    const iq = $iq({type: 'get', to: this.username + '@' + this.host})
    iq.c('items', {xmlns: EVENT_NS, node: 'home_stream'})
    iq.c('exclude-deleted').up()
    iq
      .c('set', {xmlns: RSM_NS})
      .c('reverse')
      .up()
      .c('max')
      .t(max.toString())
      .up()

    if (lastId) {
      iq
        .c('before')
        .t(lastId)
        .up()
    } else {
      iq.c('before').up()
    }
    const data = await this.sendIQ(iq)
    const {list, count, version, bots} = processHomestreamResponse(data, this.username)
    return {list, count, version, bots: bots.map((bot: any) => ({id: bot.id, ...processMap(bot)}))}
  }
  subscribeToHomestream(version: string) {
    const iq = $pres({to: `${this.username}@${this.host}/home_stream`}).c('query', {
      xmlns: EVENT_NS,
      version,
    })
    this.sendStanza(iq)
  }
  async geosearch({latitude, longitude, latitudeDelta, longitudeDelta}: any) {
    if (!this.isGeoSearching) {
      try {
        this.isGeoSearching = true
        const iq = $iq({type: 'get', to: this.host})
          .c('bots', {
            xmlns: BOT_NS,
          })
          .c('explore-nearby', {
            limit: 100,
            lat_delta: latitudeDelta,
            lon_delta: longitudeDelta,
            lat: latitude,
            lon: longitude,
          })
        await this.sendIQ(iq)
      } catch (e) {
        // TODO: how do we handle errors here?
        // console.error(e)
      } finally {
        this.isGeoSearching = false
      }
    }
  }
}
export function processMessage(stanza: any, ownUserId: string) {
  let id = stanza.id
  let archiveId
  let time = stanza.time || Date.now()
  let unread = stanza.unread
  let isArchived = false
  if (stanza.result && stanza.result.forwarded) {
    if (stanza.result.forwarded.delay) {
      time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime()
      unread = false
    }
    isArchived = true
    id = stanza.result.id
    archiveId = id
    stanza = stanza.result.forwarded.message
    if (stanza.id) {
      id = stanza.id
    }
  }
  if (stanza.archived) {
    archiveId = stanza.archived.id
    isArchived = true
    if (!id) {
      id = stanza.archived.id
    }
  }
  const jid = stanza.from
  const from = Utils.getNodeJid(jid)
  const body = stanza.body || ''
  const to = Utils.getNodeJid(stanza.to)
  if (stanza.delay) {
    let stamp = stanza.delay.stamp
    if (stanza.x) {
      stamp = stanza.x.stamp
    }
    if (stamp) {
      time = Utils.iso8601toDate(stamp).getTime()
    }
  }
  if (!id) {
    id = Utils.generateID()
  }
  const chatId = ownUserId === from ? to : from
  const res = {
    from,
    chatId,
    body,
    archiveId,
    isArchived,
    to,
    id,
    time,
    unread,
    media: stanza.image && stanza.image.url ? stanza.image.url : null,
  }
  return res
}
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

function addField(iq: any, name: string, type: string) {
  iq.c('field', {var: name, type})
}

function addValue(iq: any, name: string, value: any) {
  if (value !== undefined && value !== null) {
    const type = typeof value === 'number' ? 'int' : typeof value === 'boolean' ? 'bool' : 'string'
    addField(iq, name, type)
    iq
      .c('value')
      .t(value)
      .up()
      .up()
  }
}

function addValues(iq: any, values: any) {
  for (const key of Object.keys(values)) {
    addValue(iq, key, values[key])
  }
}

export function processHomestreamResponse(data: any, username: string) {
  let items = data.items && data.items.item ? data.items.item : []
  let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : []
  if (!isArray(bots)) {
    bots = [bots]
  }
  if (!isArray(items)) {
    items = [items]
  }
  const list = items.map((rec: any) => processItem(rec, null, username)).filter((x: any) => x)
  // process deletes
  if (data.items.delete) {
    let deletes = data.items.delete
    if (!isArray(deletes)) {
      deletes = [deletes]
    }
    deletes.forEach((rec: any) =>
      list.push({id: rec.id, time: Utils.iso8601toDate(rec.version).getTime(), delete: true})
    )
  }

  return {
    list,
    bots,
    version: data.items.version,
    count: parseInt((data.items && data.items.set && data.items.set.count) || 0),
  }
}

export function processItem(item: any, delay: any, username: string): any {
  const time = Utils.iso8601toDate(item.version).getTime()
  if (item.message) {
    const {message, id, from} = item
    const {bot, event, body, media, image} = message
    if (bot && bot.action === 'show') {
      return {id, bot: bot.id, time, created: true}
    }

    if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
      const userId = Utils.getNodeJid(bot['user-jid'])
      return {id, bot: bot.id, time, profile: userId, isEnter: bot.action === 'enter'}
    }

    if (event && event.item && event.item.entry) {
      const {entry, author} = event.item
      const eventId = event.node.split('/')[1]
      return {
        id,
        bot: eventId,
        time,
        post: {
          id: eventId + id,
          image: entry.image,
          content: entry.content,
          profile: Utils.getNodeJid(author),
        },
      }
    }

    if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
      const noteBot = item.message['bot-description-changed'].bot
      return {
        id: item.id,
        bot: noteBot.id,
        time: Utils.iso8601toDate(item.version).getTime(),
        note: noteBot.description,
      }
    }

    if (event && event.retract) {
      return {id: event.retract.id, delete: true}
    }
    if (body || media || image || bot) {
      const msg = processMessage(
        {
          ...message,
          from,
          to: username,
        },
        username
      )
      if (!message.delay) {
        if (delay && delay.stamp) {
          msg.time = Utils.iso8601toDate(delay.stamp).getTime()
        } else {
          msg.time = Utils.iso8601toDate(item.version).getTime()
        }
      }
      return bot ? {id, bot: bot.id, time, message: msg, action: bot.action} : null
    }
  } else {
    // console.log('& UNSUPPORTED ITEM!', item) TODO
  }
  return null
}
function processRosterItem(item: any = {}, host: string) {
  const {handle, roles, avatar, jid, group, subscription, ask, created_at, ...props} = item
  const firstName = props.first_name
  const lastName = props.last_name
  // ignore other domains
  if (Strophe.getDomainFromJid(jid) !== host) {
    return
  }
  const id = Strophe.getNodeFromJid(jid)
  const createdTime = Utils.iso8601toDate(created_at).getTime()
  const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24))
  const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group]
  const rolesArr = roles && roles.role ? (isArray(roles.role) ? roles.role : [roles.role]) : []
  return {
    id,
    firstName,
    lastName,
    handle,
    avatar,
    roles: rolesArr,
    isNew: groups.includes(NEW_GROUP) && days <= 7,
    isBlocked: group === BLOCKED_GROUP,
    isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
    isFollower: subscription === 'from' || subscription === 'both',
  }
}

function timeout(promise: Promise<any>, timeoutMillis: number) {
  let _timeout: any
  return Promise.race([
    promise,
    new Promise((_0, reject) => {
      _timeout = setTimeout(() => {
        reject('Operation timed out')
      }, timeoutMillis)
    }),
  ]).then(
    v => {
      clearTimeout(_timeout)
      return v
    },
    err => {
      clearTimeout(_timeout)
      throw err
    }
  )
}
