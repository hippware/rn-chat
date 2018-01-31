// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, IExtendedObservableMap, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, when, autorun, IReactionDisposer} from 'mobx'
import MessageStore from './MessageStore'
import {Bot, IBot} from '../model/Bot'

export default types
  .compose(
    MessageStore,
    types.model('XmppBot', {
      bots: types.optional(types.map(Bot), {})
    })
  )
  .named('BotStore')
  .actions(self => ({
    createBot: (id: string, bot = {}): IBot => self.bots.get(id) || (self.bots.put({...bot, id}) && self.bots.get(id)!)!
  }))
  .actions(self => {
    const {logger} = getEnv(self)
    let handler: any
    return {
      afterCreate: () => {
        handler = autorun('BotStore', async () => {
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
