// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, when, autorun, IReactionDisposer} from 'mobx'
import MessageStore from './MessageStore'
import {Bot, IBot} from '../model/Bot'
import utils from './utils'

const NS = 'hippware.com/hxep/bot'
function addField(iq: any, name: string, type: string) {
  iq.c('field', {var: name, type})
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function addValue(iq: any, name: string, value: any) {
  if (value !== undefined && value !== null) {
    const type = typeof value === 'number' ? 'int' : 'string'
    addField(iq, name, type)
    iq
      .c('value')
      .t(name === 'image' ? value.id : value)
      .up()
      .up()
  }
}

function addValues(iq: any, values: any) {
  for (const key of Object.keys(values)) {
    addValue(iq, key, values[key])
  }
}

function convert(data: any) {
  return data.field.reduce((total: any, current: any) => {
    if (current.var === 'subscribers+size') {
      total.followersSize = parseInt(current.value)
    } else if (current.var === 'total_items') {
      total.totalItems = parseInt(current.value)
    } else if (current.type === 'geoloc') {
      total[current.var] = {
        latitude: parseFloat(current.geoloc.lat),
        longitude: parseFloat(current.geoloc.lon)
      }
    } else if (current.type === 'int') {
      total[current.var] = parseInt(current.value)
    } else if (current.type === 'float') {
      total[current.var] = parseFloat(current.value)
    } else if (current.type === 'bool') {
      total[current.var] = current.value === 'true'
      total[`is${capitalizeFirstLetter(current.var)}`] = current.value === 'true'
    } else if (current.var === 'owner') {
      total.owner = utils.getNodeJid(current.value)
    } else if (current.var === 'updated') {
      total.time = utils.iso8601toDate(current.value).getTime()
    } else {
      total[current.var] = current.value
    }
    return total
  }, {})
}

export default types
  .compose(
    MessageStore,
    types.model('XmppBot', {
      bots: types.optional(types.map(Bot), {})
    })
  )
  .named('BotStore')
  // .actions(self => ({
  //   createBot: (id: string, bot = {}): IBot => self.bots.get(id) || (self.bots.put({...bot, id}) && self.bots.get(id)!)!
  // }))
  .actions(self => {
    return {
      getBot: ({id, ...data}: any): IBot => {
        if (self.bots.get(id)) {
          Object.assign(self.bots.get(id), data)
        } else {
          self.bots.put(Bot.create({id, ...data}))
        }
        return self.bots.get(id)!
      },
      generateId: flow<string>(function*() {
        const iq = $iq({type: 'set'}).c('new-id', {xmlns: NS})
        const data = yield self.sendIQ(iq)
        if (data['new-id']) {
          if (data['new-id']['#text']) {
            return data['new-id']['#text']
          } else {
            return data['new-id']
          }
        } else {
          throw 'Cannot generate ID'
        }
      })
    }
  })
  .actions(self => ({
    createBot: flow<IBot>(function*() {
      const id = yield self.generateId()
      const bot = Bot.create({id, owner: self.username})
      self.bots.put(bot)
      return bot
    }),
    removeBot: flow(function*(bot: IBot) {
      const iq = $iq({type: 'set', to: self.host}).c('delete', {xmlns: NS, node: `bot/${bot.id}`})
      yield self.sendIQ(iq)
      self.bots.delete(bot.id)
    }),
    _loadOwnBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      const iq = $iq({type: 'get', to: self.host})
        .c('bot', {xmlns: NS, user: `${userId}@${self.host}`})
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
      const data = yield self.sendIQ(iq)
      if (data.error) {
        throw data.error
      }
      const res = []
      let bots = data.bots.bot
      if (!bots) {
        bots = []
      }
      if (!Array.isArray(bots)) {
        bots = [bots]
      }
      for (const item of bots) {
        res.push(self.getBot(convert(item)))
      }
      return {list: res, count: parseInt(data.bots.set.count)}
    }),
    _loadSubscribedBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      const iq = $iq({type: 'get', to: self.host})
        .c('subscribed', {xmlns: NS, user: `${userId}@${self.host}`})
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
      const data = yield self.sendIQ(iq)
      if (data.error) {
        throw data.error
      }
      const res = []
      let bots = data.bots.bot
      if (!bots) {
        bots = []
      }
      if (!Array.isArray(bots)) {
        bots = [bots]
      }
      for (const item of bots) {
        res.push(self.getBot(convert(item)))
      }
      return {list: res, count: parseInt(data.bots.set.count)}
    }),
    _updateBot: flow(function*(bot: IBot) {
      const {title, image, description, address, location, visibility, radius, id, addressData} = bot
      const iq = bot.isNew
        ? $iq({type: 'set'}).c('create', {xmlns: NS})
        : $iq({type: 'set'}).c('fields', {
            xmlns: NS,
            node: `bot/${bot.id}`
          })

      addValues(iq, {
        id,
        title,
        address_data: JSON.stringify(addressData),
        description,
        radius: Math.round(radius),
        address,
        image,
        visibility
      })
      addField(iq, 'location', 'geoloc')
      location!.addToIQ(iq)
      yield self.sendIQ(iq)
      return {server: self.host}
    }),
    loadBot: flow(function*(id: string) {
      const iq = $iq({type: 'get', to: self.host}).c('bot', {xmlns: NS, node: `bot/${id}`})
      const data = yield self.sendIQ(iq)
      const res = self.getBot(convert(data.bot))
      return res
    }),
    _subscribeBot: flow(function*(id: string) {
      const iq = $iq({type: 'set', to: self.host}).c('subscribe', {
        xmlns: NS,
        node: `bot/${id}`
      })
      const data = yield self.sendIQ(iq)
      return data['subscriber_count']
    }),
    _unsubscribeBot: flow(function*(id: string) {
      const iq = $iq({type: 'set', to: self.host}).c('unsubscribe', {
        xmlns: NS,
        node: `bot/${id}`
      })
      const data = yield self.sendIQ(iq)
      return data['subscriber_count']
    })
  }))
  .actions(self => {
    const {logger} = getEnv(self)
    let handler: any
    return {
      afterCreate: () => {
        handler = autorun('BotStore', async () => {
          try {
            // TODO load own bots here?
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
