import {createUser} from './support/testuser'
import {IWocky} from '../src'

let alice: IWocky, bob: IWocky

describe('New GraphQL conversation tests', () => {
  beforeAll(async () => {
    alice = await createUser()
    bob = await createUser()
  })

  it('alice creates and sends messages', async () => {
    const chat = alice.createChat(bob.username!)
    chat.message.setBody('hello')
    chat.message.send()
    chat.message.setBody('hello2')
    chat.message.send()
    expect(alice.chats.list.length === 1 && alice.chats.list[0].messages.length === 2)
  })

  // it("bob receives alice's messages", async () => {
  //   await waitFor(() => bob.chats.list.length === 1 && bob.chats.list[0].messages.length === 2)
  //   expect(bob.chats.list[0].last!.body).toEqual('hello2')
  // })

  afterAll(async () => {
    try {
      await Promise.all([alice.remove(), bob.remove()])
    } catch (e) {
      // console.warn('error removing users', e)
    }
  })
})
