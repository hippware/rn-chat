import {expect} from 'chai'
import {types, getType, applySnapshot, getSnapshot} from 'mobx-state-tree'
import {processItem, processHomestreamResponse} from '../src/transport/XmppTransport'
import {FileSource} from '../src/model/File'
import {EventList, EventEntity} from '../src/store/Wocky'
import {Base} from '../src/model/Base'
import {EventBotNote} from '../src/model/EventBotNote'
import {EventBotPost} from '../src/model/EventBotPost'
import {Storages} from '../src/store/Factory'
import {homestreamTestData} from './support/testuser'
const env = {
  wocky: {
    _loadBotVisitors: () => {},
    _loadBotGuests: () => {},
    _loadSubscribedBots: () => {},
    _loadGeofenceBots: () => {},
    _loadBotSubscribers: () => {},
    _loadBotPosts: () => {},
    _loadRelations: () => {},
    _loadOwnBots: () => {}
  }
}

const TestModel = types.compose(
  Base,
  Storages,
  types.model({
    home: types.optional(EventList, {})
  })
)
let snapshot: any
describe('Home stream', () => {
  it('model test', async done => {
    try {
      const testModel = TestModel.create({id: 'testmodel'}, env)
      const source = FileSource.create({uri: 'uri test'})
      const avatar = testModel.files.get('123', {source})
      const target = testModel.profiles.get('1', {handle: 'test', avatar})
      const bot = testModel.bots.get('123', {title: 'testBot', owner: target})
      const eventNote = testModel.create(EventBotNote, {id: '1', bot: bot.id, note: 'Wow!'})
      const eventBotPost = testModel.create(EventBotPost, {id: '2', bot: bot.id, post: {id: '1', content: 'Really?', profile: target}})
      testModel.home.add(eventNote)
      testModel.home.add(eventBotPost)

      console.log(JSON.stringify(getSnapshot(testModel), null, 2))
      snapshot = JSON.stringify(getSnapshot(testModel))
      done()
    } catch (e) {
      done(e)
    }
  })
  it('model test2', async done => {
    try {
      const testModel2 = TestModel.create({id: 'testmodel'}, env)
      applySnapshot(testModel2, JSON.parse(snapshot))
      expect(getType(testModel2.home.list[0]).name).to.be.equal('EventBotNote')
      expect(getType(testModel2.home.list[1]).name).to.be.equal('EventBotPost')
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

  it('parse live data', () => {
    const data = {
      id: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d',
      version: '2018-02-04T14:03:56.742476Z',
      from: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com/testing',
      message: {
        from: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com',
        type: 'headline',
        to: 'testing.dev.tinyrobot.com',
        body: 'hello followers!',
        bot: {
          xmlns: 'hippware.com/hxep/bot',
          jid: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d',
          id: '3d577dbe-09b4-11e8-b7e5-0a580a02057d',
          server: 'testing.dev.tinyrobot.com',
          action: 'share'
        }
      }
    }
    const testModel = TestModel.create({id: 'testmodel'}, env)
    const itemData = processItem(data, null, '39e09af8-09b4-11e8-80d4-0a580a02057d')
    const item = testModel.create(EventEntity, itemData)
    testModel.home.addToTop(item)
    expect(testModel.home.list[0].bot.id).to.be.equal('3d577dbe-09b4-11e8-b7e5-0a580a02057d')
  })
})
