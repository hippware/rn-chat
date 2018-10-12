import {expect} from 'chai'
import {createXmpp, sleep, waitFor, timestamp} from './support/testuser'
import {IWocky, IProfile, IOwnProfile} from '../src'
import {IBot} from '../src/model/Bot'

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, loadedBot: IBot

const insideBotLocation = {accuracy: 1, longitude: 2.1, latitude: 1.1, resource: 'testing'}
const outsideBotLocation = {accuracy: 1, longitude: 22.1, latitude: 1.1, resource: 'testing'}

async function enterBot(user: IWocky) {
  await user.setLocation(insideBotLocation)
  user.setLocation(insideBotLocation)
  await sleep(500)
}

async function exitBot(user: IWocky) {
  await user.setLocation(outsideBotLocation)
  user.setLocation(outsideBotLocation)
  await sleep(500)
}

describe('Geofence2', () => {
  it('create user1', async done => {
    try {
      timestamp()
      user1 = await createXmpp()
      console.log('user1 credentials', user1.username, user1.password)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create user2', async done => {
    try {
      timestamp()
      user2 = await createXmpp()
      console.log('user2 credentials', user2.username, user2.password)
      timestamp()
      await waitFor(() => user1.profile !== null)
      await waitFor(() => user2.profile !== null)
      const user1phone = user1.profile.phoneNumber
      const user2phone = user2.profile.phoneNumber
      await user1.profile!.update({
        handle: 'd' + user1phone.replace('+', ''),
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      await user2.profile!.update({
        handle: 'e' + user2phone.replace('+', ''),
        firstName: 'name2',
        lastName: 'lname2',
        email: 'a2@aa.com',
      })
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('user2 follows user1', async done => {
    try {
      timestamp()
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('user2 goes to user1 location', async done => {
    try {
      timestamp()
      await enterBot(user2)
      await enterBot(user1)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('user1 creates a geofence bot at this location', async done => {
    try {
      timestamp()
      bot = await user1.createBot()
      await bot.update({
        userLocation: insideBotLocation,
        location: insideBotLocation,
        title: 'Test bot',
        addressData: {city: 'Koper', country: 'Slovenia'},
      })
      // console.log('bot updated', bot.toJSON())
      // expect(bot.visitorsSize).to.equal(1)
      // expect(bot.guestsSize).to.equal(1)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('invite user2 to bot', async done => {
    try {
      await bot.invite([user2.username])
      done()
    } catch (e) {
      done(e)
    }
  })
  it('user2 receives bot invite', async done => {
    try {
      await waitFor(() => user2.notifications.length === 1)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('accept invite', async done => {
    try {
      timestamp()
      loadedBot = await user2.loadBot(bot.id, null)
      expect(loadedBot.visitorsSize === 1)
      await loadedBot.acceptInvitation()
      // server subscribes automatically on invite accept
      expect(loadedBot.guest).to.equal(true)

      // TODO: should we expect a bot visitor message on the graphql subscription?
      await waitFor(() => loadedBot.visitorsSize === 2)
      done()
    } catch (e) {
      done(e)
    }
  })
  after('remove', async done => {
    try {
      await user2.removeBot(loadedBot.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot.id)
    } catch (e) {}
    try {
      await user1.remove()
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    console.log('after done')
    done()
  })
})
