// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
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

export default types
  .compose(
    RosterStore,
    types.model('XmppMessage', {
      chats: types.optional(Chats, Chats.create()),
      message: types.frozen
    })
  )
  .named('MessageStore')
  .actions(self => ({
    createChat: (id: string): IChat => self.chats.get(id) || self.chats.add(Chat.create({id}))
  }))
  .actions(self => {
    return {
      processMessage: (stanza: any): IMessage => {
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
        const user = utils.getNodeJid(jid)
        if (!self.profiles.get(user!)) {
          throw `sender ${user} is unknown`
        }
        const from = self.profiles.get(user!)
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
        const msg = Message.create({
          from,
          body,
          archiveId,
          isArchived,
          to,
          id,
          time,
          unread,
          media: stanza.image && stanza.image.url ? self.createFile(stanza.image.url) : null
        })
        return msg
      },
      addMessage: (message: IMessage) => {
        const profile = message.from.isOwn ? self.profiles.get(message.to)! : message.from
        const chatId = message.from.isOwn ? message.to : profile.id
        const existingChat = self.chats.get(chatId)
        if (existingChat) {
          existingChat.addParticipant(profile)
          existingChat.addMessage(message)
          if (existingChat.active) {
            message.read()
          }
        } else {
          const chat = self.createChat(chatId)
          chat.addParticipant(profile)
          chat.addMessage(message)
        }
      }
    }
  })
  .actions(self => ({
    onMessage: (msg: any) => {
      self.message = msg
      if (msg.body || msg.media || msg.image || msg.result) {
        self.addMessage(self.processMessage({...msg, unread: true}))
      }
    }
  }))
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      createMessage: (msg: any) => {
        const message = Message.create({...msg, from: self.profiles.get(self.username!)!})
        self.addMessage(message)
        return message
      },
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
          const from = self.profiles.get(outgoing === 'true' ? self.username! : sender)!
          const msg = Message.create({...message, from, time: utils.iso8601toDate(timestamp).getTime()})
          const chat = self.createChat(sender)
          chat.addParticipant(self.profiles.get(sender)!)
          chat.addMessage(msg)
        })
      })
    }
  })
  .actions(self => {
    const {provider, logger} = getEnv(self)
    let handler: any
    return {
      afterCreate: () => {
        self.message = {}
        provider.onMessage = self.onMessage
        handler = autorun('MessageStore', async () => {
          try {
            if (self.connected && self.roster.length) {
              await self.loadChats()
            }
          } catch (e) {
            logger.log('error loadChats autorun:', e)
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
