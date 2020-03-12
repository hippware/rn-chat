import {createUser, fillAndSaveProfile, dumpProfile, waitFor, sleep} from './support/testuser'
import {IWocky} from '../../src/wocky'

let user1: IWocky

describe('User bulk lookup', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    user1 = await createUser()
  })

  it('update user with handles', async () => {
    await waitFor(() => user1.profile !== null, 'user1 profile to load')
    await fillAndSaveProfile(user1, 'name1', 'lname1')
    await dumpProfile(user1)
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
