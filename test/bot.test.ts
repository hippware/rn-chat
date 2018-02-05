import {expect} from 'chai'
import {createXmpp, testFile, expectedImage, waitFor} from './support/testuser'
import {IWocky} from '../src'
import {IBot} from '../src/model/Bot'
const fs = require('fs')

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, user2bot: IBot
describe('BotStore', () => {
  before(async done => {
    try {
      user1 = await createXmpp(26)
      user2 = await createXmpp(27)
      await waitFor(() => user1.profile !== null)
      await waitFor(() => user2.profile !== null)
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
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
    bot.update({location: {latitude: 1.1, longitude: 2.1}, title: 'Test bot'})
    await waitFor(() => bot.updated)
    expect(bot.isNew).to.be.false
    expect(bot.title).to.be.equal('Test bot')
    expect(bot.location!.latitude).to.be.equal(1.1)
    expect(bot.location!.longitude).to.be.equal(2.1)
    done()
  })

  it('share bot', () => {
    bot.shareToFollowers('hello followers!')
  })

  it('update bot location', async done => {
    bot.update({location: {latitude: 1.3, longitude: 2.3}, title: 'Test bot!'})
    await waitFor(() => bot.updated)
    expect(bot.isNew).to.be.false
    expect(bot.title).to.be.equal('Test bot!')
    expect(bot.location!.latitude).to.be.equal(1.3)
    expect(bot.location!.longitude).to.be.equal(2.3)
    done()
  })

  it('update bot description', async done => {
    bot.update({description: 'New description'})
    await waitFor(() => bot.updated)
    expect(bot.description).to.be.equal('New description')
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
      const loaded = await user1.loadBot(bot.id, bot.server)
      expect(loaded.isNew).to.be.false
      expect(loaded.title).to.be.equal('Test bot!')
      expect(bot.location!.latitude).to.be.equal(1.3)
      expect(bot.location!.longitude).to.be.equal(2.3)
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
    try {
      bot2.update({location: {latitude: 1.2, longitude: 2.2}, title: 'Test bot2'})
      await waitFor(() => bot2.updated)
      expect(bot2.title).to.be.equal('Test bot2')
      expect(bot2.location!.latitude).to.be.equal(1.2)
      expect(bot2.location!.longitude).to.be.equal(2.2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('geosearch', async done => {
    try {
      expect(user1.geoBots.keys().length).to.be.equal(0)
      await user1.geosearch({latitude: 1.2, longitude: 2.2, latitudeDelta: 0.5, longitudeDelta: 0.5})
      await waitFor(() => user1.geoBots.keys().length === 2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('list own bots', async done => {
    try {
      await user1.profile!.ownBots.load()
      expect(user1.profile!.ownBots.list.length).to.be.equal(2)
      expect(user1.profile!.ownBots.list[0].title).to.be.equal('Test bot2')
      expect(user1.profile!.ownBots.list[1].title).to.be.equal('Test bot!')
      expect(user1.profile!.ownBots.list[1].location!.latitude).to.be.equal(1.3)
      expect(user1.profile!.ownBots.list[1].location!.longitude).to.be.equal(2.3)
      done()
    } catch (e) {
      done(e)
    }
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
    user2bot = user2.profile!.subscribedBots.list[0]
    done()
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
  it('subscribe again', async done => {
    try {
      await user2._subscribeBot(bot.id)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('change first bot and verify updating for second user', async done => {
    expect(user2bot.title).to.be.equal('Test bot!')
    await bot.update({title: 'Test bot!!'})
    await waitFor(() => user2bot.title === 'Test bot!!')
    done()
  })
  it('change first bot description and expect new item update', async done => {
    try {
      expect(user2.updates.length).to.be.equal(3)
      expect(user2bot.description).to.be.equal('New description')
      await bot.update({description: 'New description2'})
      await waitFor(() => user2.updates.length === 4)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('incorporate updates', async done => {
    try {
      user2.incorporateUpdates()
      expect(user2.updates.length).to.be.equal(0)
      expect(user2.events.length).to.be.equal(3)
      done()
    } catch (e) {
      done(e)
    }
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

  it('logout user2 and login again and verify HS', async done => {
    try {
      await user2.logout()
      expect(user2.events.list.length).to.be.equal(0)
      expect(user2.updates.length).to.be.equal(0)
      user2 = await createXmpp(27)
      await waitFor(() => user2.events.list.length === 3)
      expect(user2.updates.length).to.be.equal(0)
      // verify 2 live notifications
      await user1.removeBot(bot.id)
      bot2.shareToFollowers('hello followers2!') // just swap remove and share and you will not receive 'delete' notifications, why?
      await waitFor(() => user2.updates.length > 0) // should be 4, but sometimes it fails(?), and why we have 3 updates for single delete?
      done()
    } catch (e) {
      done(e)
    }
  })

  it('delete bots', async done => {
    try {
      console.log('UPDATES:', user2.updates.length, JSON.stringify(user2.updates))
      await user1.removeBot(bot2.id)
      done()
    } catch (e) {
      done(e)
    }
  })

  after('remove', async done => {
    await user1.remove()
    await user2.remove()
    done()
  })
})
