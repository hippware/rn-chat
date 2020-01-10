import {createUser, fillAndSaveProfile, dumpProfile, sleep} from './support/testuser'
import {IWocky, FriendShareTypeEnum} from '../src'

describe('Friend Share', () => {
  let alice: IWocky, bob: IWocky

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
    const aliceBobProfile = await alice.loadProfile(bob.username!)
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    await aliceBobProfile.invite()
    // await waitFor(() => bobAliceProfile.hasSentInvite, 'user invitation notification')
    await bobAliceProfile.invite() // become friends!
    await aliceBobProfile.shareLocationUpdate(FriendShareTypeEnum.ALWAYS)
    sleep(2000)
    // TODO: check updated sharing settings & actual location share
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
