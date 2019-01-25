import {createUser, waitFor, sleep} from './support/testuser'
import {IWocky} from '../src'

let user1: IWocky

describe('User bulk lookup', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    user1 = await createUser()
  })

  it('update user with handles', async () => {
    await waitFor(() => user1.profile !== null, 'user1 profile to load')
    const user1phone = user1.profile!.phoneNumber
    await user1.profile!.update({
      handle: 'd' + user1phone!.replace('+', ''),
      firstName: 'name1',
      lastName: 'lname1',
      email: 'a@aa.com',
    })
    await user1.profile!.save()
  })

  it('bulk uploads some phone numbers', async () => {
    const data = await user1.userBulkLookup(['1234567890', '987-654-3210'])
    expect(data).toBeTruthy()
  })

  afterAll(async () => {
    await sleep(1000)
    try {
      await user1.remove()
    } catch (e) {
      // console.warn(e)
    }
  })
})
