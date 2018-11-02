import {expect} from 'chai'
import {createXmpp, timestamp} from './support/testuser'
import {GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
const host = 'testing.dev.tinyrobot.com'

// tslint:disable:no-unused-expression no-console no-empty

describe('GraphQL Notifications Subscription', () => {
  let alice: IWocky, bob: IWocky, gqlAlice: GraphQLTransport, gqlBob: GraphQLTransport

  it('gets User Follow notification', async done => {
    try {
      timestamp()
      bob = await createXmpp()
      alice = await createXmpp()
      gqlBob = new GraphQLTransport('testing')
      gqlAlice = new GraphQLTransport('testing')
      await Promise.all([
        gqlBob.login(bob.username!, bob.password!, host),
        gqlAlice.login(alice.username!, alice.password!, host),
      ])

      gqlBob.subscribeNotifications()

      // alice follows bob
      const alicesBobProfile = await alice.loadProfile(bob.username!)
      expect(alicesBobProfile.isFollowed).to.be.false
      await alicesBobProfile.follow()
      expect(alicesBobProfile.isFollowed).to.be.true

      when(
        () => !!gqlBob.notification,
        () => {
          timestamp()
          expect(gqlBob.notification.user.id, alicesBobProfile.id)
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })

  after('remove', async done => {
    try {
      await Promise.all([alice.remove(), bob.remove()])
    } catch (e) {
      console.log(e)
    }
    done()
  })
})
