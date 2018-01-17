import { createXmpp } from '../test/support/testuser'
import { when } from 'mobx'

describe('test', () => {
  it('first', async done => {
    try {
      const user1 = await createXmpp(31)
      when(
        () => user1.profile !== null,
        async () => {
          console.log(await user1.profile!.followers.load())
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })
})
