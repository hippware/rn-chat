import {createXmpp, waitFor} from './support/testuser'
import {when} from 'mobx'
import {IWocky} from '../src/store/Wocky'
let user1: IWocky, user2: IWocky
let user1phone: string, user2phone: string

// tslint:disable:no-console

describe('ConnectStore', () => {
  beforeAll(async done => {
    jest.setTimeout(30000)
    user1 = await createXmpp()
    user2 = await createXmpp()
    user1phone = user1.profile!.phoneNumber!
    user2phone = user2.profile!.phoneNumber!
    expect(user1.username).toBeTruthy()
    expect(user2.username).toBeTruthy()
    expect(user1.connected).toBe(true)
    expect(user2.connected).toBe(true)
    done()
  })

  it('check automatic loading profile', async done => {
    when(
      () => (user1.profile ? true : false),
      () => {
        const data = user1.profile!
        expect(data.handle).toBe(null)
        expect(data.firstName).toBe(null)
        expect(data.lastName).toBe(null)
        done()
      }
    )
  })

  it('check automatic loading profile2', async done => {
    when(
      () => (user2.profile ? true : false),
      () => {
        const data = user2.profile!
        expect(data.handle).toBe(null)
        expect(data.firstName).toBe(null)
        expect(data.lastName).toBe(null)
        done()
      }
    )
  })

  it('update profile with invalid handle', async done => {
    try {
      expect(user1.profile!.updated).toBe(false)
      await user1.profile!.update({handle: 'a', firstName: 'b', lastName: 'c'})
      done('exception should be thrown')
    } catch (e) {
      expect(user1.profile!.updated).toBe(false)
      expect(e.message).toEqual(
        '[{"message":"should be at least 3 character(s)","__typename":"ValidationMessage"}]'
      )
      done()
    }
  })
  it('update profile', async done => {
    try {
      const user1handle = 'a' + user1phone.replace('+', '')
      const user2handle = 'a' + user2phone.replace('+', '')
      await user2.profile!.update({handle: user2handle, firstName: 'b', lastName: 'c'})
      await user1.profile!.update({handle: user1handle, firstName: 'b', lastName: 'c'})
      const data = user1.profile!
      expect(data.handle).toEqual(user1handle)
      expect(data.firstName).toEqual('b')
      expect(data.lastName).toEqual('c')
      await user1.profile!.update({handle: user1handle + '2'})
      expect(data.handle).toEqual(user1handle + '2')
      expect(data.firstName).toEqual('b')
      expect(data.lastName).toEqual('c')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('make them friends', async done => {
    expect(user1.sortedRoster.length).toEqual(0)
    expect(user2.sortedRoster.length).toEqual(0)
    await (await user1.loadProfile(user2.username!)).follow()
    await (await user2.loadProfile(user1.username!)).follow()
    when(
      () => user1.sortedRoster.length === 1 && user2.sortedRoster.length === 1,
      () => {
        expect(user1.sortedRoster[0].id).toEqual(user2.username)
        expect(user2.sortedRoster[0].id).toEqual(user1.username)
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
      expect(user2.chats.list[0].last!.body).toEqual('hello2')
      done()
    } catch (e) {
      done(e)
    }
  })
  // it('send media', async done => {
  //   try {
  //     const fileName = `${__dirname}/img/test.jpg`
  //     const fileNameThumb = `${__dirname}/img/test-thumbnail.jpg`
  //     const file = {
  //       name: fileName.substring(fileName.lastIndexOf('/') + 1),
  //       body: fs.readFileSync(fileName),
  //       type: 'image/jpeg',
  //     }
  //     const chat = user1.createChat(user2.username!)
  //     await chat.message.upload({height: 300, width: 300, size: 3801, file})
  //     chat.message.send()
  //     await waitFor(() => user2.chats.list[0].last!.body === '')
  //     await waitFor(() => user2.chats.list[0].last!.media!.loaded)
  //     const expectBuf = fs.readFileSync(fileNameThumb)
  //     const testBuf = fs.readFileSync(user2.chats.list[0].last!.media!.source!.uri)
  //     expect(expectBuf.toString()).toEqual(testBuf.toString())
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })
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
      await waitFor(
        () => user2.chats.list.length === 1 && user2.chats.list[0].last!.body === 'hello2'
      )
      expect(user2.chats.list[0].last).toBeTruthy()
      expect(user2.chats.list[0].messages[0].body).toEqual('hello')
      expect(user2.chats.list[0].messages[1].body).toEqual('hello2')
      expect(user2.chats.list[0].messages.length).toEqual(2)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('check conversations', async done => {
    try {
      await user2.logout()
      expect(user2.chats.list.length).toEqual(0)
      user2 = await createXmpp(undefined, user2phone)
      await user2.loadChats()
      await waitFor(() => user2.chats.list.length === 1)
      // expect(user2.chats.list[0].last!.body).toEqual('')
      // expect(user2.chats.list[0].last!.media).toBeTruthy()
      expect(user2.chats.list[0].last!.body).toEqual('hello2')
      expect(user2.chats.list[0].messages.length).toEqual(1)
      await user2.chats.list[0].load()
      await waitFor(() => user2.chats.list[0].messages.length === 3)
      done()
    } catch (e) {
      done(e)
    }
  })
  afterAll(async () => {
    await user1.remove()
    await user2.remove()
    expect(user1.connected).toBe(false)
    expect(user2.connected).toBe(false)
    // destroy(user1)
    // destroy(user2)
  })
})
