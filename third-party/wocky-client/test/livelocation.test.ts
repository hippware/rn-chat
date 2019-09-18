import {
  createUser,
  fillAndSaveProfile,
  dumpProfile,
  sleep,
  timestamp,
  waitFor,
} from './support/testuser'
import {IWocky} from '../src'
import {getSnapshot} from 'mobx-state-tree'
import {UserActivityType} from '../src/transport/types'

describe('Live Locations', () => {
  let alice: IWocky, bob: IWocky
  let alicesPhone: string

  const theLocation = {
    latitude: 1.1,
    longitude: 2.1,
    accuracy: 1,
    activity: 'on_foot' as UserActivityType,
    activityConfidence: 75,
  }
  const differentLocation = {
    longitude: 1.1,
    latitude: 1.1,
    accuracy: 1,
    activity: 'still' as UserActivityType,
    activityConfidence: 75,
  }

  beforeAll(async () => {
    timestamp()
    jest.setTimeout(30000)

    bob = await createUser()
    alice = await createUser()

    await fillAndSaveProfile(bob, 'bob', 'bob')
    await fillAndSaveProfile(alice, 'alice', 'alice')
    await dumpProfile(bob, 'BOB')
    await dumpProfile(alice, 'ALICE')
  })

  it('make friends, share location', async () => {
    timestamp()
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    alicesPhone = alice.profile!.phoneNumber!
    await alicesBobProfile.invite()
    const bobAlicesProfile = await bob.loadProfile(alice.username!)
    await bobAlicesProfile.invite()
    const date = new Date()
    date.setSeconds(date.getSeconds() + 10)
    // share location
    await bobAlicesProfile.shareLocation(date)
  })

  it('update location', async () => {
    timestamp()
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.location).toBeUndefined()
    // update location
    await bob.setLocation(theLocation)
    await waitFor(() => !!alicesBobProfile.location, 'user location did not arrive')
    expect(getSnapshot(alicesBobProfile.location!)).toEqual(theLocation)
  })

  it('expect live location share notification', async () => {
    timestamp()
    await sleep(3000)
    expect(alice.notifications.length).toBe(1)
    const notification: any = alice.notifications.list[0]
    expect(notification.sharedWith).toBeTruthy()
    expect(notification.sharedWith.id).toBe(bob.profile!.id)
  })

  it('update location2', async () => {
    timestamp()
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.location).toBeTruthy() // location should be defined
    // update location
    await bob.setLocation(differentLocation)
    // wait location to be updated
    await sleep(5000)
    expect(alicesBobProfile.location!.latitude).toBe(differentLocation.latitude)
    expect(alicesBobProfile.location!.longitude).toBe(differentLocation.longitude)
    expect(alicesBobProfile.location!.accuracy).toBe(differentLocation.accuracy)
  })

  it('cancel share and verify', async () => {
    timestamp()
    const bobAlicesProfile = await bob.loadProfile(alice.username!)
    await bobAlicesProfile.cancelShareLocation()
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    // update location
    await bob.setLocation(theLocation)
    // wait location to be updated
    await waitFor(() => alice.notifications.length === 2, 'should be two notifications')
    // check that user still has old location (not updated)
    expect(alicesBobProfile.location!.latitude).toBe(differentLocation.latitude)
    expect(alicesBobProfile.location!.longitude).toBe(differentLocation.longitude)
    expect(alicesBobProfile.location!.accuracy).toBe(differentLocation.accuracy)
  })

  it('expect live location stop share notification', async () => {
    timestamp()
    const notification: any = alice.notifications.list[0]
    expect(notification.sharedEndWith).toBeTruthy()
    expect(notification.sharedEndWith.id).toBe(bob.profile!.id)
  })

  it('logout and login and verify notifications', async () => {
    timestamp()
    await alice.logout()
    alice = await createUser(undefined, alicesPhone)
    await waitFor(() => alice.notifications.length === 2, 'should be two notifications')
    const notification: any = alice.notifications.list[0]
    expect(notification.sharedEndWith).toBeTruthy()
    expect(notification.sharedEndWith.id).toBe(bob.profile!.id)
    const notification2: any = alice.notifications.list[1]
    expect(notification2.sharedWith).toBeTruthy()
    expect(notification2.sharedWith.id).toBe(bob.profile!.id)
  })

  afterAll(async () => {
    try {
      // don't do these in parallel because of https://github.com/hippware/wocky/issues/2083
      await alice.remove()
      await bob.remove()
    } catch (e) {
      // console.log(e)
    }
  })
})
