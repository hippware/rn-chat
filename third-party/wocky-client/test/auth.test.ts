import {sleep} from './support/testuser'
import {GraphQLTransport} from '../src/transport/GraphQLTransport'
import _ from 'lodash'

const host = 'testing.dev.tinyrobot.com'

describe('GraphQL auth', () => {
  let gqlToken

  it('logs in new user via bypass', async () => {
    const gql = new GraphQLTransport('testing', host, '1.1.4', 'os', 'deviceName')
    gql.phoneNumber = '+15551234567'
    const {userId, token} = await gql.loginGQL()
    expect(userId).toBeTruthy()
    expect(token).toBeTruthy()
    expect(gql.connected).toBe(true)
    expect(gql.connecting).toBe(false)
    gqlToken = token
    await gql.disconnect()
  })

  it('logs in existing user with userId and token', async () => {
    const gql = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
    const {userId, token} = await gql.loginGQL({token: gqlToken})
    expect(userId).toBeTruthy()
    expect(token).toBeTruthy()
    await gql.remove()
  })

  it('bypass register a user with both transports', async () => {
    const gql = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
    const {userId, token} = await gql.loginGQL({token: gqlToken})
    expect(userId).toBeTruthy()
    expect(token).toBeTruthy()
    await gql.remove()
  })

  // TODO: is there a way to do tests with "real" firebase tokens?
  // it('logs in existing XMPP-authed user via firebsae', async () => {
  //   const provider = new XmppStropheV2()
  //   const xmppTransport = new XmppTransport(provider, 'testing')
  //   // console.log('& xmpp', xmppTransport)
  //   const gql = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
  //   // const transport = new HybridTransport(xmppTransport, gql)
  //   // const phoneNumber = _.padStart(
  //   //   `+1555${Math.trunc(Math.random() * 10000000).toString()}`,
  //   //   7,
  //   //   '0'
  //   // )
  //   // const userID = `000000${phoneNumber.replace('+1555', '')}`
  //   const firebaseToken = 'someRandomFirebaseToken'

  //   const {username} = await xmppTransport.register({jwt: firebaseToken}, host, 'firebase')
  //   // expect(gql.firebaseToken).toBeTruthy()
  //   const res = await xmppTransport.login()
  //   expect(res).toBe(true)
  //   expect(xmppTransport.connected).toBe(true)
  //   gql.saveFirebaseToken(firebaseToken)

  //   const {userId, token} = await gql.loginGQL({
  //     userId: username,
  //     // token?: string
  //     // bypass: false,
  //     // phoneNumber,
  //   })
  //   expect(userId).toBeTruthy()
  //   expect(token).toBeTruthy()
  //   expect(gql.connected).toBe(true)
  //   expect(gql.connecting).toBe(false)

  //   await xmppTransport.disconnect()
  //   await gql.disconnect()
  // })

  it('tests auth via HTTP header (not web sockets)', async () => {
    // todo
  })

  afterAll(async () => {
    // allow time for the console logs to show up before exiting
    await sleep(1000)
  })
})
