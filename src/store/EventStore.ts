// tslint:disable-next-line:no_unused-variable
import {types, getParent, clone, getType, getEnv, IType, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, reaction, when, autorun, IReactionDisposer} from 'mobx'
import BotStore from './BotStore'
import {BotPost} from '../model/BotPost'
import {EventBotCreate} from '../model/EventBotCreate'
import {EventBotPost} from '../model/EventBotPost'
import {EventBotNote} from '../model/EventBotNote'
import {EventBotShare} from '../model/EventBotShare'
import {EventBotGeofence} from '../model/EventBotGeofence'
import {EventDelete} from '../model/EventDelete'
import {createPaginable} from '../model/PaginableList'
import utils from './utils'
import {processMessage} from './MessageStore'
import {Message} from '../model/Message'

const NS = 'hippware.com/hxep/publishing'
const RSM = 'http://jabber.org/protocol/rsm'

export const EventEntity = types.union(EventBotPost, EventBotNote, EventBotShare, EventBotCreate, EventBotGeofence, EventDelete)
export type IEventEntity = typeof EventEntity.Type
export const EventList = createPaginable(EventEntity)
export type IEventList = typeof EventList.Type

export function processHomestreamResponse(data: any, username: string) {
  let items = data.items && data.items.item ? data.items.item : []
  let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : []
  if (!Array.isArray(bots)) {
    bots = [bots]
  }
  if (!Array.isArray(items)) {
    items = [items]
  }
  return {
    list: items.map((rec: any) => processItem(rec, null, username)).filter((x: any) => x),
    bots,
    version: data.items.version,
    count: parseInt(data.items.set.count)
  }
}

function processItem(item: any, delay: any, username: string): any {
  try {
    const time = utils.iso8601toDate(item.version).getTime()
    if (item.message) {
      const {message, id, from} = item
      const {bot, event, body, media, image} = message
      if (bot && bot.action === 'show') {
        return EventBotCreate.create({id, bot: bot.id, time, created: true})
      }

      if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
        const userId = utils.getNodeJid(bot['user-jid'])
        return EventBotGeofence.create({id, bot: bot.id, time, profile: userId, isEnter: bot.action === 'enter'})
      }

      if (event && event.item && event.item.entry) {
        const {entry, author} = event.item
        const eventId = event.node.split('/')[1]
        const post = BotPost.create({id: eventId + id, image: entry.image, content: entry.content, profile: utils.getNodeJid(author)})
        return EventBotPost.create({id, bot: eventId, time, post})
      }

      if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
        const noteBot = item.message['bot-description-changed'].bot
        return EventBotNote.create({id: item.id, bot: noteBot.id, time: utils.iso8601toDate(item.version).getTime(), note: noteBot.description})
      }

      if (event && event.retract) {
        return EventDelete.create({id: event.retract.id, delete: true})
      }
      if (body || media || image || bot) {
        const msg = processMessage(
          {
            ...message,
            from,
            to: username
          },
          username
        )
        if (!message.delay) {
          if (delay && delay.stamp) {
            msg.time = utils.iso8601toDate(delay.stamp).getTime()
          } else {
            msg.time = utils.iso8601toDate(item.version).getTime()
          }
        }
        return bot ? EventBotShare.create({id, bot: bot.id, time, message: Message.create(msg)}) : null
      }
    } else {
      console.log('& UNSUPPORTED ITEM!', item)
    }
  } catch (err) {
    console.log('ERROR:', err)
  }
  return null
}

export const EventStore = types
  .compose(
    BotStore,
    types.model('EventStore', {
      updates: types.optional(types.array(EventEntity), []),
      events: types.optional(EventList, {}),
      version: ''
    })
  )
  .named('EventStore')
  .actions(self => ({
    _loadUpdates: flow(function*() {
      const iq = $iq({type: 'get', to: self.username + '@' + self.host})
      iq.c('catchup', {xmlns: NS, node: 'home_stream', version: self.version})
      const data = yield self.sendIQ(iq)
      const {list, version, count, bots} = processHomestreamResponse(data, self.username!)
      bots.forEach((bot: any) => self.getBot(self._processMap(bot)))
      list.forEach((event: IEventEntity) => self.updates.push(event))
      self.version = version
    }),
    _loadHomestream: flow(function*(lastId: any, max: number = 10) {
      const iq = $iq({type: 'get', to: self.username + '@' + self.host})
      iq.c('items', {xmlns: NS, node: 'home_stream'})
      iq.c('exclude-deleted').up()
      iq
        .c('set', {xmlns: RSM})
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
      const data = yield self.sendIQ(iq)
      const {list, count, version, bots} = processHomestreamResponse(data, self.username!)
      bots.forEach((bot: any) => self.getBot(self._processMap(bot)))
      self.version = version
      return {list, count}
    }),
    _subscribeToHomestream: () => {
      const iq = $pres({to: `${self.username}@${self.host}/home_stream`}).c('query', {
        xmlns: NS,
        version: self.version
      })
      console.log('===========SUBSCRIBE to HOMESTREAM', iq.toString())
      self.sendStanza(iq)
    },
    _onNotification: flow(function*({notification, delay}: any) {
      if (notification['reference-changed']) {
        const {id, server} = notification['reference-changed'].bot
        yield self.loadBot(id, server)
        self.version = notification['reference-changed'].version
      } else if (notification.item) {
        const item = processItem(notification.item, delay, self.username!)
        console.log('=========ITEM', JSON.stringify(item))
        self.version = notification.item.version
        if (item) {
          self.updates.push(item)
        }
      } else if (notification.delete) {
        self.updates.push(EventDelete.create({id: notification.delete.id, delete: true}))
      } else {
        console.warn('& notification: unhandled homestream notification', notification)
      }
    }),
    incorporateUpdates: () => {
      for (let i = self.updates.length - 1; i >= 0; i--) {
        const id = self.updates[i].id
        // delete item
        self.events.remove(id)
        if (getType(self.updates[i]).name !== EventDelete.name) {
          self.events.addToTop(clone(self.updates[i]))
        }
      }
      self.updates.clear()
    }
  }))
  .actions(self => {
    let handler: any, handler2: any
    return {
      afterCreate: () => {
        self.events.setRequest(self._loadHomestream)

        handler = reaction(
          () => self.connected,
          async () => {
            if (!self.version) {
              await self.events.load()
            } else {
              await self._loadUpdates()
            }
            self._subscribeToHomestream()
          }
        )
        handler2 = autorun('EventStore notification', () => {
          if (self.message && self.message.notification) {
            console.log('=============NOTIFICATION', JSON.stringify(self.message))
            self._onNotification(self.message)
          }
        })
      },
      beforeDestroy: () => {
        handler()
        handler2()
      }
    }
  })
