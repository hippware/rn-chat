import {createUser, fillAndSaveProfile, dumpProfile, waitFor} from './support/testuser'
import {IWocky, FriendShareTypeEnum} from '../src'
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
    latitude: 11.1,
    longitude: 11.1,
    accuracy: 1,
    activity: 'on_foot' as UserActivityType,
    activityConfidence: 100,
  }
  const differentLocation2 = {
    latitude: 11.2,
    longitude: 11.2,
    accuracy: 1,
    activity: 'on_foot' as UserActivityType,
    activityConfidence: 100,
  }

  // const theLocation = {latitude: 1.1, longitude: 2.1, accuracy: 1}
  // const differentLocation = {longitude: 1.1, latitude: 1.1, accuracy: 1}

  beforeAll(async () => {
    jest.setTimeout(30000)
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
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.DISABLED)
    expect(friend!.sharesLocation).toBeFalsy()
    await aliceBobProfile.shareLocationUpdate(FriendShareTypeEnum.ALWAYS)
    await bobAliceProfile.shareLocationUpdate(FriendShareTypeEnum.ALWAYS)

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
    expect(friend!.ownShareType).toEqual(FriendShareTypeEnum.ALWAYS)
    expect(friend!.sharesLocation).toBeTruthy()

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

    aliceBobProfile = await alice.loadProfile(bob.username!)
    await aliceBobProfile.shareLocationUpdate(FriendShareTypeEnum.NEARBY)
    await bobAliceProfile.shareLocationUpdate(FriendShareTypeEnum.NEARBY)
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.NEARBY)
    // re-login and verify data again
    await alice.logout()
    expect(alice.profile).toBeNull()
    alice = await createUser(undefined, phoneNumber)
    expect(alice.profile).toBeDefined()
    friend = alice.profile!.friends.get(bob.profile!.id)
    expect(friend!.shareType).toEqual(FriendShareTypeEnum.NEARBY)
    expect(friend!.sharesLocation).toBeFalsy()

    // check nearby sharing
    await alice.setLocation(theLocation)
    await bob.setLocation(theLocation)

    receivedLocation = {...friend!.location!}
    delete receivedLocation.createdAt
    delete receivedLocation.isCurrent
    expect(receivedLocation).toEqual(theLocation)
    await waitFor(() => !!friend!.sharesLocation, 'start sharing location')
    // change location
    await bob.setLocation(differentLocation)
    // hm, nothin happened, try again
    await bob.setLocation(differentLocation2)
    // TODO:
    await waitFor(() => !friend!.sharesLocation, 'end sharing location')
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
