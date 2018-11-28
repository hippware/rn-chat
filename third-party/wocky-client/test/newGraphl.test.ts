import {createUser, waitFor, timestamp} from './support/testuser'
import {IWocky} from '../src'

let user: IWocky, user2: IWocky
let user1phone: string

describe('NewGraphQL tests', () => {
  it('get user1 credential via GraphQL', async () => {
    timestamp()
    user = await createUser()
  })

  it('get user2 credentials via GraphQL', async () => {
    timestamp()
    user2 = await createUser()
  })

  it('update profile', async () => {
    timestamp()
    await waitFor(
      () => user.profile !== null && user.profile.phoneNumber !== null,
      'user1 profile to load'
    )
    user1phone = user.profile.phoneNumber
    await user.profile!.update({
      handle: 'a' + user1phone.replace('+', ''),
      firstName: 'name1',
      lastName: 'lname1',
      email: 'a@aa.com',
    })
  })

  it('cleans up users', async () => {
    try {
      await user.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
    try {
      await user2.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })
})
