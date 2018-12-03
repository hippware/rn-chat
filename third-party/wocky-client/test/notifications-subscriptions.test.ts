import {createUser, timestamp} from './support/testuser'
import {IWocky} from '../src'
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
        expect(bob.notifications.list[0].user.id).toBeTruthy()
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
