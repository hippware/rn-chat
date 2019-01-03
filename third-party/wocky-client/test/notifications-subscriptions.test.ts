import {createUser, timestamp} from './support/testuser'
import {IWocky, IEventUserFollow} from '../src'
import {when} from 'mobx'

// tslint:disable:no-console
describe('GraphQL Notifications Subscription', () => {
  let alice: IWocky, bob: IWocky

  it('gets User Follow notification', async done => {
    timestamp()
    bob = await createUser()
    alice = await createUser()

    // alice follows bob
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.isFollowed).toBe(false)
    await alicesBobProfile.follow()
    expect(alicesBobProfile.isFollowed).toBe(true)

    when(
      () => bob.notifications.length > 0,
      () => {
        timestamp()
        console.log('NOTIFICATIONS:', JSON.stringify(bob.notifications))
        expect((bob.notifications.list[0] as IEventUserFollow).user.id).toBeTruthy()
        done()
      }
    )
  })

  afterAll(async () => {
    try {
      // don't do these in parallel because of https://github.com/hippware/wocky/issues/2083
      await alice.remove()
      await bob.remove()
    } catch (e) {
      console.log(e)
    }
  })
})
