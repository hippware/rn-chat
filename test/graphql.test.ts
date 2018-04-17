import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {IBot, GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'testing.dev.tinyrobot.com'
let gql: GraphQLTransport, user: IWocky
let bot, bot2: IBot
// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  before('get credentials via XMPP', async done => {
    try {
      user = await createXmpp(35)
      await waitFor(() => user.profile !== null)
      await user.profile!.update({handle: 'abc134567', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
      // console.log('credentials', user.username, user.password)
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
      const profile = await gql.loadProfile(user.username!)
      // console.log('PROFILE:', JSON.stringify(profile))
      expect(profile.id).to.equal(user.username)
      expect(profile.__typename).to.equal('User')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets some bots', async done => {
    try {
      bot = await user.createBot()
      await bot.update({location: {latitude: 1.1, longitude: 2.1}, title: 'Test bot', geofence: true, addressData: {city: 'Koper', country: 'Slovenia'}})
      bot2 = await user.createBot()
      await bot2.update({location: {latitude: 1.2, longitude: 2.2}, title: 'Test bot2', geofence: false, addressData: {city: 'New York', country: 'US'}})
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
      await gql.setLocation({latitude: 21.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      await gql.setLocation({latitude: 21.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      await gql.subscribeBotVisitors()
      await gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      await gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'ARRIVE',
        () => {
          expect(gql.botVisitor.botId).to.equal(bot.id)
          expect(gql.botVisitor.id).to.equal(user.profile.id)
          expect(gql.botVisitor.handle).to.equal(user.profile.handle)
          expect(gql.botVisitor.firstName).to.equal(user.profile.firstName)
          expect(gql.botVisitor.lastName).to.equal(user.profile.lastName)
          expect(gql.botVisitor.avatar).to.be.null
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
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      when(
        () => !!gql.botVisitor && gql.botVisitor.action === 'DEPART',
        () => {
          expect(gql.botVisitor.botId).to.equal(bot.id)
          expect(gql.botVisitor.id).to.equal(user.profile.id)
          expect(gql.botVisitor.handle).to.equal(user.profile.handle)
          expect(gql.botVisitor.firstName).to.equal(user.profile.firstName)
          expect(gql.botVisitor.lastName).to.equal(user.profile.lastName)
          expect(gql.botVisitor.avatar).to.be.null
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
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
      const loaded = await gql.loadBot(bot.id, bot.server)
      expect(loaded.title).to.equal(bot.title)
      expect(loaded.geofence).to.equal(bot.geofence)
      expect(loaded.guest).to.equal(true)
      expect(loaded.id).to.equal(bot.id)
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
    done()
  })
})
