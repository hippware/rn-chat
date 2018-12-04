import {createUser} from './support/testuser'
import {IWocky} from '../src'
import {IBot} from '../src/model/Bot'

let user: IWocky, user2: IWocky
let bot: IBot

const icon = '\u00A9\uFE0F\u00A9'

describe('NewGraphQL tests', () => {
  beforeAll(async () => {
    user = await createUser()
    user2 = await createUser()
    bot = await user.createBot()
    // expect(bot.icon).toBe('')
    // expect(bot.isNew).toBe(true)
    bot.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
    await bot.update({
      icon,
      public: false,
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
  })

  it('checks the bot', () => {
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

  afterAll(async () => {
    try {
      await user.removeBot(bot.id)
    } catch (e) {
      // console.warn('error removing bot', e)
    }
    try {
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
