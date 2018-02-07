// tslint:disable-next-line:no_unused-variable
import {types, getEnv, clone, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, when, autorun, IReactionDisposer} from 'mobx'
import RosterStore from './RosterStore'
import {Chats} from '../model/Chats'
import {Chat, IChat} from '../model/Chat'
import {Message, IMessage} from '../model/Message'
import utils from './utils'

const MEDIA = 'hippware.com/hxep/media'
const NS = 'hippware.com/hxep/conversations'
const RSM_NS = 'http://jabber.org/protocol/rsm'
const MAM_NS = 'urn:xmpp:mam:1'
const MAXINT = 1000

export function processMessage(stanza: any, ownUserId: string) {
  let id = stanza.id
  let archiveId
  let time = Date.now()
  let unread = stanza.unread
  let isArchived = false
  if (stanza.result && stanza.result.forwarded) {
    if (stanza.result.forwarded.delay) {
      time = utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime()
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
  const from = utils.getNodeJid(jid)
  const body = stanza.body || ''
  const to = utils.getNodeJid(stanza.to)
  if (stanza.delay) {
    let stamp = stanza.delay.stamp
    if (stanza.x) {
      stamp = stanza.x.stamp
    }
    if (stamp) {
      time = utils.iso8601toDate(stamp).getTime()
    }
  }
  if (!id) {
    id = utils.generateID()
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
    media: stanza.image && stanza.image.url ? stanza.image.url : null
  }
  return res
}

export default types
  .compose(
    RosterStore,
    types.model('XmppMessage', {
      chats: types.optional(Chats, Chats.create())
    })
  )
  .volatile(self => ({
    message: {} as any
  }))
  .named('MessageStore')
  .actions(self => ({
    createChat: (id: string): IChat => self.chats.get(id) || self.chats.add(Chat.create({id}))
  }))
  .actions(self => {
    return {
      _addMessage: (chatId: string, message: IMessage) => {
        const existingChat = self.chats.get(chatId)
        if (existingChat) {
          existingChat.addMessage(message)
          if (existingChat.active) {
            message.read()
          }
        } else {
          const chat = self.createChat(chatId)
          chat.addMessage(message)
        }
      }
    }
  })
  .actions(self => ({
    onMessage: (msg: any) => {
      self.message = msg
      if (msg.body || msg.media || msg.image || msg.result) {
        try {
          const {chatId, ...message} = processMessage({...msg, unread: true}, self.username!)
          if (message.media) {
            self.createFile(message.media)
          }
          if (!self.profiles.get(message.from!)) {
            throw `sender ${message.from} is unknown`
          }
          self._addMessage(chatId!, Message.create(message))
          //          self.addMessage(Message.create({...message, from: self.profiles.get(message.from!)}))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }))
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      _sendMessage: (msg: IMessage) => {
        let stanza = $msg({
          to: `${msg!.to!}@${self.host}`,
          type: 'chat',
          id: msg.id
        })
          .c('body')
          .t(msg.body || '')
        if (msg.media) {
          stanza = stanza
            .up()
            .c('image', {xmlns: MEDIA})
            .c('url')
            .t(msg.media.id)
        }
        provider.sendStanza(stanza)
        self._addMessage(msg.to, clone(msg))
      },
      loadChat: flow(function*(userId: string, lastId?: string, max: number = 20) {
        const iq = $iq({type: 'set', to: `${self.username}@${self.host}`})
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
          .t(`${userId}@${self.host}`)
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
        return yield self.sendIQ(iq)
      }),
      loadChats: flow(function*(max: number = 50) {
        const items: any = []
        let count = MAXINT
        let last
        while (items.length < count) {
          const iq = $iq({type: 'get', to: provider.username})
            .c('query', {xmlns: NS})
            .c('set', {xmlns: RSM_NS})

          if (last) {
            iq
              .c('after')
              .t(last)
              .up()
          }
          iq.c('max').t(max.toString())
          const data = yield self.sendIQ(iq)
          if (!data || !data.query || !data.query.item) {
            return []
          }
          let res = data.query.item
          count = data.query.set.count
          last = data.query.set.last
          if (!Array.isArray(res)) {
            res = [res]
          }
          for (const item of res) {
            items.push(item)
          }
        }
        items.forEach((item: any) => {
          const {other_jid, message, outgoing, timestamp} = item
          const sender: string = utils.getNodeJid(other_jid)!
          const from = outgoing === 'true' ? self.username : sender
          const to = outgoing === 'true' ? sender : self.username
          if (from) {
            const msg = Message.create(processMessage({...message, to, from, time: utils.iso8601toDate(timestamp).getTime()}, self.username!))
            const chat = self.createChat(sender)
            chat.addMessage(msg)
          }
        })
      })
    }
  })
  .actions(self => {
    const {provider} = getEnv(self)
    let handler: any
    return {
      afterCreate: () => {
        self.message = {}
        provider.onMessage = self.onMessage
        handler = autorun('MessageStore', async () => {
          try {
            if (self.connected && self.profile && self.roster.length) {
              await self.loadChats()
            }
          } catch (e) {
            console.error(e)
          }
        })
      },
      beforeDestroy: () => {
        if (handler) {
          handler()
        }
      }
    }
  })
