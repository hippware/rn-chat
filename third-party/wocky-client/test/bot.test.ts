import {expect} from 'chai'
import {createXmpp, sleep, timestamp, testFile, expectedImage, waitFor} from './support/testuser'
import {IWocky} from '../src/store/Wocky'
import {IBot} from '../src/model/Bot'
const fs = require('fs')

let user1: IWocky, user2: IWocky
let bot: IBot, bot2: IBot, user2bot: IBot, bot3: IBot
let user1phone: string, user2phone: string
const icon = '\u00A9\uFE0F\u00A9'

describe('BotStore', () => {
  it('create user1', async done => {
    try {
      timestamp()
      user1 = await createXmpp()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create user2', async done => {
    try {
      timestamp()
      user2 = await createXmpp()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update profiles', async done => {
    try {
      timestamp()
      await waitFor(() => user1.profile !== null && user1.profile.phoneNumber !== null)
      await waitFor(() => user2.profile !== null && user2.profile.phoneNumber !== null)
      user1phone = user1.profile.phoneNumber
      user2phone = user2.profile.phoneNumber
      const profile1 = await user2.loadProfile(user1.username!)
      await profile1.follow()
      await user1.profile!.update({
        handle: 'a' + user1phone.replace('+', ''),
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      await user2.profile!.update({
        handle: 'a' + user2phone.replace('+', ''),
        firstName: 'name2',
        lastName: 'lname2',
        email: 'a2@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create bot', async done => {
    timestamp()
    try {
      bot = await user1.createBot()
      expect(bot.icon).to.be.empty
      expect(bot.isNew).to.be.true
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update bot', async done => {
    timestamp()
    bot.setUserLocation({latitude: 1, longitude: 2, accuracy: 1})
    await bot.update({
      icon,
      public: false,
      location: {latitude: 1.1, longitude: 2.1},
      title: 'Test bot',
      addressData: {city: 'Koper', country: 'Slovenia'},
    })
    expect(bot.icon).to.be.equal(icon)
    expect(bot.isNew).to.be.false
    expect(bot.title).to.be.equal('Test bot')
    expect(bot.location!.latitude).to.be.equal(1.1)
    expect(bot.location!.longitude).to.be.equal(2.1)
    setTimeout(done, 50)
  })

  it('share bot', async done => {
    timestamp()
    bot.shareToFollowers('hello followers!')
    setTimeout(done, 50)
  })

  it('update bot location', async done => {
    timestamp()
    try {
      await bot.update({
        location: {latitude: 1.3, longitude: 2.3},
        title: 'Test bot!',
      })
      expect(bot.isNew).to.be.false
      expect(bot.title).to.be.equal('Test bot!')
      expect(bot.location!.latitude).to.be.equal(1.3)
      expect(bot.location!.longitude).to.be.equal(2.3)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update bot description', async done => {
    timestamp()
    await bot.update({description: 'New description'})
    expect(bot.description).to.be.equal('New description')
    done()
  })
  it('create bot posts', async done => {
    timestamp()
    try {
      await bot.posts.load()
      expect(bot.posts.list.length).to.be.equal(0)
      const botPost = bot.createPost('hello')
      await botPost.publish()
      const botPost2 = bot.createPost('hello2')
      await botPost2.upload(testFile())
      await botPost2.publish()
      expect(bot.posts.list.length).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('list bots', async done => {
    timestamp()
    try {
      bot.posts.refresh()
      expect(bot.posts.list.length).to.be.equal(0)
      await bot.posts.load()
      expect(bot.posts.list.length).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('upload cover image', async done => {
    try {
      timestamp()
      expect(bot.image).to.be.null
      await bot.upload(testFile())
      expect(bot.image).to.be.not.null
      expect(bot.uploaded).to.be.true
      expect(bot.uploading).to.be.false
      await bot.save()
      await waitFor(() => bot.image!.source !== null)
    } catch (e) {
      done(e)
    }
    try {
      expect(expectedImage()).to.be.equal(fs.readFileSync(bot.image!.source!.uri).toString())
      done()
    } catch (e) {
      done(
        `ERROR comparing content for ${
          bot.image!.source!.uri
        } and ${__dirname}/../img/test-thumbnail.jpg`
      )
    }
  })

  it('load bot', async done => {
    try {
      timestamp()
      const loaded = await user2.loadBot(bot.id, bot.server)
      await waitFor(() => !loaded.loading)
      expect(loaded.icon).to.be.equal(icon)
      expect(loaded.isNew).to.be.false
      expect(loaded.title).to.be.equal('Test bot!')
      expect(loaded.isSubscribed).to.be.false
      expect(loaded.guest).to.be.false
      expect(loaded.visitor).to.be.false
      expect(loaded.location!.latitude).to.be.equal(1.3)
      expect(loaded.location!.longitude).to.be.equal(2.3)
      expect(loaded.error).to.be.empty
      done()
    } catch (e) {
      done(e)
    }
  })

  it('re-login user2', async done => {
    try {
      timestamp()
      await user2.logout()
      user2 = await createXmpp(null, user2phone)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('load subscribed bot with newly logged user2', async done => {
    try {
      timestamp()
      await user2._subscribeBot(bot.id)
      const loaded = await user2.loadBot(bot.id, bot.server)
      await waitFor(() => !loaded.loading)
      expect(loaded.owner).to.be.not.null
      expect(loaded.owner.id).to.be.equal(user1.profile.id)
      expect(loaded.owner.handle).to.be.equal(user1.profile.handle)
      expect(loaded.isNew).to.be.false
      expect(loaded.title).to.be.equal('Test bot!')
      expect(loaded.isSubscribed).to.be.true
      expect(loaded.guest).to.be.true // all bots now are geofence
      expect(loaded.visitor).to.be.false
      expect(loaded.location!.latitude).to.be.equal(1.3)
      expect(loaded.location!.longitude).to.be.equal(2.3)
      expect(loaded.error).to.be.empty
      await user2._unsubscribeBot(bot.id)
      await user2.logout()
      user2 = await createXmpp(null, user2phone)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('create bot2', async done => {
    try {
      timestamp()
      bot2 = await user1.createBot()
      expect(bot2.isNew).to.be.true
      await bot2.update({
        location: {latitude: 1.2, longitude: 2.2},
        title: 'Test bot2',
      })
      expect(bot2.title).to.be.equal('Test bot2')
      expect(bot2.location!.latitude).to.be.equal(1.2)
      expect(bot2.location!.longitude).to.be.equal(2.2)
      setTimeout(done, 50)
    } catch (e) {
      done(e)
    }
  })
  it('get local bots 1', async done => {
    try {
      timestamp()
      const res = await user1.loadLocalBots({
        latitude: 1.2,
        longitude: 2.2,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
      expect(res.length).to.be.equal(2)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('get local bots 2', async done => {
    try {
      timestamp()
      const res = await user1.loadLocalBots({
        latitude: 3.2,
        longitude: 4.2,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
      expect(res.length).to.be.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('list own bots', async done => {
    try {
      timestamp()
      await user1.profile!.ownBots.load()
      expect(user1.profile!.ownBots.list.length).to.be.greaterThan(1)
      expect(user1.profile!.ownBots.list[0].title).to.be.equal('Test bot2')
      expect(user1.profile!.ownBots.list[0].owner).to.be.not.null
      expect(user1.profile!.ownBots.list[0].owner.isOwn).to.be.true
      expect(user1.profile!.ownBots.list[1].title).to.be.equal('Test bot!')
      expect(user1.profile!.ownBots.list[1].location!.latitude).to.be.equal(1.3)
      expect(user1.profile!.ownBots.list[1].location!.longitude).to.be.equal(2.3)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('list subscribed bots for user2', async done => {
    timestamp()
    await user2.profile!.subscribedBots.load()
    expect(user2.profile!.subscribedBots.list.length).to.be.equal(0)
    done()
  })

  it('subscribe user2 for first bot', async done => {
    timestamp()
    try {
      timestamp()
      await user2._subscribeBot(bot.id)
      user2.profile!.subscribedBots.refresh()
      await user2.profile!.subscribedBots.load()
      expect(user2.profile!.subscribedBots.list.length).to.be.equal(1)
      expect(user2.profile!.subscribedBots.list[0].isSubscribed).to.be.true
      expect(user2.profile!.subscribedBots.list[0].followersSize).to.be.equal(1)
      user2bot = user2.profile!.subscribedBots.list[0]
      done()
    } catch (e) {
      done(e)
    }
  })

  it('unsubscribe user2 for first bot', async done => {
    timestamp()
    try {
      await user2.profile!.subscribedBots.list[0].unsubscribe()
      user2.profile!.subscribedBots.refresh()
      await user2.profile!.subscribedBots.load()
      expect(user2.profile!.subscribedBots.list.length).to.be.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('subscribe again', async done => {
    timestamp()
    try {
      await user2._subscribeBot(bot.id)
      done()
    } catch (e) {
      done(e)
    }
  })

  it('change first bot', async done => {
    timestamp()
    try {
      expect(user2bot.title).to.be.equal('Test bot!')
      await bot.update({title: 'Test bot!!'})
      setTimeout(done, 50)
    } catch (e) {
      done(e)
    }
  })
  // TODO bot update ?
  // it('verify updating for second user', async done => {
  //   timestamp()
  //   try {
  //     await waitFor(() => user2bot.title === 'Test bot!!')
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('change first bot description and expect new item update', async done => {
  //   timestamp()
  //   try {
  //     expect(user2bot.description).to.be.equal('New description')
  //     await bot.update({description: 'New description2'})
  //     await waitFor(() => user2.updates.length === 1)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('incorporate updates', async done => {
  //   try {
  //     user2.incorporateUpdates()
  //     expect(user2.updates.length).to.be.equal(0)
  //     expect(user2.notifications.length).to.be.equal(2)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  it('get subscribers for bot', async done => {
    try {
      await bot.subscribers.load()
      expect(bot.subscribers.list.length).to.be.equal(1)
      expect(bot.subscribers.list[0].id).to.be.equal(user2.username)
      done()
    } catch (e) {
      done(e)
    }
  })

  // it('logout user2', async done => {
  //   try {
  //     await user2.logout()
  //     expect(user2.notifications.list.length).to.be.equal(0)
  //     expect(user2.updates.length).to.be.equal(0)
  //     setTimeout(done, 50)
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('login user2 again and verify HS', async done => {
  //   try {
  //     user2 = await createXmpp(null, user2phone)
  //     await waitFor(() => user2.notifications.list.length === 3)
  //     expect(user2.notifications.list[0].bot.title).to.be.equal('Test bot!!')
  //     expect(user2.updates.length).to.be.equal(0)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('disconnect user2 and login again and verify HS, delete items', async done => {
  //   try {
  //     await user2.disconnect()
  //     await user1.removeBot(bot.id)
  //     await user2.login()
  //     expect(user2.notifications.list.length).to.be.equal(3)
  //     await waitFor(() => user2.updates.length === 1)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('create bot3', async done => {
  //   try {
  //     timestamp()
  //     bot3 = await user1.createBot()
  //     await bot3.update({
  //       public: true,
  //       title: 'Test bot3',
  //       location: {latitude: 1.1, longitude: 2.1},
  //     })
  //     setTimeout(done, 50)
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('expect updates', async done => {
  //   try {
  //     timestamp()
  //     await waitFor(() => user2.updates.length === 2)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  // it('hide bot', async done => {
  //   try {
  //     timestamp()
  //     const user2bot3 = (user2.updates[0] as any).bot
  //     expect(user2bot3.owner.id).to.be.equal(user1.username)
  //     bot3.setPublic(false)
  //     await bot3.save()
  //     setTimeout(done, 50)
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('check delete HS notification', async done => {
  //   try {
  //     timestamp()
  //     await waitFor(() => user2.updates.length === 1)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('check create HS notification', async done => {
  //   try {
  //     timestamp()
  //     bot3.shareToFollowers('hello followers2!')
  //     await waitFor(() => user2.updates.length === 2)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('incorporate updates and check bot loading', async done => {
  //   try {
  //     timestamp()
  //     await waitFor(() => user2.notifications.list.length === 3)
  //     user2.incorporateUpdates()
  //     expect(user2.updates.length).to.be.equal(0)
  //     expect(user2.notifications.list.length).to.be.equal(2)
  //     const user2bot3 = user2.notifications.list[0].bot
  //     expect(user2bot3.owner.id).to.be.equal(user1.username)
  //     expect(user2bot3.location.latitude).to.be.equal(1.1)
  //     expect(user2bot3.location.longitude).to.be.equal(2.1)
  //     expect(user2bot3.title).to.be.equal('Test bot3')
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('delete bot and check updated HS', async done => {
  //   try {
  //     user2.deleteBot(user2.notifications.list[0].bot.id)
  //     expect(user2.notifications.list.length).to.be.equal(1)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
  after('remove', async done => {
    try {
      await user1.removeBot(bot2.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot.id)
    } catch (e) {}
    try {
      await user1.removeBot(bot3.id)
    } catch (e) {}
    try {
      await user1.remove()
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    done()
  })
})
