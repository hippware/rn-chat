import {expect} from 'chai'
import {createXmpp, waitFor, timestamp} from './support/testuser'
import {IWocky, IProfile, IOwnProfile} from '../src'
import {IBot} from '../src/model/Bot'

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, loadedBot: IBot

async function enterBot(user: IWocky) {
  await user.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'})
  user.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'})
}

async function exitBot(user: IWocky) {
  await user.setLocation({accuracy: 1, longitude: 22.1, latitude: 1.1, resource: 'testing'})
  user.setLocation({accuracy: 1, longitude: 22.1, latitude: 1.1, resource: 'testing'})
}

describe('Geofence', () => {
  it('create user1', async done => {
    try {
      timestamp()
      user1 = await createXmpp()
      console.log('user1 credentials', user1.username, user1.password)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create user2', async done => {
    try {
      timestamp()
      user2 = await createXmpp()
      console.log('user2 credentials', user2.username, user2.password)
      timestamp()
      await waitFor(() => user1.profile !== null)
      await waitFor(() => user2.profile !== null)
      await user1.profile!.update({
        handle: 'abccc3',
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      await user2.profile!.update({
        handle: 'abccc4',
        firstName: 'name2',
        lastName: 'lname2',
        email: 'a2@aa.com',
      })
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update user1 profile', async done => {
    try {
      timestamp()
      await waitFor(() => user1.profile !== null)
      await user1.profile!.update({
        handle: 'abccc3',
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update user2 profile', async done => {
    try {
      timestamp()
      await user2.profile!.update({
        handle: 'abccc4',
        firstName: 'name2',
        lastName: 'lname2',
        email: 'a2@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })

  it('user2 follows user1', async done => {
    try {
      timestamp()
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load own profile, check hasUsedGeofence', async done => {
    try {
      timestamp()
      const profile1: IOwnProfile = await user1.loadProfile(user1.username!)
      expect(profile1.hasUsedGeofence).to.be.false
      done()
    } catch (e) {
      done(e)
    }
  })

  it('creates a geofence bot', async done => {
    try {
      timestamp()
      expect(user1.profile.hasUsedGeofence).to.be.false
      bot = await user1.createBot()
      await bot.update({
        public: true,
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot',
        geofence: true,
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      expect(user1.profile.hasUsedGeofence).to.be.true
      // console.log('bot updated', bot.toJSON())
      expect(bot.geofence).to.be.true
      expect(bot.visitorsSize).to.equal(0)
      expect(bot.guestsSize).to.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('load own profile, check hasUsedGeofence', async done => {
    try {
      timestamp()
      const profile1: IOwnProfile = await user1.loadProfile(user1.username!)
      expect(profile1.hasUsedGeofence).to.be.true
      done()
    } catch (e) {
      done(e)
    }
  })
  it('creates a geofence bot2', async done => {
    try {
      timestamp()
      bot2 = await user1.createBot()
      await bot2.update({
        public: true,
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot2',
        geofence: true,
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      // console.log('bot updated', bot.toJSON())
      expect(bot2.geofence).to.be.true
      expect(bot2.visitorsSize).to.equal(0)
      expect(bot2.guestsSize).to.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load visitors and live updates', async done => {
    try {
      timestamp()
      await bot.visitors.load!()
      expect(bot.visitors.list.length).to.equal(0)
      expect(bot.visitorsSize).to.equal(0)
      await enterBot(user1)
      await waitFor(() => bot.visitors.list.length === 1)
      expect(bot.visitorsSize).to.equal(1)
      await waitFor(() => user1.activeBots.length === 2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load visitors2', async done => {
    try {
      timestamp()
      bot.visitors.refresh!()
      expect(bot.visitors.list.length).to.equal(0)
      await bot.visitors.load!()
      expect(bot.visitors.list.length).to.equal(1)
      await exitBot(user1)
      await waitFor(() => bot.visitors.list.length === 0)
      expect(bot.visitorsSize).to.equal(0)
      await waitFor(() => user1.activeBots.length === 0)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads own bot', async done => {
    try {
      timestamp()
      const loadedBot2 = await user1.loadBot(bot.id, null)
      await waitFor(() => !loadedBot2.loading)
      expect(loadedBot2.guestsSize).to.equal(1)
      expect(loadedBot2.guest).to.equal(true)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads bot', async done => {
    try {
      timestamp()
      loadedBot = await user2.loadBot(bot.id, null)
      await waitFor(() => !loadedBot.loading)
      expect(loadedBot.guestsSize).to.equal(1)
      expect(loadedBot.guest).to.equal(false)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('geofence subscribes', async done => {
    try {
      timestamp()
      await loadedBot.subscribeGeofence()
      expect(loadedBot.guest).to.equal(true)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads bot again', async done => {
    try {
      timestamp()
      loadedBot = await user2.loadBot(bot.id, null)
      expect(loadedBot.guestsSize).to.equal(2)
      expect(loadedBot.guest).to.equal(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('load bot guests', async done => {
    try {
      timestamp()
      expect(bot.guests.length).to.equal(0)
      await bot.guests.load()
      expect(bot.guests.length).to.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('user2 enters the bot and verify activeBots', async done => {
    try {
      timestamp()
      expect(bot.visitorsSize).to.equal(0)
      expect(user1.activeBots.length).to.equal(0)
      await enterBot(user1)
      await enterBot(user2)
      await waitFor(() => bot.visitorsSize === 2)
      expect(user1.activeBots.length).to.equal(2)
      expect(user1.activeBots[0].title).to.equal('Test bot')
      expect(user1.activeBots[1].title).to.equal('Test bot2')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('verify activeBots after refresh', async done => {
    try {
      timestamp()
      await user1.geofenceBots.refresh()
      expect(user1.activeBots.length).to.equal(0)
      await user1.geofenceBots.load()
      expect(user1.activeBots.length).to.equal(2)
      expect(user1.activeBots[0].title).to.equal('Test bot')
      expect(user1.activeBots[0].visitors.list.length).to.equal(1) // load only last visitor!
      expect(user1.activeBots[0].visitors.list[0].id).to.equal(user2.username)
      expect(user1.activeBots[1].title).to.equal('Test bot2')
      expect(user1.activeBots[1].visitors.list.length).to.equal(1)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('geofence unsubscribe', async done => {
    try {
      timestamp()
      await loadedBot.unsubscribeGeofence()
      expect(loadedBot.guest).to.equal(false)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('load bot guests again', async done => {
    try {
      timestamp()
      await bot.guests.refresh()
      expect(bot.guests.length).to.equal(0)
      await bot.guests.load()
      expect(bot.guests.length).to.equal(1)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('geofence unsubscribe owner', async done => {
    try {
      timestamp()
      const loadedBot2 = await user1.loadBot(bot.id, null)
      await waitFor(() => !loadedBot2.loading)
      expect(loadedBot2.guestsSize).to.equal(1)
      expect(loadedBot2.guest).to.equal(true)
      await loadedBot2.unsubscribeGeofence()
      expect(loadedBot2.guest).to.equal(false)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load bot guests again 2', async done => {
    try {
      timestamp()
      await bot.guests.refresh()
      expect(bot.guests.length).to.equal(0)
      await bot.guests.load()
      expect(bot.guests.length).to.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })

  after('remove', async done => {
    try {
      await user2.removeBot(loadedBot.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot.id)
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
