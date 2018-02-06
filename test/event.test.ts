import {expect} from 'chai'
import {clone, getType, applySnapshot} from 'mobx-state-tree'
import {EventList, processHomestreamResponse} from '../src/store/EventStore'
import {Bot} from '../src/model/Bot'
import {BotPost} from '../src/model/BotPost'
import {EventBotNote} from '../src/model/EventBotNote'
import {EventBotPost} from '../src/model/EventBotPost'
import {Profile} from '../src/model/Profile'
import {homestreamTestData} from './support/testuser'
const env = {wocky: {_loadBotSubscribers: () => {}, _loadBotPosts: () => {}}}
let snapshot: any
describe('Home stream', () => {
  it('model test', async done => {
    try {
      const home = EventList.create({}, env)
      const target = Profile.create({id: '1', handle: 'test'}, env)
      const bot = Bot.create({id: '123', title: 'testBot', owner: target}, env)
      const post = BotPost.create({id: '1', content: 'Really?', profile: target}, env)
      const eventNote = EventBotNote.create({id: '1', bot: bot.id, note: 'Wow!'}, env)
      const eventBotPost = EventBotPost.create({id: '2', bot: bot.id, post: clone(post)}, env)
      home.add(eventNote)
      home.add(eventBotPost)
      snapshot = JSON.stringify(home)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('model test2', async done => {
    try {
      const home2 = EventList.create({}, env)
      applySnapshot(home2, JSON.parse(snapshot))
      expect(getType(home2.list[0]).name).to.be.equal('EventBotNote')
      expect(getType(home2.list[1]).name).to.be.equal('EventBotPost')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('parse HS data', () => {
    const {list, count, version, bots} = processHomestreamResponse(homestreamTestData, homestreamTestData.to.split('@')[0])
    expect(list.length).to.be.equal(3)
    expect(bots.length).to.be.equal(2)
    expect(version).to.be.equal('2018-02-04T14:04:10.944022Z')
    expect(count).to.be.equal(2)
  })
})
