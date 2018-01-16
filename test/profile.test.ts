import { expect } from 'chai'
import { destroy } from 'mobx-state-tree'
import { createXmpp } from './support/testuser'
import { when } from 'mobx'
import { ProfileList, IProfile, IProfileList } from '../src/model'
import { IXmppService } from '../src'

let user1: IXmppService, user2: IXmppService, user3: IXmppService

describe('ConnectStore', () => {
  before(async done => {
    user1 = await createXmpp(31)
    await user1.updateProfile({ handle: 'abc1', firstName: 'name1', email: 'a@aa.com' })
    user2 = await createXmpp(32)
    await user2.updateProfile({ handle: 'abc2', firstName: 'name2' })
    user3 = await createXmpp(33)
    await user3.updateProfile({ handle: 'abc3', firstName: 'name3' })
    await user1.addToRoster(user2.username!)
    await user1.addToRoster(user3.username!)
    await user2.disconnect()
    await user3.disconnect()
    done()
  })

  it('wait profile', async done => {
    try {
      when(() => user1.profile !== null, done)
    } catch (e) {
      done(e)
    }
  })

  it('following profile relations', async done => {
    try {
      expect(user1.profile!.following.loading).to.be.equal(false)
      expect(user1.profile!.following.finished).to.be.equal(false)
      // load first page (one record per page)
      await user1.profile!.following.loadPage(1)
      expect(user1.profile!.following.length).to.be.equal(1)
      expect(user1.profile!.following.list.length).to.be.equal(1)
      expect(user1.profile!.following.list[0].user).to.be.equal(user2.username)
      expect(user1.profile!.following.finished).to.be.equal(false)
      // load next page with one record
      await user1.profile!.following.loadPage(1)
      expect(user1.profile!.following.length).to.be.equal(2)
      expect(user1.profile!.following.list.length).to.be.equal(2)
      expect(user1.profile!.following.list[1].user).to.be.equal(user3.username)
      expect(user1.profile!.following.finished).to.be.equal(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('followers profile relations', async done => {
    try {
      await user1.profile!.followers.load()
      expect(user1.profile!.followers.length).to.be.equal(0)
      done()
    } catch (e) {
      done(e)
    }
  })
})
