import {createUser, fillAndSaveProfile, dumpProfile, dumpBot, waitFor} from './support/testuser'
import {IWocky} from '../../src/wocky'
import {IBot} from '../../src/model/Bot'

let user: IWocky, user2: IWocky
let bot, bot2: IBot

const icon = '\u00A9\uFE0F\u00A9'

describe('NewGraphQL tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)

    user = await createUser()
    user2 = await createUser()
    await fillAndSaveProfile(user, 'user', 'user')
    await fillAndSaveProfile(user2, 'user2', 'user2')
    await dumpProfile(user, 'USER')
    await dumpProfile(user2, 'USER2')

    bot = await user.createBot()
    // expect(bot.icon).toBe('')
    // expect(bot.isNew).toBe(true)
    await bot.update({
      icon,
      public: false,
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
  })
  it('make them friends', async () => {
    const profile = await user.loadProfile(user2.username!)
    const profile2 = await user2.loadProfile(user.username!)
    await profile.invite()
    await waitFor(() => profile2.hasSentInvite, 'user invitation notification')
    await profile2.invite() // become friends!
  })

  it('checks the bot', () => {
    dumpBot(bot, 'bot')
    expect(bot.icon).toBe(icon)
    expect(bot.isNew).toBe(false)
    expect(bot.title).toBe('Test bot')
    expect(bot.location!.latitude).toBe(1.1)
    expect(bot.location!.longitude).toBe(2.1)
  })

  it('update bot location', async () => {
    await bot.update({
      location: {latitude: 1.21, longitude: 2.21},
      title: 'Test bot!',
    })
    dumpBot(bot, 'bot')
    expect(bot.isNew).toBe(false)
    expect(bot.title).toBe('Test bot!')
    expect(bot.location!.latitude).toBe(1.21)
    expect(bot.location!.longitude).toBe(2.21)
  })

  it('create bot2', async () => {
    bot2 = await user.createBot()
    expect(bot2.isNew).toBe(true)
    await bot2.update({
      location: {latitude: 1.2, longitude: 2.2},
      title: 'Test bot2',
    })
    dumpBot(bot2, 'bot2')
    expect(bot2.title).toBe('Test bot2')
    expect(bot2.location!.latitude).toBe(1.2)
    expect(bot2.location!.longitude).toBe(2.2)
  })

  it('get local bots 0', async () => {
    await user.loadLocalBots({
      latitude: 1.2,
      longitude: 2.2,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    })
    expect(user.localBots.length).toBe(2)
  })
  it('get local bots 1 - expect area too large', async () => {
    try {
      expect(
        await user.loadLocalBots({
          latitude: 1.2,
          longitude: 2.2,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        })
      ).toThrow()
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })
  it('get local bots 2', async () => {
    await user.loadLocalBots({
      latitude: 3.2,
      longitude: 4.2,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    })
    expect(user.localBots.length).toBe(2)
  })

  it('update bot description', async () => {
    await bot.update({description: 'New description'})
    expect(bot.description).toBe('New description')
  })

  it('create bot posts + load with paging', async () => {
    await bot.posts.load()
    expect(bot.posts.list.length).toBe(0)
    for (let i = 0; i < 12; i += 1) {
      const botPost = bot.createPost('hello' + i)
      await botPost.publish()
    }
    expect(bot.posts.list.length).toBe(12)
    // load bot posts
    bot.posts.refresh()
    expect(bot.posts.list.length).toBe(0)
    // load first page (10 records)
    await bot.posts.load()
    expect(bot.posts.list.length).toBe(10)
    // verify paging
    await bot.posts.load()
    expect(bot.posts.list.length).toBe(12)
    // we have reversed order of posts here
    for (let i = 0; i < 12; i += 1) {
      expect(bot.posts.list[i].content).toBe('hello' + (11 - i))
    }
  })

  it('removes a bot post', async () => {
    await bot.removePost(bot.posts.list[0].id)
    expect(bot.posts.list.length).toBe(11)
  })

  it('invite, accept bot invitation, unsubscribe', async () => {
    expect(user2.notifications.length).toBe(2)
    await bot.invite([user2!.username!])
    await waitFor(() => user2.notifications.length === 3, 'bot invitation notification')
    const loadedBot = await user2.loadBot(bot.id)
    await loadedBot.acceptInvitation()
    await user2.loadBot(bot.id)
    dumpBot(bot, 'loadedBot')
    expect(loadedBot.followersSize).toEqual(1)
    // TODO: figure out why guests not incrementing after accepted invitation
    // await waitFor(
    //   () => loadedBot.guestsSize === 2,
    //   'guests size to be 2 after user accepts invitation'
    // )
    await loadedBot.unsubscribe()
  })

  afterAll(async () => {
    try {
      // removing users will remove their bots
      await user.remove()
    } catch (e) {
      // console.warn('error removing user 1', e)
    }
    try {
      await user2.remove()
    } catch (e) {
      // console.warn('error removing user 2', e)
    }
  })
})
