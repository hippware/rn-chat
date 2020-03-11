import {createUser, dumpProfile} from './support/testuser'
import {IWocky} from '../../src/wocky'

let user: IWocky

describe('Silent Push tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    user = await createUser()
    await dumpProfile(user)
  })
  it('triggers silent push notification', async () => {
    await user.triggerSilentPush(user.profile!.id)
  })
  afterAll(async () => {
    await user.remove()
  })
})
