import {sleep} from './support/testuser'
import {GraphQLTransport} from '../src/transport/GraphQLTransport'
import _ from 'lodash'

const host = 'testing.dev.tinyrobot.com'

// tslint:disable:no-console
describe('GraphQL auth', () => {
  // let gqlToken

  it('logs in new user via bypass', async done => {
    try {
      const gql = new GraphQLTransport('testing')
      const {password} = await gql.register(
        {
          version: '1.1.4',
          os: 'ios',
          deviceName: 'iPhone',
          phoneNumber: '+15551234567',
        },
        host
      )
      expect(password).toBeTruthy()
      await gql.login(undefined, password)
      console.log('CONNECTED:', gql.connected)
      expect(gql.connected).toBe(true)
      expect(gql.connecting).toBe(false)
      // gqlToken = password
      await gql.disconnect()
      console.log('DISCONNECTED:', gql.connected)
      done()
    } catch (e) {
      done(e)
    }
    // const gql2 = new GraphQLTransport('testing')
    // await gql2.login(undefined, gqlToken)
    // expect(gql2.connected).toBe(true)
    // expect(gql2.connecting).toBe(false)
    // await gql2.remove()
  })

  // for some reason this allows console.log calls in tests to show up before exiting.
  // I think if there are multiple tests in this file then console.logs show up without this afterAll hack.
  afterAll(async () => {
    await sleep(500)
  })
})
