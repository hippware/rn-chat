import {
  createUser,
  fillAndSaveProfile,
  dumpProfile,
  dumpBot,
  sleep,
  waitFor,
} from './support/testuser'
import {IWocky} from '../../src/wocky'
import {IBot} from '../../src/model/Bot'

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
  beforeAll(async () => {
    jest.setTimeout(60000)
    user1 = await createUser()
    user2 = await createUser()
  })

  it('update users with handles', async () => {
    await waitFor(() => user1.profile !== null, 'user1 profile to load')
    await waitFor(() => user2.profile !== null, 'user2 profile to load')

    await fillAndSaveProfile(user1, 'name1', 'lname1')
    await fillAndSaveProfile(user2, 'name2', 'lname2')
    await dumpProfile(user1, 'USER1')
    await dumpProfile(user2, 'USER2')

    const profile1 = await user2.loadProfile(user1.username!)
    const profile2 = await user1.loadProfile(user2.username!)
    await profile1.invite()
    await waitFor(() => profile2.hasSentInvite, 'user invitation notification')
    await profile2.invite() // become friends!
  })

  it('user1 creates a geofence bot', async () => {
    bot = await user1.createBot()
    await sleep(3000)
    await bot.update({
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
    dumpBot(bot, 'bot')
    expect(bot.visitorsSize).toEqual(0)
  })

  it('user1 invites user2 to bot', async () => {
    await bot.invite([user2!.username!])
    await waitFor(
      () => user2.notifications.length === 1,
      'user2 bot invitation notification didnt arrive'
    )
  })

  it('user1 creates bot2', async () => {
    bot2 = await user1.createBot()
    await sleep(3000)
    await bot2.update({
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot2',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
    dumpBot(bot2, 'bot2')
    expect(bot2.visitorsSize).toEqual(0)
  })

  it('load visitors and live updates', async () => {
    await bot.visitors.load!()
    expect(bot.visitors.list.length).toEqual(0)
    expect(bot.visitorsSize).toEqual(0)
    await enterBot(user1)
    await waitFor(
      () => bot.visitors.list.length === 1,
      'bot visitors didnt increment after user enters'
    )
    expect(bot.visitorsSize).toEqual(1)
    await waitFor(
      () => user1.activeBots.length === 2,
      'active bots didnt increment after user enters'
    )
  })

  it('exit bot and check for updates', async () => {
    bot.visitors.refresh!()
    expect(bot.visitors.list.length).toEqual(0)
    await bot.visitors.load!()
    expect(bot.visitors.list.length).toEqual(1)
    await exitBot(user1)
    await waitFor(() => bot.visitors.list.length === 0, 'bot visitors didnt decrement after exit')
    expect(bot.visitorsSize).toEqual(0)
    await waitFor(() => user1.activeBots.length === 0, 'active bots didnt decrement after exit')
  })

  it('user1 checks subscriber count after reload', async () => {
    const loadedBot2 = await user1.loadBot(bot.id)
    dumpBot(loadedBot2, 'loadedBot2')
    await waitFor(() => !loadedBot2.loading, 'bot2 to load')
    expect(loadedBot2.followersSize).toEqual(0)
  })

  it('check bot subscribers count after reload', async () => {
    loadedBot = await user2.loadBot(bot.id)
    await waitFor(() => !loadedBot.loading, 'bot to load')
    expect(loadedBot.followersSize).toEqual(0)
    expect(loadedBot.isSubscribed).toEqual(false)
  })

  it('user2 accepts invitation to bot', async () => {
    await loadedBot.acceptInvitation()
    // server subscribes automatically on invite accept
    expect(loadedBot.isSubscribed).toEqual(true)
  })

  it('user2 checks follower count after reloading bot', async () => {
    loadedBot = await user2.loadBot(bot.id)
    expect(loadedBot.isSubscribed).toEqual(true)
    expect(loadedBot.followersSize).toEqual(1)
    expect(loadedBot.subscribers.list.length).toEqual(0)
  })

  it('load bot subscribers and check the count', async () => {
    expect(bot.subscribers.list.length).toEqual(0)
    await bot.subscribers.load()
    expect(bot.subscribers.list.length).toEqual(1)
  })

  it('user2 enters the bot and verify activeBots', async () => {
    expect(bot.visitorsSize).toEqual(0)
    expect(user1.activeBots.length).toEqual(0)
    await enterBot(user1)
    await enterBot(user2)
    await waitFor(() => bot.visitorsSize === 2, 'bot visitors to increment')
    await waitFor(() => user1.activeBots.length === 2, 'active bots to increment')
    // expect(user1.activeBots[0].title).toEqual('Test bot')
    // expect(user1.activeBots[1].title).toEqual('Test bot2')
  })

  it('verify activeBots after refresh', async () => {
    await user1.geofenceBots.refresh()
    expect(user1.activeBots.length).toEqual(0)
    await user1.geofenceBots.load()
    expect(user1.activeBots.length).toEqual(2)
    expect(user1.activeBots[0].title).toEqual('Test bot')
    expect(user1.activeBots[0].visitors.list.length).toEqual(2)
    expect(user1.activeBots[0].visitors.list[0].id).toEqual(user2.username)
    expect(user1.activeBots[1].title).toEqual('Test bot2')
    expect(user1.activeBots[1].visitors.list.length).toEqual(1)
  })

  it('2 users at same new bot location, both visitors', async () => {
    user2.notifications.refresh()
    bot = await user1.createBot()
    user1.profile!.setLocation(insideBotLocation)
    await Promise.all([enterBot(user1), enterBot(user2)])
    await bot.update({
      location: insideBotLocation,
      title: 'Test bot',
      addressData: {city: 'West Hollywood', country: 'United States'},
    })
    dumpBot(bot, 'bot3')
    await bot.invite([user2!.username!])
    await waitFor(() => user2.notifications.length === 1, 'bot invitation notification')
    loadedBot = await user2.loadBot(bot.id)
    expect(loadedBot.visitorsSize).toEqual(1)
    user2.profile!.setLocation(insideBotLocation)
    await loadedBot.acceptInvitation()
    expect(loadedBot.isSubscribed).toEqual(true)
    await waitFor(() => loadedBot.visitorsSize === 2, 'visitors size to increment')
  })

  afterAll(async () => {
    try {
      // removing users will remove their bots
      await user1.remove()
      await user2.remove()
    } catch (e) {
      // console.warn(e)
    }
  })
})
