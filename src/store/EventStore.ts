// tslint:disable-next-line:no_unused-variable
import {types, getParent, clone, getType, getSnapshot, getEnv, IType, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
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

export function processHomestreamResponse(data: any, username: string, self: any) {
  let items = data.items && data.items.item ? data.items.item : []
  let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : []
  if (!Array.isArray(bots)) {
    bots = [bots]
  }
  if (!Array.isArray(items)) {
    items = [items]
  }
  return {
    list: items.map((rec: any) => processItem(rec, null, username, self)).filter((x: any) => x),
    bots,
    version: data.items.version,
    count: parseInt((data.items && data.items.set && data.items.set.count) || 0)
  }
}

function processItem(item: any, delay: any, username: string, self: any): any {
  try {
    const time = utils.iso8601toDate(item.version).getTime()
    if (item.message) {
      const {message, id, from} = item
      const {bot, event, body, media, image} = message
      if (bot && bot.action === 'show') {
        return self.create(EventBotCreate, {id, bot: bot.id, time, created: true})
      }

      if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
        const userId = utils.getNodeJid(bot['user-jid'])
        return self.create(EventBotGeofence, {id, bot: bot.id, time, profile: userId, isEnter: bot.action === 'enter'})
      }

      if (event && event.item && event.item.entry) {
        const {entry, author} = event.item
        const eventId = event.node.split('/')[1]
        const post = self.create(BotPost, {id: eventId + id, image: entry.image, content: entry.content, profile: utils.getNodeJid(author)})
        return self.create(EventBotPost, {id, bot: eventId, time, post})
      }

      if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
        const noteBot = item.message['bot-description-changed'].bot
        return self.create(EventBotNote, {id: item.id, bot: noteBot.id, time: utils.iso8601toDate(item.version).getTime(), note: noteBot.description})
      }

      if (event && event.retract) {
        return self.create(EventDelete, {id: event.retract.id, delete: true})
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
        return bot ? self.create(EventBotShare, {id, bot: bot.id, time, message: self.create(Message, msg)}) : null
      }
    } else {
      console.log('& UNSUPPORTED ITEM!', item)
    }
  } catch (err) {
    console.log('EventStore.processItem ERROR:', err)
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
      const {list, version, count, bots} = processHomestreamResponse(data, self.username!, self)
      bots.forEach((bot: any) => self.getBot({id: bot.id, ...self._processMap(bot)}))
      list.forEach((event: IEventEntity) => self.updates.push(event))
      self.version = version
    }),
    _loadHomestream: flow(function*(lastId: any, max: number = 3) {
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
      const {list, count, version, bots} = processHomestreamResponse(data, self.username!, self)
      bots.forEach((bot: any) => self.getBot({id: bot.id, ...self._processMap(bot)}))
      self.version = version
      return {list, count}
    }),
    _subscribeToHomestream: (version: string) => {
      const iq = $pres({to: `${self.username}@${self.host}/home_stream`}).c('query', {
        xmlns: NS,
        version
      })
      self.sendStanza(iq)
    },
    _onNotification: flow(function*({notification, delay}: any) {
      if (notification['reference-changed']) {
        const {id, server} = notification['reference-changed'].bot
        yield self.loadBot(id, server)
        self.version = notification['reference-changed'].version
      } else if (notification.item) {
        const item = processItem(notification.item, delay, self.username!, self)
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
            self._subscribeToHomestream(self.version)
          }
        )
        handler2 = autorun('EventStore notification', () => {
          if (self.message && self.message.notification) {
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
