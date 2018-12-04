import {createXmpp, sleep, waitFor, timestamp} from './support/testuser'
import {IWocky, IOwnProfile} from '../src'
import {IBot} from '../src/model/Bot'
import {Location} from '../src/model/Location'

// tslint:disable:no-console

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, loadedBot: IBot

const insideBotLocation = {accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'}
const outsideBotLocation = {accuracy: 1, longitude: 22.1, latitude: 1.1, resource: 'testing'}

async function enterBot(user: IWocky) {
  await user.setLocation(insideBotLocation)
  user.setLocation(insideBotLocation)
  await sleep(500)
}

async function exitBot(user: IWocky) {
  await user.setLocation(outsideBotLocation)
  user.setLocation(outsideBotLocation)
  await sleep(500)
}

describe('Geofence', () => {
  beforeAll(() => {
    jest.setTimeout(30000)
  })
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
      await waitFor(() => user1.profile !== null, 'user1 profile to load')
      await waitFor(() => user2.profile !== null, 'user2 profile to load')
      const user1phone = user1.profile!.phoneNumber
      const user2phone = user2.profile!.phoneNumber
      await user1.profile!.update({
        handle: 'd' + user1phone!.replace('+', ''),
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      await user2.profile!.update({
        handle: 'e' + user2phone!.replace('+', ''),
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

  it('creates a geofence bot', async done => {
    try {
      timestamp()
      bot = await user1.createBot()
      bot.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
      await bot.update({
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot',
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      // console.log('bot updated', bot.toJSON())
      expect(bot.visitorsSize).toEqual(0)
      expect(bot.guestsSize).toEqual(0)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('invite user2 to bot', async done => {
    try {
      await bot.invite([user2!.username!])
      done()
    } catch (e) {
      done(e)
    }
  })
  it('user2 receives bot invite', async done => {
    try {
      await waitFor(
        () => user2.notifications.length === 1,
        'user2 bot invitation notification to arrive'
      )
      done()
    } catch (e) {
      done(e)
    }
  })
  it('load own profile, check hasUsedGeofence', async done => {
    try {
      timestamp()
      const profile1 = (await user1.loadProfile(user1.username!)) as IOwnProfile
      expect(profile1.hasUsedGeofence).toBe(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('creates a geofence bot2', async done => {
    try {
      timestamp()
      bot2 = await user1.createBot()
      bot2.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
      await bot2.update({
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot2',
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      // console.log('bot updated', bot.toJSON())
      expect(bot2.visitorsSize).toEqual(0)
      expect(bot2.guestsSize).toEqual(0)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load visitors and live updates', async done => {
    try {
      timestamp()
      await bot.visitors.load!()
      expect(bot.visitors.list.length).toEqual(0)
      expect(bot.visitorsSize).toEqual(0)
      await enterBot(user1)
      await waitFor(() => bot.visitors.list.length === 1, 'bot visitors to increment')
      expect(bot.visitorsSize).toEqual(1)
      await waitFor(() => user1.activeBots.length === 2, 'bot visitors to increment')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load visitors2', async done => {
    try {
      timestamp()
      bot.visitors.refresh!()
      expect(bot.visitors.list.length).toEqual(0)
      await bot.visitors.load!()
      expect(bot.visitors.list.length).toEqual(1)
      await exitBot(user1)
      await waitFor(() => bot.visitors.list.length === 0, 'bot visitors to increment')
      expect(bot.visitorsSize).toEqual(0)
      await waitFor(() => user1.activeBots.length === 0, 'active bots to increment')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads own bot', async done => {
    try {
      timestamp()
      const loadedBot2 = await user1.loadBot(bot.id)
      await waitFor(() => !loadedBot2.loading, 'bot to load')
      expect(loadedBot2.guestsSize).toEqual(1)
      expect(loadedBot2.guest).toEqual(true)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads bot', async done => {
    try {
      timestamp()
      loadedBot = await user2.loadBot(bot.id)
      await waitFor(() => !loadedBot.loading, 'bot to load')
      expect(loadedBot.guestsSize).toEqual(1)
      expect(loadedBot.guest).toEqual(false)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('accept invite', async done => {
    try {
      timestamp()
      await loadedBot.acceptInvitation(Location.create({latitude: 50, longitude: 50, accuracy: 5}))
      // server subscribes automatically on invite accept
      expect(loadedBot.guest).toEqual(true)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads bot again', async done => {
    try {
      timestamp()
      loadedBot = await user2.loadBot(bot.id)
      expect(loadedBot.guestsSize).toEqual(2)
      expect(loadedBot.guest).toEqual(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('load bot guests', async done => {
    try {
      timestamp()
      expect(bot.guests.length).toEqual(1)
      await bot.guests.load()
      expect(bot.guests.length).toEqual(2)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('user2 enters the bot and verify activeBots', async done => {
    try {
      timestamp()
      expect(bot.visitorsSize).toEqual(0)
      expect(user1.activeBots.length).toEqual(0)
      await enterBot(user1)
      await enterBot(user2)
      await waitFor(() => bot.visitorsSize === 2, 'bot visitors to increment')
      expect(user1.activeBots.length).toEqual(2)
      expect(user1.activeBots[0].title).toEqual('Test bot')
      expect(user1.activeBots[1].title).toEqual('Test bot2')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('verify activeBots after refresh', async done => {
    try {
      timestamp()
      await user1.geofenceBots.refresh()
      expect(user1.activeBots.length).toEqual(0)
      await user1.geofenceBots.load()
      expect(user1.activeBots.length).toEqual(2)
      expect(user1.activeBots[0].title).toEqual('Test bot')
      expect(user1.activeBots[0].visitors.list.length).toEqual(2)
      expect(user1.activeBots[0].visitors.list[0].id).toEqual(user2.username)
      expect(user1.activeBots[1].title).toEqual('Test bot2')
      expect(user1.activeBots[1].visitors.list.length).toEqual(1)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('2 users at same new bot location, both visitors', async done => {
    try {
      timestamp()
      user2.notifications.refresh()
      bot = await user1.createBot()
      bot.setUserLocation(insideBotLocation)
      await Promise.all([enterBot(user1), enterBot(user2)])
      await bot.update({
        location: insideBotLocation,
        title: 'Test bot',
        addressData: {city: 'West Hollywood', country: 'United States'},
      })
      await bot.invite([user2!.username!])
      await waitFor(() => user2.notifications.length === 1, 'bot invitation notification')
      loadedBot = await user2.loadBot(bot.id)
      expect(loadedBot.visitorsSize).toEqual(1)
      await loadedBot.acceptInvitation(Location.create(insideBotLocation))
      expect(loadedBot.guest).toEqual(true)
      await waitFor(() => loadedBot.visitorsSize === 2, 'visitors size to increment')
      done()
    } catch (e) {
      done(e)
    }
  })
  afterAll(async done => {
    try {
      await user2.removeBot(loadedBot.id)
    } catch (e) {
      // noop
    }
    try {
      await user1.removeBot(bot.id)
    } catch (e) {
      // noop
    }
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
