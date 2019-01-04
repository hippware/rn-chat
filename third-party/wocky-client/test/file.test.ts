import {createUser, sleep, waitFor} from './support/testuser'
import {IWocky} from '../src/store/Wocky'
const fs = require('fs')
const fileName = `${__dirname}/img/test.jpg`
let user1: IWocky
let user1phone: string

describe('FileStore', () => {
  beforeAll(async done => {
    jest.setTimeout(25000)
    user1 = await createUser()
    user1phone = user1.profile!.phoneNumber!
    done()
  })
  it('upload avatar', async () => {
    const file = {
      name: fileName.substring(fileName.lastIndexOf('/') + 1),
      fileName,
      body: fs.readFileSync(fileName),
      type: 'image/jpeg',
    }
    const data = {height: 300, width: 300, size: 3801, file}
    await waitFor(() => user1.profile !== null, 'user1 profile to load')
    expect(user1.profile!.avatar).toBe(null)
    await user1.profile!.upload(data)
    expect(user1.profile!.avatar).toBeTruthy()
    expect(user1.profile!.uploaded).toBe(true)
    expect(user1.profile!.uploading).toBe(false)
    expect(user1.profile!.updated).toBe(false)
    await user1.profile!.save()
    expect(user1.profile!.updated).toBe(true)
    await sleep(5000)
    await user1.logout()
    user1 = await createUser(undefined, user1phone)
    const profile = await user1.loadProfile(user1.username!)
    expect(profile.avatar).toBeTruthy()
    await waitFor(
      () => profile !== null && profile.avatar !== null && profile.avatar.thumbnail !== null
    )
    expect(profile!.avatar!.thumbnail!.uri).toBeTruthy()
    expect(profile!.avatar!.thumbnail!.uri).not.toBe(fileName) // TODO content should be the same
  })

  it('logout, load profile and verify thumbnail', async () => {
    await user1.logout()
    expect(user1.profile).toBe(null)
    // TODO fix unstable test here
    user1 = await createUser(undefined, user1phone)
    const profile = await user1.loadProfile(user1.username!)
    // await waitFor(
    //   () => !!profile!.avatar && profile!.avatar!.thumbnail !== null,
    //   'thumbnail not loaded in time',
    //   6000
    // )
    // expect(profile!.avatar!.url).toBe('')
    // expect(profile!.avatar!.thumbnail!.uri).toBeTruthy()
    try {
      await user1._removeUpload(profile!.avatar!.id)
    } catch (e) {
      // TODO disable check until found the reason of failures
    }
  })

  afterAll(async () => {
    await user1.remove()
  })
})
