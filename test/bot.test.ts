import {expect} from 'chai'
import {createXmpp, testFile, expectedImage, waitFor} from './support/testuser'
import {IWocky} from '../src'
import {IBot} from '../src/model/Bot'
const fs = require('fs')

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot
describe('FileStore', () => {
  before(async done => {
    try {
      user1 = await createXmpp(26)
      user2 = await createXmpp(27)
      await waitFor(() => user1.profile !== null)
      await waitFor(() => user2.profile !== null)
      await user1.profile!.update({handle: 'abcc1', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
      await user2.profile!.update({handle: 'abcc2', firstName: 'name2', lastName: 'lname2', email: 'a2@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create bot', async () => {
    bot = await user1.createBot()
    expect(bot.isNew).to.be.true
  })

  it('update bot', async done => {
    bot.update({location: {latitude: 1, longitude: 2}, title: 'Test bot'})
    await waitFor(() => bot.updated)
    expect(bot.isNew).to.be.false
    expect(bot.title).to.be.equal('Test bot')
    done()
  })

  it('create bot posts', async done => {
    try {
      await bot.posts.load()
      expect(bot.posts.list.length).to.be.equal(0)
      const botPost = bot.createPost('hello')
      await botPost.publish()
      const botPost2 = bot.createPost('hello2')
      await botPost2.upload(testFile())
      await botPost2.publish()
      expect(bot.posts.list.length).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('list bots', async done => {
    bot.posts.refresh()
    expect(bot.posts.list.length).to.be.equal(0)
    await bot.posts.load()
    console.log(JSON.stringify(bot.posts.list))
    expect(bot.posts.list.length).to.be.equal(2)
    done()
  })

  it('upload cover image', async done => {
    try {
      expect(bot.image).to.be.null
      await bot.upload(testFile())
      expect(bot.image).to.be.not.null
      expect(bot.uploaded).to.be.true
      expect(bot.uploading).to.be.false
      await waitFor(() => bot.updated)
      await waitFor(() => bot.image!.source !== null)
      expect(expectedImage()).to.be.equal(fs.readFileSync(bot.image!.source!.uri).toString())
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load bot', async done => {
    try {
      const loaded = await user1.loadBot(bot.id)
      expect(loaded.isNew).to.be.false
      expect(loaded.title).to.be.equal('Test bot')
      expect(loaded.location.latitude).to.be.equal(1)
      expect(loaded.location.longitude).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create bot2', async () => {
    bot2 = await user1.createBot()
    expect(bot2.isNew).to.be.true
  })

  it('update bot2', async done => {
    bot2.update({location: {latitude: 3, longitude: 4}, title: 'Test bot2'})
    await waitFor(() => bot2.updated)
    expect(bot2.title).to.be.equal('Test bot2')
    done()
  })

  it('list own bots', async done => {
    await user1.profile!.ownBots.load()
    expect(user1.profile!.ownBots.list.length).to.be.equal(2)
    expect(user1.profile!.ownBots.list[0].title).to.be.equal('Test bot2')
    expect(user1.profile!.ownBots.list[1].title).to.be.equal('Test bot')
    done()
  })

  it('list subscribed bots for user2', async done => {
    await user2.profile!.subscribedBots.load()
    expect(user2.profile!.subscribedBots.list.length).to.be.equal(0)
    done()
  })

  it('subscribe user2 for first bot', async done => {
    await user2._subscribeBot(bot.id)
    user2.profile!.subscribedBots.refresh()
    await user2.profile!.subscribedBots.load()
    expect(user2.profile!.subscribedBots.list.length).to.be.equal(1)
    expect(user2.profile!.subscribedBots.list[0].isSubscribed).to.be.true
    expect(user2.profile!.subscribedBots.list[0].followersSize).to.be.equal(1)
    done()
  })

  it('get subscribers for bot', async done => {
    try {
      await bot.subscribers.load()
      expect(bot.subscribers.list.length).to.be.equal(1)
      expect(bot.subscribers.list[0].id).to.be.equal(user2.username)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('unsubscribe user2 for first bot', async done => {
    try {
      user2.profile!.subscribedBots.list[0].unsubscribe()
      user2.profile!.subscribedBots.refresh()
      await user2.profile!.subscribedBots.load()
      expect(user2.profile!.subscribedBots.list.length).to.be.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('delete bot', async done => {
    await user1.removeBot(bot.id)
    done()
  })

  after('remove', async done => {
    await user1.remove()
    await user2.remove()
    done()
  })
})
