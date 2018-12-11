import {createUser, waitFor, timestamp} from './support/testuser'
import {IBot, NextGraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// tslint:disable:no-console

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'next.dev.tinyrobot.com'
let gql: NextGraphQLTransport, user: IWocky, user2: IWocky
let bot: IBot, bot2: IBot
let date: Date
let user1phone: string
// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  it('get user1 credential via XMPP', async done => {
    try {
      timestamp()
      user = await createUser()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('get user2 credentials via XMPP', async done => {
    try {
      timestamp()
      user2 = await createUser()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update profile', async done => {
    try {
      timestamp()
      await waitFor(
        () => user.profile !== null && user.profile.phoneNumber !== null,
        'user1 profile to load'
      )
      user1phone = user.profile!.phoneNumber!
      await user.profile!.update({
        handle: 'a' + user1phone.replace('+', ''),
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })

  it('login via graphql and set user location', async done => {
    try {
      timestamp()
      gql = new NextGraphQLTransport('next')
      await gql.login(user.username!, user.password!, host)
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1})
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1})
      done()
    } catch (e) {
      done(e)
    }
  })

  it('loads profile', async done => {
    try {
      timestamp()
      const profile = await gql.loadProfile(user.username!)
      // console.log('PROFILE:', JSON.stringify(profile))
      expect(profile!.id).toEqual(user.username!)
      expect((profile as any).email).toEqual('a@aa.com')
      expect((profile as any).phoneNumber).toEqual(user1phone)
      expect((profile as any).__typename).toEqual('CurrentUser')
      expect(profile!.hidden!.enabled).toEqual(false)
      expect(profile!.hidden!.expires).toEqual(null)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('hide user', async done => {
    try {
      timestamp()
      date = new Date(Date.now() + 1000)
      await gql.hideUser(true, date)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('loads profile again ', async done => {
    try {
      timestamp()
      const profile = await gql.loadProfile(user.username!)
      expect(profile!.hidden!.expires.getTime()).toEqual(date.getTime())
      expect(profile!.hidden!.enabled).toEqual(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('unhide user', async done => {
    try {
      timestamp()
      await gql.hideUser(false)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('loads profile again ', async done => {
    try {
      timestamp()
      const profile = await gql.loadProfile(user.username!)
      expect(profile!.hidden!.expires).toBe(null)
      expect(profile!.hidden!.enabled).toEqual(false)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('loads other profile', async done => {
    try {
      timestamp()
      const profile = await gql.loadProfile(user2.username!)
      // console.log('PROFILE:', JSON.stringify(profile))
      expect(profile!.id).toEqual(user2.username)
      expect((profile as any).email).toBeUndefined()
      expect((profile as any).phoneNumber).toBeUndefined()
      expect((profile as any).__typename).toEqual('OtherUser')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets some bots', async done => {
    try {
      timestamp()
      bot = await user.createBot()
      bot.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
      await bot.update({
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot',
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      bot2 = await user.createBot()
      bot2.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
      await bot2.update({
        location: {latitude: 1.2, longitude: 2.2},
        title: 'Test bot2',
        addressData: {city: 'New York', country: 'US'},
      })
      const bots = await gql.loadOwnBots(user.username!, undefined, 1)
      // console.log('bots', bots)
      expect(bots.count).toEqual(2)
      expect(bots.list.length).toEqual(1)
      expect(bots.list[0].title).toEqual('Test bot2')
      const bots2 = await gql.loadOwnBots(user.username!, bots.cursor, 1)
      // console.log('bots', bots2)
      expect(bots2.count).toEqual(2)
      expect(bots2.list.length).toEqual(1)
      expect(bots2.list[0].title).toEqual('Test bot')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('check subscription arrive', async done => {
    try {
      timestamp()
      await gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1})
      gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'ARRIVE',
        () => {
          expect(gql.botVisitor.bot.id).toEqual(bot.id)
          expect(gql.botVisitor.visitor.id).toEqual(user.profile!.id)
          expect(gql.botVisitor.bot.visitors[0].id).toEqual(user.profile!.id)
          expect(gql.botVisitor.bot.visitors[0].handle).toEqual(user.profile!.handle)
          expect(gql.botVisitor.bot.visitors[0].firstName).toEqual(user.profile!.firstName)
          expect(gql.botVisitor.bot.visitors[0].lastName).toEqual(user.profile!.lastName)
          expect(gql.botVisitor.action).toEqual('ARRIVE')
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })
  it('check subscription exit', async done => {
    try {
      timestamp()
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1})
      gql.setLocation({latitude: 0, longitude: 0, accuracy: 1})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'DEPART',
        () => {
          expect(gql.botVisitor.bot.id).toEqual(bot.id)
          expect(gql.botVisitor.visitor.id).toEqual(user.profile!.id)
          expect(gql.botVisitor.action).toEqual('DEPART')
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })
  it('load bot', async done => {
    try {
      timestamp()
      const loaded = await gql.loadBot(bot.id)
      expect(loaded.title).toEqual(bot.title)
      expect(loaded.id).toEqual(bot.id)
      done()
    } catch (e) {
      done(e)
    }
  })
  // TODO deal with verification of search?
  // it('searches users', async done => {
  //   try {
  //     timestamp()
  //     await gql.login(user.username!, user.password!, host)
  //     await gql.searchUsers('abc')
  //     // NOTE: results for newly created users don't show up in the results which makes expected values
  //     // on the return from `searchUsers` difficult here
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  afterAll(async done => {
    try {
      await gql.disconnect()
      await user.removeBot(bot.id)
      await user.removeBot(bot2.id)
      await user.remove()
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    try {
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    done()
  })
})
