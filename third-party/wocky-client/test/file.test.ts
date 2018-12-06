import {createUser, waitFor} from './support/testuser'
// import {when} from 'mobx'
import {IWocky} from '../src/store/Wocky'
const fs = require('fs')
let user1: IWocky
// let expectBuf: any
// let user1phone: string

// // tslint:disable:no-console
describe('FileStore', () => {
  beforeAll(async done => {
    user1 = await createUser(25)
    // user1phone = user1.profile!.phoneNumber!
    done()
  })
  it('upload avatar', async done => {
    jest.setTimeout(30000)
    try {
      const fileName = `${__dirname}/img/test.jpg`
      // const fileNameThumbnail = `${__dirname}/img/test-thumbnail.jpg`
      try {
        const file = {
          name: fileName.substring(fileName.lastIndexOf('/') + 1),
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
      } catch (e) {
        console.error(e)
      }
      expect(user1.profile!.updated).toBe(false)
      await user1.profile!.save()
      expect(user1.profile!.updated).toBe(true)
      const profile = await user1.loadProfile(user1.username!)
      console.log('PROFILE:', JSON.stringify(profile))
      expect(profile.avatar).toBeTruthy()
      // when(
      //   () =>
      //     user1.profile !== null &&
      //     user1.profile.avatar !== null &&
      //     user1.profile.avatar.thumbnail !== null,
      //   () => {
      //     try {
      //       expectBuf = fs.readFileSync(fileNameThumbnail)
      //       const testBuf = fs.readFileSync(user1.profile!.avatar!.thumbnail!.uri)
      //       expect(expectBuf.toString()).toEqual(testBuf.toString())
      //       done()
      //     } catch (e) {
      //       console.error(e)
      //     }
      //   }
      // )
    } catch (e) {
      done(e)
    }
  })

  // TODO uncomment and test if after test above passes
  // it('logout, load profile and verify thumbnail', async done => {
  //   try {
  //     await user1.logout()
  //     expect(user1.profile).toBe(null)
  //     user1 = await createUser(undefined, user1phone)
  //     await waitFor(() => user1.profile !== null, 'user1 profile to load')
  //     expect(user1.profile!.avatar!.url).toBeTruthy()
  //     expect(user1.profile!.avatar!.thumbnail).toBe(null)
  //     // check how thumbnails are automatically loaded
  //     await waitFor(() => user1.profile!.avatar!.thumbnail !== null)
  //     expect(user1.profile!.avatar!.url).toBe('')
  //     const testBuf = fs.readFileSync(user1.profile!.avatar!.thumbnail!.uri)
  //     expect(expectBuf.toString()).toEqual(testBuf.toString())
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  // it('remove upload', async done => {
  //   try {
  //     await user1._removeUpload(user1.profile!.avatar!.id)
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  afterAll(async () => {
    // await user1.remove()
  })
})
