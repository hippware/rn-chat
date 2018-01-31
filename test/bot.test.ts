import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {IWocky} from '../src'
import {IBot} from '../src/model/Bot'
const fs = require('fs')
let expectBuf: any
let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot
describe('FileStore', () => {
  before(async done => {
    user1 = await createXmpp(26)
    user2 = await createXmpp(27)
    await waitFor(() => user1.profile !== null)
    await waitFor(() => user2.profile !== null)
    done()
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

  it('upload cover image', async done => {
    try {
      const fileName = `${__dirname}/img/test.jpg`
      const fileNameThumbnail = `${__dirname}/img/test-thumbnail.jpg`
      const file = {name: fileName.substring(fileName.lastIndexOf('/') + 1), body: fs.readFileSync(fileName), type: 'image/jpeg'}
      const data = {height: 300, width: 300, size: 3801, file}
      expect(bot.image).to.be.null
      await bot.upload(data)
      expect(bot.image).to.be.not.null
      expect(bot.uploaded).to.be.true
      expect(bot.uploading).to.be.false
      await waitFor(() => bot.updated)
      await waitFor(() => bot.image!.source !== null)
      expectBuf = fs.readFileSync(fileNameThumbnail)
      const testBuf = fs.readFileSync(bot.image!.source!.uri)
      expect(expectBuf.toString()).to.be.equal(testBuf.toString())
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

  it('delete bot', async () => {
    await user1.removeBot(bot)
  })

  after('remove', async () => {
    await user1.remove()
    await user2.remove()
  })
})
