import {createUser} from './support/testuser'
import {IWocky} from '../src'

let user: IWocky

describe('Silent Push tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    user = await createUser()
  })
  it('triggers silent push notification', async () => {
    await user.triggerSilentPush(user.profile!.id)
  })
  afterAll(async () => {
    await user.remove()
  })
})
