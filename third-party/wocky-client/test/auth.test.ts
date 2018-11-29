import {GraphQLTransport} from '../src/transport/GraphQLTransport'
import _ from 'lodash'

const host = 'next.dev.tinyrobot.com'

// tslint:disable:no-console
describe('GraphQL auth', () => {
  let userId1: string, userId2: string

  it('logs in new user via bypass', async () => {
    const gql = new GraphQLTransport('testing')
    const {password} = await gql.register(
      {
        version: '1.1.4',
        os: 'ios',
        deviceName: 'iPhone',
        phoneNumber: '+15551',
      },
      host
    )
    expect(password).toBeTruthy()
    await gql.login(undefined, password)
    expect(gql.username).toBeTruthy()
    expect(gql.connected).toBe(true)
    expect(gql.connecting).toBe(false)
    userId1 = gql.username!
    // gqlToken = password
    await gql.disconnect()
    expect(gql.connected).toBe(false)
  })

  // Check for this mistake: https://hippware.slack.com/archives/C033TRJDD/p1543459452073900
  it('logs in a different user via bypass', async () => {
    const gql = new GraphQLTransport('testing')
    const {password} = await gql.register(
      {
        version: '1.1.4',
        os: 'ios',
        deviceName: 'iPhone',
        phoneNumber: '+15552',
      },
      host
    )
    expect(password).toBeTruthy()
    await gql.login(undefined, password)
    expect(gql.username).toBeTruthy()
    userId2 = gql.username!
    expect(gql.connected).toBe(true)
    expect(gql.connecting).toBe(false)
    await gql.disconnect()
    expect(gql.connected).toBe(false)

    expect(userId1).not.toEqual(userId2)
  })
})
