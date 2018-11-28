import {createGraphQL, waitFor, timestamp} from './support/testuser'
import {IWocky} from '../src'

let user, user2: IWocky
let user1phone: string

describe('NewGraphQL tests', () => {
  it('get user1 credential via GraphQL', async done => {
    try {
      timestamp()
      user = await createGraphQL()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('get user2 credentials via GraphQL', async done => {
    try {
      timestamp()
      user2 = await createGraphQL()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('update profile', async done => {
    try {
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
      done()
    } catch (e) {
      done(e)
    }
  })

  afterAll(async done => {
    try {
      await user.remove()
    } catch (e) {
      console.log(e)
    }
    try {
      await user2.remove()
    } catch (e) {
      console.log(e)
    }
    done()
  })
})
