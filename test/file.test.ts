import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {when} from 'mobx'
import {IWocky} from '../src'
const fs = require('fs')
let user1: IWocky
let expectBuf: any

describe('FileStore', () => {
  before(async done => {
    user1 = await createXmpp(25)
    done()
  })

  it('upload avatar', async done => {
    try {
      const fileName = `${__dirname}/img/test.jpg`
      const fileNameThumbnail = `${__dirname}/img/test-thumbnail.jpg`
      try {
        const file = {name: fileName.substring(fileName.lastIndexOf('/') + 1), body: fs.readFileSync(fileName), type: 'image/jpeg'}
        const data = {height: 300, width: 300, size: 3801, file}
        await waitFor(() => user1.profile !== null)
        await user1.profile!.upload(data)
        await user1.updateProfile({avatar: user1.profile!.avatar!.id})
      } catch (e) {
        console.error(e)
      }
      await user1.loadProfile(user1.username!)
      when(
        () => user1.profile !== null && user1.profile.avatar !== null && user1.profile.avatar.thumbnail !== null,
        () => {
          try {
            expectBuf = fs.readFileSync(fileNameThumbnail)
            const testBuf = fs.readFileSync(user1.profile!.avatar!.thumbnail!.uri)
            expect(expectBuf.toString()).to.be.equal(testBuf.toString())
            done()
          } catch (e) {
            console.error(e)
          }
        }
      )
    } catch (e) {
      done(e)
    }
  })

  it('logout, load profile and verify thumbnail', async done => {
    try {
      await user1.logout()
      expect(user1.profile).to.be.null
      user1 = await createXmpp(25)
      await waitFor(() => user1.profile !== null)
      expect(user1.profile!.avatar!.url).to.be.not.empty
      expect(user1.profile!.avatar!.thumbnail).to.be.null
      // check how thumbnails are automatically loaded
      await waitFor(() => user1.profile!.avatar!.thumbnail !== null)
      expect(user1.profile!.avatar!.url).to.be.empty
      const testBuf = fs.readFileSync(user1.profile!.avatar!.thumbnail!.uri)
      expect(expectBuf.toString()).to.be.equal(testBuf.toString())
      done()
    } catch (e) {
      done(e)
    }
  })

  after('remove', async () => {
    await user1.remove()
  })
})
