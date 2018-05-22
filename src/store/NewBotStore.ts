import {types, flow, getParent, ISimpleType} from 'mobx-state-tree'

const NewBotStore = types
  .model('NewBotStore', {})
  .volatile(() => ({
    botId: types.maybe(types.string),
  }))
  .actions(self => ({
    setId: (id: ISimpleType<string>) => {
      self.botId = id
    },
    save: flow(function* save() {
      if (!self.botId) throw new Error('cant save, no botId')
      const {wocky} = getParent(self)
      const bot = wocky.getBot({id: self.botId})
      yield bot.save()
      return bot
    }),
  }))

export default NewBotStore
