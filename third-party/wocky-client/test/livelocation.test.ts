import {createUser, waitFor, sleep} from './support/testuser'
import {IWocky} from '../src'

describe('Live Locations', () => {
  let alice: IWocky, bob: IWocky

  const theLocation = {latitude: 1.1, longitude: 2.1, accuracy: 1}
  const differentLocation = {longitude: 1.1, latitude: 1.1, accuracy: 1}

  beforeAll(async () => {
    jest.setTimeout(20000)
    console.log('CREATE FIRST USER')
    bob = await createUser()
    console.log('CREATE SECOND USER')
    alice = await createUser()
    console.log('CREATION IS COMPLETE')
  })

  it('make friends, share location', async () => {
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    await alicesBobProfile.invite()
    const bobAlicesProfile = await bob.loadProfile(alice.username!)
    await bobAlicesProfile.invite()
    const date = new Date()
    date.setSeconds(date.getSeconds() + 10)
    // share location
    await bobAlicesProfile.shareLocation(date)
  })

  it('update location', async () => {
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.location).toBeUndefined()
    // update location
    await bob.setLocation(theLocation)
    // wait location to be updated
    await waitFor(() => !!alicesBobProfile.location)
    expect(alicesBobProfile.location!.latitude).toBe(theLocation.latitude)
    expect(alicesBobProfile.location!.longitude).toBe(theLocation.longitude)
    expect(alicesBobProfile.location!.accuracy).toBe(theLocation.accuracy)
  })

  it('update location2', async () => {
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    expect(alicesBobProfile.location).toBeTruthy() // location should be defined
    // update location
    await bob.setLocation(differentLocation)
    // wait location to be updated
    await sleep(2000)
    expect(alicesBobProfile.location!.latitude).toBe(differentLocation.latitude)
    expect(alicesBobProfile.location!.longitude).toBe(differentLocation.longitude)
    expect(alicesBobProfile.location!.accuracy).toBe(differentLocation.accuracy)
  })

  it('cancel share and verify', async () => {
    const bobAlicesProfile = await bob.loadProfile(alice.username!)
    await bobAlicesProfile.cancelShare()
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    // update location
    await bob.setLocation(theLocation)
    // wait location to be updated
    await sleep(2000)
    // check that user still has old location (not updated)
    expect(alicesBobProfile.location!.latitude).toBe(differentLocation.latitude)
    expect(alicesBobProfile.location!.longitude).toBe(differentLocation.longitude)
    expect(alicesBobProfile.location!.accuracy).toBe(differentLocation.accuracy)
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
