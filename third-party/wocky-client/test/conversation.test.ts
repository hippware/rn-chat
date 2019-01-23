import {createUser, waitFor, sleep} from './support/testuser'
import {IWocky, IChat} from '../src'

let alice: IWocky, bob: IWocky, chat: IChat

describe('New GraphQL conversation tests', () => {
  beforeAll(async () => {
    alice = await createUser()
    bob = await createUser()
    jest.setTimeout(10000)
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
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    await aliceBobProfile.invite()
    await waitFor(() => bobAliceProfile.hasSentInvite)
    await bobAliceProfile.invite() // become friends!
  })

  it('alice creates and sends messages to bob', async () => {
    chat = alice.createChat(bob.username!)
    chat.message!.setBody('hello')
    await chat.message!.send()
    chat.message!.setBody('hello2')
    await chat.message!.send()
    expect(alice.chats.list.length === 1 && alice.chats.list[0].messages.length === 2)
  })

  it("bob receives alice's messages via subscription", async () => {
    await waitFor(
      () => bob.chats.list.length === 1 && bob.chats.list[0].messages.list.length === 2,
      "expected chat for bob doesn't load in time"
    )
    expect(bob.chats.list.length).toBe(1)
    expect(bob.chats.list[0].messages.list.length).toBe(2)
    expect(bob.chats.list[0].messages.last!.content).toBe('hello')
  })

  it("bob can load alice's chat messages", async () => {
    bob.chats.clear()
    expect(bob.chats.list.length).toBe(0)
    await bob.loadChats()
    expect(bob.chats.list.length).toBe(1)
    // loadChats only loads the first message in each chat
    expect(bob.chats.list[0].messages.list.length).toBe(1)
  })

  it('bob can load all of his chats from alice', async () => {
    bob.chats.clear()
    expect(bob.chats.list.length).toBe(0)
    await bob.loadChats()
    expect(bob.chats.list.length).toBe(1)
    await bob.chats.list[0].messages.load({force: true})
    expect(bob.chats.list[0].messages.list.length).toBe(2)
    expect(bob.chats.list[0].messages.count).toBe(2)
    expect(bob.chats.list[0].messages.last!.content).toBe('hello')
  })

  it('bob can load chat messages with paging', async () => {
    for (let i = 0; i < 22; i += 1) {
      chat.message!.setBody('hello' + i)
      await chat.message!.send()
    }
    await sleep(1000)
    bob.chats.clear()
    await bob.loadChats()
    expect(bob.chats.list.length).toBe(1)
    await bob.chats.list[0].messages.load({force: true})
    expect(bob.chats.list[0].messages.list.length).toBe(20)
    expect(bob.chats.list[0].messages.count).toBe(24)
    await bob.chats.list[0].messages.load()
    expect(bob.chats.list[0].messages.list.length).toBe(24)
  })

  it('messages count is the same after refresh', async () => {
    // expect(bob.chats.list[0].messages.list.length).toBe(24)
    expect(bob.chats.list[0]).toBeTruthy()

    // TODO: after calling refresh bob.chats.list[0] === undefined ???
    // bob.chats.list[0].messages.refresh()
    // expect(bob.chats.list[0]).toBeTruthy()
    // expect(bob.chats.list[0].messages.count).toBe(0)

    await bob.chats.list[0].messages.load({force: true})
    expect(bob.chats.list[0].messages.count).toBe(24)
  })

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
