import {expect} from 'chai'
import {createXmpp, waitFor, timestamp} from './support/testuser'
import {IBot, GraphQLTransport, IWocky} from '../src'
import {when} from 'mobx'
// use http link for now but need websockets for subscriptions later? https://www.apollographql.com/docs/link/links/ws.html

// // User "111" on Staging
// const userId = 'e51c7f0a-18cc-11e8-b1e9-0a580a0206dc'
// const token = '$T$AFNkdiDaQHC/lI4o2xzmmf4pQ+LaHF39STooScbv6E4='

const host = 'testing.dev.tinyrobot.com'
let gql: GraphQLTransport, user, user2: IWocky
let bot, bot2: IBot
let date: Date
let user1phone: string
// const GQL = new GraphQLTransport('testing', 'testing.dev.tinyrobot.com', userId, token)

describe('GraphQL', () => {
  // it('get user1 credential via XMPP', async done => {
  //   try {
  //     timestamp()
  //     user = await createXmpp()
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('get user2 credentials via XMPP', async done => {
  //   try {
  //     timestamp()
  //     user2 = await createXmpp()
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('update profile', async done => {
  //   try {
  //     timestamp()
  //     await waitFor(() => user.profile !== null && user.profile.phoneNumber !== null)
  //     user1phone = user.profile.phoneNumber
  //     await user.profile!.update({
  //       handle: 'a' + user1phone.replace('+', ''),
  //       firstName: 'name1',
  //       lastName: 'lname1',
  //       email: 'a@aa.com',
  //     })
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('login via graphql and set user location', async done => {
  //   try {
  //     timestamp()
  //     gql = new GraphQLTransport('testing')
  //     await gql.login(user.username!, user.password!, host)
  //     await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
  //     await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('loads profile', async done => {
  //   try {
  //     timestamp()
  //     const profile = await gql.loadProfile(user.username!)
  //     // console.log('PROFILE:', JSON.stringify(profile))
  //     expect(profile.id).to.equal(user.username)
  //     expect(profile.email).to.equal('a@aa.com')
  //     expect(profile.phoneNumber).to.equal(user1phone)
  //     expect(profile.__typename).to.equal('CurrentUser')
  //     expect(profile.hidden.enabled).to.equal(false)
  //     expect(profile.hidden.expires).to.equal(null)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('hide user', async done => {
  //   try {
  //     timestamp()
  //     date = new Date(Date.now() + 1000)
  //     await gql.hideUser(true, date)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('loads profile again ', async done => {
  //   try {
  //     timestamp()
  //     const profile = await gql.loadProfile(user.username!)
  //     expect(profile.hidden.expires.getTime()).to.equal(date.getTime())
  //     expect(profile.hidden.enabled).to.equal(true)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('unhide user', async done => {
  //   try {
  //     timestamp()
  //     await gql.hideUser(false)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('loads profile again ', async done => {
  //   try {
  //     timestamp()
  //     const profile = await gql.loadProfile(user.username!)
  //     expect(profile.hidden.expires).to.be.null
  //     expect(profile.hidden.enabled).to.equal(false)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('loads other profile', async done => {
  //   try {
  //     timestamp()
  //     const profile = await gql.loadProfile(user2.username!)
  //     // console.log('PROFILE:', JSON.stringify(profile))
  //     expect(profile.id).to.equal(user2.username)
  //     expect(profile.email).to.be.undefined
  //     expect(profile.phoneNumber).to.be.undefined
  //     expect(profile.__typename).to.equal('OtherUser')
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('gets some bots', async done => {
  //   try {
  //     timestamp()
  //     bot = await user.createBot()
  //     await bot.update({
  //       public: true,
  //       location: {latitude: 1.1, longitude: 2.1},
  //       title: 'Test bot',
  //       geofence: true,
  //       addressData: {city: 'Koper', country: 'Slovenia'},
  //     })
  //     bot2 = await user.createBot()
  //     await bot2.update({
  //       public: true,
  //       location: {latitude: 1.2, longitude: 2.2},
  //       title: 'Test bot2',
  //       geofence: false,
  //       addressData: {city: 'New York', country: 'US'},
  //     })
  //     const bots = await gql.loadOwnBots(user.username!, null, 1)
  //     // console.log('bots', bots)
  //     expect(bots.count).to.equal(2)
  //     expect(bots.list.length).to.equal(1)
  //     expect(bots.list[0].title).to.equal('Test bot2')
  //     const bots2 = await gql.loadOwnBots(user.username!, bots.cursor, 1)
  //     // console.log('bots', bots2)
  //     expect(bots2.count).to.equal(2)
  //     expect(bots2.list.length).to.equal(1)
  //     expect(bots2.list[0].title).to.equal('Test bot')
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('check subscription arrive', async done => {
  //   try {
  //     timestamp()
  //     await gql.subscribeBotVisitors()
  //     await gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
  //     gql.setLocation({latitude: 1.1, longitude: 2.1, accuracy: 1, resource: 'testing'})
  //     when(
  //       () => !!gql.botVisitor && gql.botVisitor.action === 'ARRIVE',
  //       () => {
  //         timestamp()
  //         expect(gql.botVisitor.bot.id).to.equal(bot.id)
  //         expect(gql.botVisitor.visitor.id).to.equal(user.profile.id)
  //         expect(gql.botVisitor.bot.visitors[0].id).to.equal(user.profile.id)
  //         expect(gql.botVisitor.bot.visitors[0].handle).to.equal(user.profile.handle)
  //         expect(gql.botVisitor.bot.visitors[0].firstName).to.equal(user.profile.firstName)
  //         expect(gql.botVisitor.bot.visitors[0].lastName).to.equal(user.profile.lastName)
  //         expect(gql.botVisitor.action).to.equal('ARRIVE')
  //         done()
  //       }
  //     )
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('check subscription exit', async done => {
  //   try {
  //     timestamp()
  //     await gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
  //     gql.setLocation({latitude: 0, longitude: 0, accuracy: 1, resource: 'testing'})
  //     when(
  //       () => !!gql.botVisitor && gql.botVisitor.action === 'DEPART',
  //       () => {
  //         expect(gql.botVisitor.bot.id).to.equal(bot.id)
  //         expect(gql.botVisitor.visitor.id).to.equal(user.profile.id)
  //         expect(gql.botVisitor.action).to.equal('DEPART')
  //         done()
  //       }
  //     )
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('load bot', async done => {
  //   try {
  //     timestamp()
  //     const loaded = await gql.loadBot(bot.id, bot.server)
  //     expect(loaded.title).to.equal(bot.title)
  //     expect(loaded.geofence).to.equal(bot.geofence)
  //     expect(loaded.guest).to.equal(true, 'user should be a guest of the bot')
  //     expect(loaded.id).to.equal(bot.id)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  it('gets notifications', async done => {
    let alice, bob, notifications
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
      notifications = await gqlBob.getNotifications()
      console.log('& got notifications', notifications)
      expect(notifications.length).to.equal(1)
      expect(notifications[0].__typename).to.equal('UserFollowNotification')

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
      const bobsAliceBot = await bob.loadBot(aliceBot.id)
      const post = bobsAliceBot.createPost('cool bot!')
      await post.publish()

      // Expected Notification: User Comment - @user commented on Location Name
      await pause(1000)
      notifications = await gqlAlice.getNotifications()
      // console.log('& got notifications for alice', notifications)
      // expect(notifications.length).to.equal(1)
      expect(notifications[0].__typename).to.equal('BotItemNotification')

      // Location Invite -	@user invited you to follow Location Name
      // alice invites bob to the bot (NOTE: this is different from `share`)
      await gqlAlice.inviteBot(aliceBot.id, bob.username)

      await pause(1000)
      notifications = await gqlBob.getNotifications()
      expect(notifications.length).to.equal(2)
      expect(notifications[0].__typename).to.equal('InvitationNotification')

      // Location Accept -	@user accepted your invite to Location Name
      // TODO: get the notification id from bob's notifications in order to accept/reject
      // also, Bernard will add in the id to the BotInvitePayload

      // Expected Notification: Geofence Entry
      await Promise.all([
        gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'}),
        gqlBob.setLocation({accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'}),
      ])

      // Expected Notification: Geofence Exit
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
