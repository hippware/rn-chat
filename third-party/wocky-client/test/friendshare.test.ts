import {createUser, fillAndSaveProfile, dumpProfile, waitFor} from './support/testuser'
import {IWocky, FriendShareTypeEnum, DefaultFriendShareConfig} from '../src'
import {UserActivityType} from '../src/transport/types'

describe('Friend Share', () => {
  let alice: IWocky, bob: IWocky
  const theLocation = {
    latitude: 1.5,
    longitude: 2.1,
    accuracy: 3,
    activity: 'on_foot' as UserActivityType,
    activityConfidence: 75,
  }
  const differentLocation = {
    latitude: 1.1,
    longitude: 1.1,
    accuracy: 1,
    activity: 'still' as UserActivityType,
    activityConfidence: 75,
  }

  // const theLocation = {latitude: 1.1, longitude: 2.1, accuracy: 1}
  // const differentLocation = {longitude: 1.1, latitude: 1.1, accuracy: 1}

  beforeAll(async () => {
    jest.setTimeout(10000)
    bob = await createUser()
    alice = await createUser()
  })

  it('update profiles with handles', async () => {
    await fillAndSaveProfile(alice, 'alice', 'alerson')
    await fillAndSaveProfile(bob, 'bob', 'boberts')
    await dumpProfile(alice, 'ALICE')
    await dumpProfile(bob, 'BOB')
  })

  it('make them friends and share location', async () => {
    let aliceBobProfile = await alice.loadProfile(bob.username!)
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    expect(aliceBobProfile!.isFriend).toBeFalsy()
    await aliceBobProfile.invite()
    // await waitFor(() => bobAliceProfile.hasSentInvite, 'user invitation notification')
    await bobAliceProfile.invite() // become friends!
    // check friend data
    await waitFor(() => aliceBobProfile!.isFriend, 'should be friend')

    let friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend).toBeDefined()
    expect(friend!.shareConfig).toEqual(DefaultFriendShareConfig)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.DISABLED)
    await aliceBobProfile.shareLocationUpdate(FriendShareTypeEnum.ALWAYS)

    // check friend data right after setting (local testing)
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.ALWAYS)

    // re-login and verify data
    const phoneNumber = alice.profile!.phoneNumber!
    await alice.logout()
    expect(alice.profile).toBeNull()
    alice = await createUser(undefined, phoneNumber)
    expect(alice.profile).toBeDefined()
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.ALWAYS)

    // check sharing
    await alice.setLocation(theLocation)
    await waitFor(() => !!bobAliceProfile.location, 'user location did not arrive')
    let receivedLocation = {...bobAliceProfile.location!}
    delete receivedLocation.createdAt
    delete receivedLocation.isCurrent
    expect(receivedLocation).toEqual(theLocation)
    await alice.setLocation(differentLocation)
    await waitFor(
      () => bobAliceProfile.location!.latitude === differentLocation.latitude,
      'user location did not arrive'
    )
    receivedLocation = {...bobAliceProfile.location!}
    delete receivedLocation.createdAt
    delete receivedLocation.isCurrent
    expect(receivedLocation).toEqual(differentLocation)

    // check nearby
    const config = {
      notifyCooldown: 200,
      nearbyDistance: 1000,
    }
    aliceBobProfile = await alice.loadProfile(bob.username!)
    await aliceBobProfile.shareLocationUpdate(FriendShareTypeEnum.NEARBY, config)
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.NEARBY)
    expect(friend!.shareConfig).toEqual(config)
    // re-login and verify data again
    await alice.logout()
    expect(alice.profile).toBeNull()
    alice = await createUser(undefined, phoneNumber)
    expect(alice.profile).toBeDefined()
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.NEARBY)
    expect(friend!.shareConfig).toEqual(config)
  })

  afterAll(async () => {
    try {
      // removing users will remove their bots
      // don't do these in parallel because of https://github.com/hippware/wocky/issues/2083
      await alice.remove()
      await bob.remove()
    } catch (e) {
      // console.log(e)
    }
  })
})
