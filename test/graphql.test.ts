import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {GraphQLTransport} from '../src/store/GraphQLTransport'

// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'testing.dev.tinyrobot.com'
let gql, user

// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  before('get credentials via XMPP', async done => {
    user = await createXmpp(34)
    // console.log('credentials', user.username, user.password)
    gql = new GraphQLTransport('testing', host, user.username, user.password)
    done()
  })

  it('loads profile', async done => {
    try {
      const profile = await gql.loadProfile(user.username)
      expect(profile.id).to.equal(user.username)
      expect(profile.__typename).to.equal('Profile')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets some bots', async done => {
    try {
      const bot = await user.createBot()
      await bot.update({location: {latitude: 1.1, longitude: 2.1}, title: 'Test bot', geofence: true, addressData: {city: 'Koper', country: 'Slovenia'}})
      const bots = await gql.loadOwnBots(user.username)
      // console.log('bots', bots)
      expect(bots.length).to.equal(1)
      done()
    } catch (e) {
      done(e)
    }
  })

  // it('paginates bots', async done => {
  //   console.log('todo')
  //   done()
  // })

  after('remove', async done => {
    try {
      await user.remove()
    } catch (e) {
      console.log(e)
    }
    done()
  })
})
