import {createUser, waitFor} from './support/testuser'
import {IWocky} from '../src'

let alice: IWocky, bob: IWocky

describe('New GraphQL conversation tests', () => {
  beforeAll(async () => {
    alice = await createUser()
    bob = await createUser()
  })

  it('update profiles with handles so they can send messages', async () => {
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

  it('make them friends so they can exchange messages', async () => {
    const aliceBobProfile = await alice.loadProfile(bob.username!)
    await aliceBobProfile.follow()
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    await bobAliceProfile.follow()
    await waitFor(
      () => alice.sortedRoster.length === 1 && bob.sortedRoster.length === 1,
      "bob and alice aren't friends in time"
    )
    expect(alice.sortedRoster[0].id).toEqual(bob.username)
    expect(bob.sortedRoster[0].id).toEqual(alice.username)
    expect(bob.chats.list.length).toBe(0)
    expect(alice.chats.list.length).toBe(0)
  })

  it('alice creates and sends messages to bob', async () => {
    const chat = alice.createChat(bob.username!)
    chat.message!.setBody('hello')
    await chat.message!.send()
    chat.message!.setBody('hello2')
    await chat.message!.send()
    expect(alice.chats.list.length === 1 && alice.chats.list[0].messages.length === 2)
  })

  it("bob receives alice's messages via subscription", async () => {
    await waitFor(
      () => bob.chats.list.length === 1 && bob.chats.list[0].messages.length === 2,
      "expected chat for bob doesn't load in time"
    )
    expect(bob.chats.list.length).toBe(1)
    expect(bob.chats.list[0].messages.length).toBe(2)
    expect(bob.chats.list[0].last!.body).toBe('hello2')
  })

  it("bob can load alice's chat messages", async () => {
    bob.chats.clear()
    expect(bob.chats.list.length).toBe(0)
    await bob.loadChat(alice.username!)
    expect(bob.chats.list.length).toBe(1)
    expect(bob.chats.list[0].messages.length).toBe(2)
  })

  it('bob can load all of his chats', async () => {
    bob.chats.clear()
    expect(bob.chats.list.length).toBe(0)
    await bob.loadChats()
    expect(bob.chats.list.length).toBe(1)
    expect(bob.chats.list[0].messages.length).toBe(1)
    expect(bob.chats.list[0].last!.body).toBe('hello2')
  })

  // TODO: paging
  // it('bob can load chat messages with paging', async () => {
  //   bob.chats.clear()
  //   expect(bob.chats.list.length).toBe(0)
  //   await bob.loadChat(alice.username!, undefined, 1)
  //   expect(bob.chats.list.length).toBe(1)
  //   expect(bob.chats.list[0].messages.length).toBe(1)
  //   expect(bob.chats.list[0].last!.body).toBe('hello2')
  //   await bob.loadChat(alice.username!, bob.chats.list[0].last!.id, 1)
  // })

  afterAll(async () => {
    try {
      // don't do these in parallel because of https://github.com/hippware/wocky/issues/2083
      await alice.remove()
      await bob.remove()
    } catch (e) {
      // console.warn('error removing users', e)
    }
  })
})
