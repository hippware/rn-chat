import HomeStore from '../src/store/HomeStore'
import {Bot} from 'wocky-client'
import {types} from 'mobx-state-tree'

describe('homeStore test', () => {
  it('add/select/remove bot', async done => {
    try {
      const model = types
        .model({
          homeStore: HomeStore,
          bot: Bot,
          bot2: Bot,
        })
        .create(
          {bot: {id: '123'}, homeStore: {}, bot2: {id: '1234'}},
          {
            wocky: {
              _loadBotSubscribers: () => {
                //
              },
              _loadBotGuests: () => {
                //
              },
              _loadBotVisitors: () => {
                //
              },
              _loadBotPosts: () => {
                //
              },
            },
          }
        )
      model.homeStore.selectBot(model.bot)
      model.homeStore.selectBot(model.bot2)
      expect(model.homeStore.index).toEqual(3)
      model.homeStore.removeBot(model.bot2)
      expect(model.homeStore.index).toEqual(2)
      done()
    } catch (e) {
      done(e)
    }
  })
})
