import {createUser, timestamp, waitFor} from './support/testuser'
import {IWocky} from '../src'
import {getSnapshot} from 'mobx-state-tree'
import {IBot} from '../src/model/Bot'

let user: IWocky, user2: IWocky
let user1phone: string
let bot: IBot

const icon = '\u00A9\uFE0F\u00A9'

describe('NewGraphQL tests', () => {
  beforeAll(async () => {
    user = await createUser()
    expect(user.username).toBeTruthy()
    timestamp()
    user2 = await createUser()
    expect(user2.username).toBeTruthy()
    // not sure why they're the same
    expect(user.username).not.toBe(user2.username)
  })

  it('update profile with invalid handle', async () => {
    try {
      expect(user.profile!.updated).toBe(false)
      expect(await user.profile!.update({handle: 'a', firstName: 'b', lastName: 'c'})).toThrow()
    } catch (e) {
      expect(user.profile!.updated).toBe(false)
      expect(e.message).toBe(
        '[{"__typename":"ValidationMessage","message":"should be at least 3 character(s)"}]'
      )
    }
  })

  it('update profile', async () => {
    await waitFor(
      () => user.profile !== null && user.profile.phoneNumber !== null,
      `user profile failed to load with phone number. ${getSnapshot(user)}`
    )
    expect(user.profile).toBeTruthy()
    expect(user.profile!.phoneNumber).toBeTruthy()
    user1phone = user.profile!.phoneNumber!
    await user.profile!.update({
      handle: 'a' + user1phone.replace('+', ''),
      firstName: 'name1',
      lastName: 'lname1',
      email: 'a@aa.com',
    })
  })

  it('make them friends', async () => {
    expect(user.sortedRoster.length).toBe(0)
    expect(user2.sortedRoster.length).toBe(0)
    const user1user2Profile = await user.loadProfile(user2.username!)
    expect(user1user2Profile).toBeTruthy()
    await user1user2Profile.follow()
    await waitFor(
      () => user.sortedRoster.length === 1 && user2.sortedRoster.length === 1,
      'user1 and user2 rosters didnt update in time'
    )

    // TODO: continue with roster expects
    // expect(user.sortedRoster[0].id).toEqual(user2.username)
    // expect(user2.sortedRoster[0].id).toEqual(user.username)
    // // check profile is online
    // await waitFor(() => user2.sortedRoster[0].status === 'available', 'user2 not available in time')
  })

  it('create bot', async () => {
    bot = await user.createBot()
    expect(bot.icon).toBe('')
    expect(bot.isNew).toBe(true)
  })

  it('update bot', async () => {
    bot.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
    await bot.update({
      icon,
      public: false,
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
    expect(bot.icon).toBe(icon)
    expect(bot.isNew).toBe(false)
    expect(bot.title).toBe('Test bot')
    expect(bot.location!.latitude).toBe(1.1)
    expect(bot.location!.longitude).toBe(2.1)
  })
  it('update bot location', async () => {
    await bot.update({
      location: {latitude: 1.3, longitude: 2.3},
      title: 'Test bot!',
    })
    expect(bot.isNew).toBe(false)
    expect(bot.title).toBe('Test bot!')
    expect(bot.location!.latitude).toBe(1.3)
    expect(bot.location!.longitude).toBe(2.3)
  })

  it('update bot description', async () => {
    await bot.update({description: 'New description'})
    expect(bot.description).toBe('New description')
  })

  it('create bot posts', async () => {
    // await (bot.posts as IBotPaginableList).load()
    await bot.posts.load()
    expect(bot.posts.list.length).toBe(0)
    const botPost = bot.createPost('hello')
    await botPost.publish()
    const botPost2 = bot.createPost('hello2')
    await botPost2.publish()
    expect(bot.posts.list.length).toBe(2)
  })

  // it('loads bot posts after refresh', async () => {
  //   bot.posts.refresh()
  //   expect(bot.posts.list.length).toBe(0)
  //   await bot.posts.load()
  //   expect(bot.posts.list.length).toBe(2)
  // })

  afterAll(async () => {
    try {
      await user.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
    try {
      await user2.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })
})
