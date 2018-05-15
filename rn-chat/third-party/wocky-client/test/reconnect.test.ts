import {GraphQLTransport} from '../src'

describe('GraphQL', () => {
  it('test connection', async done => {
    try {
      const gql = new GraphQLTransport('testing')
      gql.host = 'testing.dev.tinyrobot.com'
      for (let i = 0; i < 3; i++) {
        console.log('AUTHENTICATED: ', await gql.login())
        await gql.disconnect()
      }
      done()
    } catch (e) {
      done(e)
    }
  })
})
