import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {IWockyTransport, GraphQLTransport, IWocky} from '../src'

// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'testing.dev.tinyrobot.com'
let gql: IWockyTransport, user: IWocky

// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  before('get credentials via XMPP', async done => {
    user = await createXmpp(34)
    await waitFor(() => user.profile !== null)
    await user.profile!.update({handle: 'abc134', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
    // console.log('credentials', user.username, user.password)
    gql = new GraphQLTransport('testing')
    gql.login(user.username!, user.password!, host)
    done()
  })

  it('loads profile', async done => {
    try {
      const profile = await gql.loadProfile(user.username!)
      console.log('PROFILE:', JSON.stringify(profile))
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
      const bot2 = await user.createBot()
      await bot2.update({location: {latitude: 1.2, longitude: 2.2}, title: 'Test bot2', geofence: false, addressData: {city: 'New York', country: 'US'}})
      const bots = await gql.loadOwnBots(user.username!)
      console.log('bots', bots)
      expect(bots.count).to.equal(2)
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
