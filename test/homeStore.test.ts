import {expect} from 'chai'
import HomeStore from '../src/store/HomeStore'
import {Bot} from 'wocky-client'
import {destroy} from 'mobx-state-tree'

const homeStore = HomeStore.create()
describe('homeStore test', () => {
  it('add/select/remove bot', async done => {
    try {
      const bot = Bot.create({id: '123'})
      const bot2 = Bot.create({id: '1234'})
      homeStore.selectBot(bot)
      homeStore.selectBot(bot2)
      expect(homeStore.index).to.be.equal(3)
      homeStore.removeBot(bot2)
      expect(homeStore.index).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })
})
