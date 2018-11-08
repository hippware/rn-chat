import {createXmpp, timestamp} from './support/testuser'
import {GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
const host = 'testing.dev.tinyrobot.com'

// tslint:disable:no-console

describe('GraphQL Notifications Subscription', () => {
  let alice: IWocky, bob: IWocky, gqlAlice: GraphQLTransport, gqlBob: GraphQLTransport

  it('gets User Follow notification', async done => {
    jest.setTimeout(20000)
    timestamp()
    bob = await createXmpp()
    alice = await createXmpp()
    gqlBob = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
    gqlAlice = new GraphQLTransport('testing', host, 'version', 'os', 'deviceName')
    await Promise.all([
      gqlBob.loginGQL({userId: bob.username!, token: bob.password!}),
      gqlAlice.loginGQL({userId: alice.username!, token: alice.password!}),
    ])

    gqlBob.subscribeNotifications()

    // alice follows bob
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.isFollowed).toBe(false)
    await alicesBobProfile.follow()
    expect(alicesBobProfile.isFollowed).toBe(true)

    when(
      () => !!gqlBob.notification,
      () => {
        timestamp()
        expect(gqlBob.notification.user.id).toBeTruthy()
        // , alicesBobProfile.id)
        done()
      }
    )
  })

  afterAll(async () => {
    try {
      await Promise.all([alice.remove(), bob.remove()])
    } catch (e) {
      console.log(e)
    }
  })
})
