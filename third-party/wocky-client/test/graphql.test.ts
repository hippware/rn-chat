import {expect} from 'chai'
import {createXmpp, waitFor, timestamp} from './support/testuser'
import {IBot, GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'testing.dev.tinyrobot.com'
let gql: GraphQLTransport, user, user2: IWocky
let bot, bot2: IBot
let date: Date
let user1phone: string
// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  it('get user1 credential via XMPP', async done => {
    try {
      timestamp()
      user = await createXmpp()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('get user2 credentials via XMPP', async done => {
    try {
      timestamp()
      user2 = await createXmpp()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update profile', async done => {
    try {
      timestamp()
      await waitFor(() => user.profile !== null && user.profile.phoneNumber !== null)
      user1phone = user.profile.phoneNumber
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
      gql = new GraphQLTransport('testing')
      await gql.login(user.username!, user.password!, host)
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
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
      expect(profile.id).to.equal(user.username)
      expect(profile.email).to.equal('a@aa.com')
      expect(profile.phoneNumber).to.equal(user1phone)
      expect(profile.__typename).to.equal('CurrentUser')
      expect(profile.hidden.enabled).to.equal(false)
      expect(profile.hidden.expires).to.equal(null)
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
      expect(profile.hidden.expires.getTime()).to.equal(date.getTime())
      expect(profile.hidden.enabled).to.equal(true)
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
      expect(profile.hidden.expires).to.be.null
      expect(profile.hidden.enabled).to.equal(false)
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
      expect(profile.id).to.equal(user2.username)
      expect(profile.email).to.be.undefined
      expect(profile.phoneNumber).to.be.undefined
      expect(profile.__typename).to.equal('OtherUser')
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
      const bots = await gql.loadOwnBots(user.username!, null, 1)
      // console.log('bots', bots)
      expect(bots.count).to.equal(2)
      expect(bots.list.length).to.equal(1)
      expect(bots.list[0].title).to.equal('Test bot2')
      const bots2 = await gql.loadOwnBots(user.username!, bots.cursor, 1)
      // console.log('bots', bots2)
      expect(bots2.count).to.equal(2)
      expect(bots2.list.length).to.equal(1)
      expect(bots2.list[0].title).to.equal('Test bot')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('check subscription arrive', async done => {
    try {
      timestamp()
      await gql.subscribeBotVisitors()
      await gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'ARRIVE',
        () => {
          expect(gql.botVisitor.bot.id).to.equal(bot.id)
          expect(gql.botVisitor.visitor.id).to.equal(user.profile.id)
          expect(gql.botVisitor.bot.visitors[0].id).to.equal(user.profile.id)
          expect(gql.botVisitor.bot.visitors[0].handle).to.equal(user.profile.handle)
          expect(gql.botVisitor.bot.visitors[0].firstName).to.equal(user.profile.firstName)
          expect(gql.botVisitor.bot.visitors[0].lastName).to.equal(user.profile.lastName)
          expect(gql.botVisitor.action).to.equal('ARRIVE')
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
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'DEPART',
        () => {
          expect(gql.botVisitor.bot.id).to.equal(bot.id)
          expect(gql.botVisitor.visitor.id).to.equal(user.profile.id)
          expect(gql.botVisitor.action).to.equal('DEPART')
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
      expect(loaded.title).to.equal(bot.title)
      expect(loaded.guest).to.equal(true)
      expect(loaded.id).to.equal(bot.id)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('searches users', async done => {
    try {
      timestamp()
      await gql.login(user.username!, user.password!, host)
      await gql.searchUsers('abc')
      // NOTE: results for newly created users don't show up in the results which makes expected values
      // on the return from `searchUsers` difficult here
      done()
    } catch (e) {
      done(e)
    }
  })

  after('remove', async done => {
    try {
      await user.remove()
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
