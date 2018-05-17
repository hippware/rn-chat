import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {when} from 'mobx'
import {IWocky} from '../src/store/Wocky'
const fs = require('fs')
let user1: IWocky, user2: IWocky

describe('ConnectStore', () => {
  before(async done => {
    user1 = await createXmpp(23)
    user2 = await createXmpp(24)
    expect(user1.username).to.be.not.null
    expect(user2.username).to.be.not.null
    expect(user1.connected).to.be.true
    expect(user2.connected).to.be.true
    done()
  })

  it('check automatic loading profile', async done => {
    when(
      () => (user1.profile ? true : false),
      () => {
        const data = user1.profile!
        expect(data.handle).to.be.null
        expect(data.firstName).to.be.null
        expect(data.lastName).to.be.null
        done()
      }
    )
  })

  it('check automatic loading profile2', async done => {
    when(
      () => (user2.profile ? true : false),
      () => {
        const data = user2.profile!
        expect(data.handle).to.be.null
        expect(data.firstName).to.be.null
        expect(data.lastName).to.be.null
        done()
      }
    )
  })

  it('update profile with invalid handle', async done => {
    expect(user1.profile!.updated).to.be.false
    await user1.profile!.update({handle: 'a', firstName: 'b', lastName: 'c'})
    expect(user1.profile!.updated).to.be.false
    expect(user1.profile!.updateError).to.be.equal(
      '[{"message":"should be at least 3 character(s)","__typename":"ValidationMessage"}]'
    )
    done()
  })
  it('update profile', async done => {
    try {
      user2.profile!.update({handle: 'aaac12', firstName: 'b', lastName: 'c'})
      user1.profile!.update({handle: 'aaac11', firstName: 'b', lastName: 'c'})
      const data = user1.profile!
      expect(data.handle).to.be.equal('aaac11')
      expect(data.firstName).to.be.equal('b')
      expect(data.lastName).to.be.equal('c')
      user1.profile!.update({handle: 'aaacc13'})
      expect(data.handle).to.be.equal('aaacc13')
      expect(data.firstName).to.be.equal('b')
      expect(data.lastName).to.be.equal('c')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('make them friends', async done => {
    expect(user1.sortedRoster.length).to.be.equal(0)
    expect(user2.sortedRoster.length).to.be.equal(0)
    await (await user1.loadProfile(user2.username!)).follow()
    await (await user2.loadProfile(user1.username!)).follow()
    when(
      () => user1.sortedRoster.length === 1 && user2.sortedRoster.length === 1,
      () => {
        expect(user1.sortedRoster[0].id).to.be.equal(user2.username)
        expect(user2.sortedRoster[0].id).to.be.equal(user1.username)
        // check profile is online
        when(() => user2.sortedRoster[0].status === 'available', done)
      }
    )
  })
  it('send message', async done => {
    try {
      const chat = user1.createChat(user2.username!)
      chat.message.setBody('hello')
      chat.message.send()
      chat.message.setBody('hello2')
      chat.message.send()
      await waitFor(
        () => user2.chats.list.length === 1 && user2.chats.list[0].messages.length === 2
      )
      expect(user2.chats.list[0].last!.body).to.be.equal('hello2')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('send media', async done => {
    try {
      const fileName = `${__dirname}/img/test.jpg`
      const fileNameThumb = `${__dirname}/img/test-thumbnail.jpg`
      const file = {
        name: fileName.substring(fileName.lastIndexOf('/') + 1),
        body: fs.readFileSync(fileName),
        type: 'image/jpeg'
      }
      const chat = user1.createChat(user2.username!)
      await chat.message.upload({height: 300, width: 300, size: 3801, file})
      chat.message.send()
      await waitFor(() => user2.chats.list[0].last!.body === '')
      await waitFor(() => user2.chats.list[0].last!.media!.loaded)
      const expectBuf = fs.readFileSync(fileNameThumb)
      const testBuf = fs.readFileSync(user2.chats.list[0].last!.media!.source!.uri)
      expect(expectBuf.toString()).to.be.equal(testBuf.toString())
      done()
    } catch (e) {
      done(e)
    }
  })
  it('check profile status', async done => {
    try {
      await user2.disconnect()
      await waitFor(() => user2.profile!.status === 'unavailable')
      when(() => user1.sortedRoster[0].status === 'unavailable', done)
    } catch (e) {
      done(e)
    }
  })
  it('check roster', async done => {
    try {
      await user2.login()
      when(
        () => user2.sortedRoster.length === 1,
        () => {
          expect(user2.sortedRoster[0].id === user1.username)
          expect(user2.sortedRoster[0].status === 'available')
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })
  it('check message receive', async done => {
    try {
      await waitFor(() => user2.chats.list.length === 1 && user2.chats.list[0].last!.body === '')
      expect(user2.chats.list[0].last).to.be.not.null
      expect(user2.chats.list[0].messages[1].body).to.be.equal('hello2')
      expect(user2.chats.list[0].messages.length).to.be.equal(3)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('check conversations', async done => {
    try {
      await user2.logout()
      expect(user2.chats.list.length).to.be.equal(0)
      user2 = await createXmpp(24)
      await waitFor(() => user2.chats.list.length === 1)
      expect(user2.chats.list[0].last!.body).to.be.equal('')
      expect(user2.chats.list[0].last!.media).to.be.not.null
      expect(user2.chats.list[0].messages.length).to.be.equal(1)
      await user2.chats.list[0].load()
      await waitFor(() => user2.chats.list[0].messages.length === 3)
      done()
    } catch (e) {
      done(e)
    }
  })
  after('remove', async () => {
    await user1.remove()
    await user2.remove()
    expect(user1.connected).to.be.false
    expect(user2.connected).to.be.false
    // destroy(user1)
    // destroy(user2)
  })
})
