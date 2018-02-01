// tslint:disable-next-line:no_unused-variable
import {types, getParent, getEnv, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, when, autorun, IReactionDisposer} from 'mobx'
import MessageStore from './MessageStore'
import {Bot, IBot} from '../model/Bot'
import {IBotPost, BotPost} from '../model/BotPost'
import utils from './utils'

const NS = 'hippware.com/hxep/bot'
function addField(iq: any, name: string, type: string) {
  iq.c('field', {var: name, type})
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

export default types
  .compose(
    MessageStore,
    types.model('XmppBot', {
      bots: types.optional(types.map(Bot), {})
    })
  )
  .named('BotStore')
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
    removeBot: flow(function*(id: string) {
      const iq = $iq({type: 'set', to: self.host}).c('delete', {xmlns: NS, node: `bot/${id}`})
      yield self.sendIQ(iq)
      self.bots.delete(id)
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
        res.push(self.getBot(self._processMap(item)))
      }
      return {list: res, count: parseInt(data.bots.set.count)}
    }),
    _loadBotSubscribers: flow(function*(id: string, lastId?: string, max: number = 10) {
      const iq = $iq({type: 'get', to: self.host})
        .c('subscribers', {
          xmlns: NS,
          node: `bot/${id}`
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
      const data = yield self.sendIQ(iq)
      let arr = data.subscribers.subscriber || []
      if (!Array.isArray(arr)) {
        arr = [arr]
      }
      const res = yield self._requestProfiles(arr.map((rec: any) => rec.jid.split('@')[0]))
      return {list: res, count: data.subscribers.set.count}
    }),
    _loadBotPosts: flow(function*(id: string, before?: string) {
      const iq = $iq({type: 'get', to: self.host})
        .c('query', {xmlns: NS, node: `bot/${id}`})
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

      const data = yield self.sendIQ(iq)
      let res = data.query.item
      if (!res) {
        res = []
      }
      if (!Array.isArray(res)) {
        res = [res]
      }
      return {
        count: data.query.set.count,
        list: res.map((x: any) => {
          const post = {...x, ...x.entry}
          if (post.author_avatar) {
            self.createFile(post.author_avatar)
          }
          const profile = self.createProfile(utils.getNodeJid(x.author)!, {
            handle: post.author_handle,
            firstName: post.author_first_name,
            lastName: post.author_last_name,
            avatar: post.author_avatar
          })
          if (post.image) {
            self.createFile(post.image)
          }
          return BotPost.create({
            id: post.id,
            content: post.content,
            image: post.image,
            time: utils.iso8601toDate(post.updated).getTime(),
            profile: profile.id
          })
        })
      }
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
        res.push(self.getBot(self._processMap(item)))
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
      const res = self.getBot(self._processMap(data.bot))
      return res
    }),
    _removeBotPost: flow(function*(id: string, postId: string) {
      const iq = $iq({type: 'set', to: self.host})
        .c('retract', {xmlns: NS, node: `bot/${id}`})
        .c('item', {id: postId})
      yield self.sendIQ(iq)
    }),
    _publishBotPost: flow(function*(post: IBotPost) {
      let parent = getParent(post)
      while (!parent.id) parent = getParent(parent)
      const botId = parent.id
      console.log('BOT ID', botId)
      const iq = $iq({type: 'set', to: self.host})
        .c('publish', {xmlns: NS, node: `bot/${botId}`})
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
      yield self.sendIQ(iq)
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
