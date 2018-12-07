import {createXmpp, timestamp} from './support/testuser'
import {IBot, GraphQLTransport, IWocky} from '../src'
const host = 'testing.dev.tinyrobot.com'

// tslint:disable:no-unused-expression no-console

describe('GraphQL Notifications', () => {
  let alice: IWocky,
    bob: IWocky,
    gqlAlice: GraphQLTransport,
    gqlBob: GraphQLTransport,
    aliceBot: IBot,
    bobsAliceBot: IBot,
    invitationId: any

  it('gets User Follow notification', async () => {
    jest.setTimeout(20000)
    timestamp()
    bob = await createXmpp()
    alice = await createXmpp()
    gqlBob = new GraphQLTransport('testing')
    gqlAlice = new GraphQLTransport('testing')
    await Promise.all([
      gqlBob.login(bob.username!, bob.password!, host),
      gqlAlice.login(alice.username!, alice.password!, host),
    ])

    // alice follows bob
    const alicesBobProfile = await alice.loadProfile(bob.username!)
    await alicesBobProfile.follow()

    // Expected Notification: User follow notification
    await pause(1000)
    const notifications = await gqlBob.loadNotifications({})
    // console.log('& got notifications', notifications)
    expect(notifications.count).toEqual(1)
    // console.log('& user follow notification? ', typeof notifications.list[0])
    // expect(notifications.list[0].__typename).toEqual('UserFollowNotification')
    expect(notifications.list[0]).toHaveProperty('user')

    // // bob follow alice back
    // const bobsAliceProfile = await bob.loadProfile(alice.username!)
    // expect(bobsAliceProfile.isFollowed).toBe.false
    // await bobsAliceProfile.follow()
    // expect(alicesBobProfile.isFollowed).toBe.true
  })

  it('gets Location Invite notification', async done => {
    try {
      timestamp()

      // alice creates a bot
      aliceBot = await alice.createBot()
      aliceBot.setUserLocation({latitude: 10, longitude: 20, accuracy: 1})
      await aliceBot.update({
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot',
        addressData: {city: 'Los Angeles', country: 'California'},
      })
      await aliceBot.save()

      // alice invites bob to the bot (NOTE: this is different from `share`)
      await gqlAlice.inviteBot(aliceBot.id, [bob.username!])
      await pause(1000)
      const notifications = await gqlBob.loadNotifications({})
      expect(notifications.count).toEqual(2)
      expect(notifications.list[0]).toHaveProperty('sender')
      expect(notifications.list[0].sender).toEqual(alice.username)
      invitationId = notifications.list[0].inviteId
      expect(notifications.list[0].bot.invitation.id).toEqual(invitationId)
      expect(notifications.list[0].bot.invitation.accepted).toEqual(false)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets Location Invite Accept notification', async done => {
    try {
      timestamp()
      await gqlBob.inviteBotReply(
        invitationId,
        {latitude: 10.1, longitude: 20.1, accuracy: 5},
        true
      )
      await pause(1000)
      const notifications = await gqlAlice.loadNotifications({})
      expect(notifications.count).toEqual(1)
      expect(notifications.list[0]).toHaveProperty('sender')
      expect(notifications.list[0].sender).toEqual(bob.username)
      expect(notifications.list[0].bot.invitation.id).toEqual(invitationId)
      expect(notifications.list[0].bot.invitation.accepted).toEqual(true)
      await aliceBot.guests.load()
      expect(aliceBot.guestsSize).toEqual(2) // bob is now a guest
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets User Comment notification', async done => {
    try {
      timestamp()

      // bob comments on alice's bot
      bobsAliceBot = await bob.loadBot(aliceBot.id)
      const post = bobsAliceBot.createPost('cool bot!')
      await post.publish()

      await pause(1000)
      const notifications = await gqlAlice.loadNotifications({})
      // console.log('& got botitem notifications for alice', notifications)
      expect(notifications.count).toEqual(2)
      expect(notifications.list[0]).toHaveProperty('post')
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets Geofence Entry notification', async done => {
    try {
      timestamp()

      await gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1})
      await gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1})

      // Expected Notification: Geofence Entry
      await pause(1000)
      const notifications = await gqlAlice.loadNotifications({})
      expect(notifications.count).toEqual(3)
      expect(notifications.list[0]).toHaveProperty('isEnter')
      expect(notifications.list[0].isEnter).toBe(true)
      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1})
      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1})
      done()
    } catch (e) {
      done(e)
    }
  })

  it('gets Geofence Exit notification', async done => {
    try {
      timestamp()

      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1})
      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1})

      // Expected Notification: Geofence Exit
      await pause(1000)
      const notifications = await gqlAlice.loadNotifications({})
      expect(notifications.count).toEqual(4)
      expect(notifications.list[0]).toHaveProperty('isEnter')
      expect(notifications.list[0].isEnter).toBe(false)
      done()
    } catch (e) {
      done(e)
    }
  })

  afterAll(async done => {
    try {
      // don't do these in parallel because of https://github.com/hippware/wocky/issues/2083
      await alice.remove()
      await bob.remove()
    } catch (e) {
      console.log(e)
    }
    done()
  })
})

async function pause(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
