import {expect} from 'chai'
import {createXmpp, waitFor, timestamp} from './support/testuser'
import {IBot, GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
const host = 'testing.dev.tinyrobot.com'

describe('Notifications', () => {
  it('gets notifications from GraphQL', async done => {
    let alice: IWocky, bob: IWocky, notifications
    try {
      timestamp()
      bob = await createXmpp()
      alice = await createXmpp()
      const gqlBob = new GraphQLTransport('testing')
      const gqlAlice = new GraphQLTransport('testing')
      await gqlBob.login(bob.username!, bob.password!, host)
      await gqlAlice.login(alice.username!, alice.password!, host)

      // alice follows bob
      const alicesBobProfile = await alice.loadProfile(bob.username!)
      await alicesBobProfile.follow()

      // Expected Notification: User follow notification
      await pause(1000)
      notifications = await gqlBob.loadNotifications()
      // console.log('& got notifications', notifications)
      expect(notifications.count).to.equal(1)
      // console.log('& user follow notification? ', typeof notifications.list[0])
      // expect(notifications.list[0].__typename).to.equal('UserFollowNotification')
      expect(notifications.list[0]).to.haveOwnProperty('user')

      // // bob follow alice back
      // const bobsAliceProfile = await bob.loadProfile(alice.username!)
      // expect(bobsAliceProfile.isFollowed).to.be.false
      // await bobsAliceProfile.follow()
      // expect(alicesBobProfile.isFollowed).to.be.true

      // alice creates a bot
      const aliceBot = await alice.createBot()
      await aliceBot.update({
        public: true,
        location: {latitude: 1.1, longitude: 2.1},
        title: 'Test bot',
        geofence: true,
        addressData: {city: 'Los Angeles', country: 'California'},
      })
      await aliceBot.save()

      // bob comments on alice's bot
      const bobsAliceBot: IBot = await bob.loadBot(aliceBot.id, null)
      const post = bobsAliceBot.createPost('cool bot!')
      await post.publish()

      // Expected Notification: User Comment - @user commented on Location Name
      await pause(1000)
      notifications = await gqlAlice.loadNotifications()
      // console.log('& got botitem notifications for alice', notifications)
      expect(notifications.count).to.equal(1)
      expect(notifications.list[0]).to.haveOwnProperty('post')

      // Location Invite -	@user invited you to follow Location Name
      // alice invites bob to the bot (NOTE: this is different from `share`)
      const inviteId = await gqlAlice.inviteBot(aliceBot.id, bob.username)
      // console.log('& invite id', inviteId)

      await pause(1000)
      notifications = await gqlBob.loadNotifications()
      expect(notifications.count).to.equal(2)
      expect(notifications.list[0]).to.haveOwnProperty('sender')
      expect(notifications.list[0].sender.id).to.equal(alice.username)

      await gqlBob.inviteBotReply(inviteId, true)

      // TODO: remove this after Bernard fixes on the backend
      await bobsAliceBot.subscribeGeofence()

      // Expected Notification: Location Accept -	@user accepted your invite to Location Name
      await pause(1000)
      notifications = await gqlAlice.loadNotifications()
      expect(notifications.count).to.equal(2)
      // expect(notifications[0].__typename).to.equal('InvitationResponseNotification')
      expect(notifications.list[0]).to.haveOwnProperty('sender')
      expect(notifications.list[0].sender.id).to.equal(bob.username)

      await gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'})
      await gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'})

      // Expected Notification: Geofence Entry
      await pause(1000)
      notifications = await gqlAlice.loadNotifications()
      expect(notifications.count).to.equal(3)
      expect(notifications.list[0]).to.haveOwnProperty('isEnter')
      expect(notifications.list[0].isEnter).to.be.true

      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1, resource: 'testing'})
      await gqlBob.setLocation({accuracy: 1, longitude: 1.1, latitude: 1.1, resource: 'testing'})

      // Expected Notification: Geofence Exit
      await pause(1000)
      notifications = await gqlAlice.loadNotifications()
      expect(notifications.count).to.equal(4)
      expect(notifications.list[0]).to.haveOwnProperty('isEnter')
      expect(notifications.list[0].isEnter).to.be.false
    } catch (e) {
      done(e)
    } finally {
      await alice.remove()
      await bob.remove()
      done()
    }
  })

  // it('check user follow notification subscription', async done => {
  //   try {
  //     timestamp()
  //     await gql.subscribeNotifications()

  //     // have user2 follow user1
  //     const profile2 = await user2.loadProfile(user.username!)
  //     expect(profile2.isFollowed).to.be.false
  //     await profile2.follow()
  //     expect(profile2.isFollowed).to.be.true

  //     when(
  //       () => !!gql.notification,
  //       () => {
  //         timestamp()
  //         // console.log('& got notification from subscription!')
  //         // console.log(gql.notification)
  //         // expect(gql.botVisitor.bot.id).to.equal(bot.id)
  //         done()
  //       }
  //     )

  //     // // have user1 follow user2 back
  //     // const userprofile2 = await user.loadProfile(user2.username!)
  //     // expect(userprofile2.isFollowed).to.be.false
  //     // await userprofile2.follow()
  //     // expect(userprofile2.isFollowed).to.be.true

  //     // // user2 shares a new bot with user1
  //     // const user2bot = await user2.createBot()
  //     // await user2bot.update({
  //     //   public: true,
  //     //   location: {latitude: 1.1, longitude: 2.1},
  //     //   title: 'Test bot',
  //     //   geofence: true,
  //     //   addressData: {city: 'Los Angeles', country: 'California'},
  //     // })
  //     // await user2bot.save()
  //     // // user2bot.share([user.username!], '', 'geofence share')\
  //     // user2bot.shareToFollowers('share!!!')

  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // after('remove', async done => {
  //   try {
  //     await user.remove()
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   try {
  //     await user2.remove()
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   done()
  // })
})

async function pause(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
