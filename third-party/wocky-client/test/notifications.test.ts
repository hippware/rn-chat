import {createUser, sleep, waitFor} from './support/testuser'
import {IWocky, IBot, ILocation, IEventBotInvite, IEventBotGeofence} from '../src'

describe('Notifications (static)', () => {
  let alice: IWocky, bob: IWocky, aliceBot: IBot, bobsAliceBot: IBot

  const theLocation = {latitude: 1.1, longitude: 2.1, accuracy: 1}
  const differentLocation = {longitude: 1.1, latitude: 1.1, accuracy: 1}

  beforeAll(async () => {
    jest.setTimeout(10000)
    bob = await createUser()
    alice = await createUser()
  })

  beforeEach(async () => {
    bob.notifications.refresh()
    alice.notifications.refresh()
  })

  it('update profiles with handles', async () => {
    await alice.profile!.update({
      handle: 'a' + alice.profile!.phoneNumber!.replace('+', ''),
      firstName: 'alice',
      lastName: 'alerson',
    })
    await alice.profile!.save()
    await bob.profile!.update({
      handle: 'b' + bob.profile!.phoneNumber!.replace('+', ''),
      firstName: 'bob',
      lastName: 'boberts',
    })
    await bob.profile!.save()
  })

  it('make them friends', async () => {
    const aliceBobProfile = await alice.loadProfile(bob.username!)
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    await aliceBobProfile.invite()
    await waitFor(() => bobAliceProfile.hasSentInvite)
    await bobAliceProfile.invite() // become friends!
  })

  it('gets User Follow notification', async () => {
    // alice follows bob
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    await alicesBobProfile.invite()
    // Expected Notification: User follow notification
    await sleep(1000)
    bob.notifications.setMode(2) // requests tab
    await bob.notifications.load()
    expect(bob.notifications.count).toEqual(1)
    expect(bob.notifications.list[0]).toHaveProperty('user')
  })

  it('gets Location Invite notification', async () => {
    aliceBot = await alice.createBot()
    aliceBot.setUserLocation({latitude: 10, longitude: 20, accuracy: 1})
    await aliceBot.update({
      location: theLocation,
      title: 'Test bot',
      addressData: {city: 'Los Angeles', country: 'California'},
    })
    await aliceBot.save()

    // alice invites bob to the bot (NOTE: this is different from `share`)
    await aliceBot.invite([bob.username!])
    await sleep(1000)
    await bob.notifications.load()
    expect(bob.notifications.count).toEqual(2)
    const invite: IEventBotInvite = bob.notifications.list[0] as IEventBotInvite
    expect(invite).toHaveProperty('sender')
    expect(invite.sender.id).toEqual(alice.username)
    expect(invite.bot!.invitation!.accepted).toEqual(false)
  })

  it('gets Location Invite Accept notification', async () => {
    bobsAliceBot = await bob.loadBot(aliceBot.id)
    await bobsAliceBot.acceptInvitation({
      latitude: 10.1,
      longitude: 20.1,
      accuracy: 5,
    } as ILocation)
    await sleep(1000)
    await alice.notifications.load()
    expect(alice.notifications.count).toEqual(1)
    const acceptance: IEventBotInvite = alice.notifications.list[0] as IEventBotInvite
    expect(acceptance).toHaveProperty('sender')
    expect(acceptance.sender.id).toEqual(bob.username)
    expect(acceptance.bot!.invitation!.accepted).toEqual(true)
    await aliceBot.subscribers.load()
    expect(aliceBot.subscribers.list.length).toEqual(1) // bob is now a subscriber
  })

  it('gets User Comment notification', async () => {
    // bob comments on alice's bot
    bobsAliceBot = await bob.loadBot(aliceBot.id)
    const post = bobsAliceBot.createPost('cool bot!')
    await post.publish()
    await sleep(1000)
    await alice.notifications.load()
    expect(alice.notifications.count).toEqual(2)
    expect(alice.notifications.list[0]).toHaveProperty('post')
  })

  it('gets Geofence Entry notification', async () => {
    await bob.setLocation(theLocation)
    await bob.setLocation(theLocation)

    // Expected Notification: Geofence Entry
    await sleep(1000)
    await alice.notifications.load({force: true})
    expect(alice.notifications.count).toEqual(3)
    const enterNotification = alice.notifications.list[0] as IEventBotGeofence
    expect(enterNotification).toHaveProperty('isEnter')
    expect(enterNotification.isEnter).toBe(true)
    await bob.setLocation(theLocation)
    await bob.setLocation(theLocation)
  })

  it('gets Geofence Exit notification', async () => {
    await bob.setLocation(differentLocation)
    await bob.setLocation(differentLocation)

    // Expected Notification: Geofence Exit
    await sleep(1000)
    await alice.notifications.load({force: true})
    expect(alice.notifications.count).toEqual(4)
    const exitNotification: IEventBotGeofence = alice.notifications.list[0] as IEventBotGeofence
    expect(exitNotification).toHaveProperty('isEnter')
    expect(exitNotification.isEnter).toBe(false)
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
