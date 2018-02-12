import {expect} from 'chai'
import {clone, types, getType, getSnapshot, applySnapshot} from 'mobx-state-tree'
import {EventList, processHomestreamResponse} from '../src/store/EventStore'
import {Bot} from '../src/model/Bot'
import {File, FileSource} from '../src/model/File'
import {Base} from '../src/model/Base'
import {BotPost} from '../src/model/BotPost'
import {EventBotNote} from '../src/model/EventBotNote'
import {EventBotPost} from '../src/model/EventBotPost'
import {Profile} from '../src/model/Profile'
import {homestreamTestData} from './support/testuser'
const env = {
  wocky: {_loadSubscribedBots: () => {}, _loadBotSubscribers: () => {}, _loadBotPosts: () => {}, _loadRelations: () => {}, _loadOwnBots: () => {}}
}

const TestModel = types.compose(
  Base,
  types
    .model({
      bots: types.optional(types.map(Bot), {}),
      profiles: types.optional(types.map(Profile), {}),
      files: types.optional(types.map(File), {})
    })
    .actions(self => ({
      addBot: (bot: any) => {
        self.bots.put(bot)
      },
      addProfile: (profile: any) => {
        self.profiles.put(profile)
      },
      addFile: (file: any) => {
        self.files.put(file)
      }
    }))
)
let snapshot: any
describe('Home stream', () => {
  it('model test', async done => {
    try {
      const source = FileSource.create({uri: 'uri test'})
      const avatar = File.create({id: '123', source})
      const home = EventList.create({}, env)
      const target = Profile.create({id: '1', handle: 'test', avatar: '123'}, env)
      const bot = Bot.create({id: '123', title: 'testBot', owner: target}, env)
      const post = BotPost.create({id: '1', content: 'Really?', profile: target}, env)
      bot.posts.add(post)
      const eventNote = EventBotNote.create({id: '1', bot: bot.id, note: 'Wow!'}, env)
      const eventBotPost = EventBotPost.create({id: '2', bot: bot.id, post: clone(post)}, env)
      home.add(eventNote)
      home.add(eventBotPost)

      const testModel = TestModel.create({id: 'testmodel'}, env)
      testModel.addFile(avatar)
      testModel.addProfile(target)
      testModel.addBot(bot)
      //console.log(JSON.stringify(getSnapshot(testModel), null, 2))
      //console.log(JSON.stringify(testModel.snapshot, null, 2))
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
