import {sleep} from './support/testuser'
import {GraphQLTransport} from '../src/transport/GraphQLTransport'

const host = 'testing.dev.tinyrobot.com'

describe('GraphQL auth', () => {
  let userId, token

  it.only('logs in new user with bypass', async () => {
    const gql = new GraphQLTransport('testing', host, '1.1.4', 'os', 'deviceName')
    const result: any = await gql.loginGQL({
      accessToken: 'accessToken',
      bypass: true,
      phoneNumber: '+15551234567',
    })
    expect(result.userId).toBeTruthy()
    expect(result.token).toBeTruthy()
    expect(gql.connected).toBe(true)
    expect(gql.connecting).toBe(false)
    userId = result.userId
    token = result.token
    await gql.disconnect()
  })

  it('logs in existing user with userId and token', async () => {
    const gql = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
    const result: any = await gql.loginGQL({userId, token})
    console.log('& in test result 2', result)
    expect(result.userId).toBeTruthy()
    expect(result.token).toBeTruthy()
  })

  it('tests auth via HTTP header (not web sockets)', async () => {
    // todo
  })

  afterAll(async () => {
    // allow time for the console logs to show up before exiting
    await sleep(1000)
  })
})
