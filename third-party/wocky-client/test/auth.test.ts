import {GraphQLTransport} from 'wocky-client'
import {sleep} from './support/testuser'

// import {createXmpp, timestamp, testFile, expectedImage, waitFor} from './support/testuser'
// import {IWocky} from '../src/store/Wocky'
// import {IBot} from '../src/model/Bot'
// import fs from 'fs'

// let user1: IWocky, user2: IWocky
// let bot: IBot, bot2: IBot, user2bot: IBot
// let user1phone: string, user2phone: string

describe('GraphQL auth', () => {
  it('registers via GraphQL', async () => {
    const gql = new GraphQLTransport('testing', 'host', 'version', 'os', 'deviceName')
    // const transport = new HybridTransport(xmppTransport, gql)
    const result: any = await gql.register()
    console.log('& in test result', result)
    expect(result.data).toBeTruthy()
  })
  it('tests auth via HTTP header (not web sockets)', async () => {
    // todo
  })
  afterAll(async () => {
    await sleep(1000)
  })
})
