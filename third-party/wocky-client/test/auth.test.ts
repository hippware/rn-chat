import {sleep} from './support/testuser'
import {GraphQLTransport} from '../src/transport/GraphQLTransport'
import _ from 'lodash'

const host = 'testing.dev.tinyrobot.com'

describe('GraphQL auth', () => {
  let gqlToken

  it('logs in new user via bypass', async () => {
    const gql = new GraphQLTransport('testing')
    const {userId, token} = await gql.loginGraphQL({
      host,
      version: '1.1.4',
      os: 'ios',
      deviceName: 'iPhone',
      phoneNumber: '+15551234567',
    })
    expect(userId).toBeTruthy()
    expect(token).toBeTruthy()
    expect(gql.connected).toBe(true)
    expect(gql.connecting).toBe(false)
    gqlToken = token
    // await gql.disconnect()
  })

  it('logs in existing user with userId and token', async () => {
    const gql = new GraphQLTransport('testing')
    const {userId, token} = await gql.loginGraphQL({token: gqlToken, host})
    expect(userId).toBeTruthy()
    expect(token).toBeTruthy()
    await gql.remove()
  })

  it('tests auth via HTTP header (not web sockets)', async () => {
    // todo
  })

  afterAll(async () => {
    // allow time for the console logs to show up before exiting
    await sleep(1000)
  })
})
