import {expect} from 'chai'
import {createXmpp, testFile, expectedImage, waitFor} from './support/testuser'
import {IWocky} from '../src/store/Wocky'
import {IBot} from '../src/model/Bot'
const fs = require('fs')

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, user2bot: IBot, bot3: IBot
describe('Geofence', () => {
  before(async done => {
    try {
      user1 = await createXmpp(26)
      user2 = await createXmpp(27)
      await waitFor(() => user1.profile !== null)
      await waitFor(() => user2.profile !== null)
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      await user1.profile!.update({handle: 'abcc3', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
      await user2.profile!.update({handle: 'abcc4', firstName: 'name2', lastName: 'lname2', email: 'a2@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })

  it('creates a geofence bot', async done => {
    bot = await user1.createBot()
    bot.update({location: {latitude: 1.1, longitude: 2.1}, title: 'Test bot', geofence: true, addressData: {city: 'Koper', country: 'Slovenia'}})
    await waitFor(() => bot.updated)
    // console.log('bot updated', bot.toJSON())
    expect(bot.geofence).to.be.true
    expect(bot.visitorsSize).to.equal(0)
    expect(bot.guestsSize).to.equal(0)
    done()
  })

  it('loads guests', async done => {
    await bot.guests.load()
    // console.log('guests loaded', bot.toJSON())
    done()
  })

  // it('geofence subscribes', async done => {
  //   await user2._subscribeBot(bot.id, true)
  //   user2.profile!.subscribedBots.refresh()
  //   await user2.profile!.subscribedBots.load()
  //   expect(user2.profile!.subscribedBots.list.length).to.be.equal(1)
  //   expect(user2.profile!.subscribedBots.list[0].isSubscribed).to.be.true
  //   expect(user2.profile!.subscribedBots.list[0].followersSize).to.be.equal(1)
  //   user2bot = user2.profile!.subscribedBots.list[0]
  //   bot.guests.load()
  //   await waitFor(() => !bot.guests.loading)
  //   // console.log('bot after guests loaded', bot.guests.toJSON(), bot.toJSON())
  //   expect(bot.guests.length).to.equal(1)
  //   done()
  // })

  after('remove', async done => {
    try {
      await user1.removeBot(bot2.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot3.id)
    } catch (e) {}
    try {
      await user1.remove()
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    console.log('after done')
    done()
  })
})
