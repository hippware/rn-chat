import {createUser, waitFor} from './support/testuser'
import {IWocky} from '../src'

let alice: IWocky, bob: IWocky

describe('New GraphQL conversation tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    alice = await createUser()
    bob = await createUser()
  })

  it('update profiles with handles so they can do stuff like send messages', async () => {
    await alice.profile!.update({
      handle: 'a' + alice.profile!.phoneNumber!.replace('+', ''),
      firstName: 'alice',
      lastName: 'alerson',
    })
    await bob.profile!.update({
      handle: 'b' + bob.profile!.phoneNumber!.replace('+', ''),
      firstName: 'bob',
      lastName: 'boberts',
    })
  })

  it('make them friends so they can exchange messages', async () => {
    const aliceBobProfile = await alice.loadProfile(bob.username!)
    await aliceBobProfile.follow()
    const bobAliceProfile = await bob.loadProfile(alice.username!)
    await bobAliceProfile.follow()
    await waitFor(
      () => alice.sortedRoster.length === 1 && bob.sortedRoster.length === 1,
      "bob and alice aren't friends in time",
      5000
    )
    expect(alice.sortedRoster[0].id).toEqual(bob.username)
    expect(bob.sortedRoster[0].id).toEqual(alice.username)
    // todo: check profile is online? (requires presence)
    // await waitFor(
    //   () => bob.sortedRoster[0].status === 'available',
    //   'bob not "available" in time'
    // )
    expect(bob.chats.list.length).toBe(0)
    expect(alice.chats.list.length).toBe(0)
  })

  it('alice creates and sends messages to bob', async () => {
    const chat = alice.createChat(bob.username!)
    chat.message.setBody('hello')
    chat.message.send()
    chat.message.setBody('hello2')
    chat.message.send()
    expect(alice.chats.list.length === 1 && alice.chats.list[0].messages.length === 2)
  })

  // it("bob receives alice's messages", async () => {
  //   await waitFor(
  //     () => bob.chats.list.length === 1 && bob.chats.list[0].messages.length === 2,
  //     "expected chat for bob doesn't load in time",
  //     5000
  //   )
  //   expect(bob.chats.list.length).toBe(1)
  //   expect(bob.chats.list[0].messages.length).toBe(2)
  //   expect(bob.chats.list[0].last!.body).toBe('hello2')
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
