import {expect} from 'chai'
import {createXmpp} from './support/testuser'
import {when} from 'mobx'
import {IXmppService} from '../src'
import {IProfile} from '../src/model'

let user1: IXmppService, user2: IXmppService, user3: IXmppService

describe('ConnectStore', () => {
  it('create first user', async done => {
    try {
      user1 = await createXmpp(31)
      await user1.updateProfile({handle: 'abc1', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create second user', async done => {
    try {
      user2 = await createXmpp(32)
      await user2.updateProfile({handle: 'abc2', firstName: 'name2', lastName: 'lname2', email: 'a2@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create third user', async done => {
    try {
      user3 = await createXmpp(33)
      await user3.updateProfile({handle: 'abc3', firstName: 'name3', email: 'a3@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('add two users to roster', async done => {
    await user1.addToRoster(user2.username!)
    await user1.addToRoster(user3.username!)
    done()
  })

  it('wait profile', async done => {
    try {
      when(() => user1.profile !== null, done)
    } catch (e) {
      done(e)
    }
  })

  it('followed profile relations', async done => {
    try {
      await user1.loadProfile(user1.username!)
      expect(user1.profile!.followedSize).to.be.equal(2)
      expect(user1.profile!.followed.loading).to.be.equal(false)
      expect(user1.profile!.followed.finished).to.be.equal(false)
      // load first page (one record per page)
      await user1.profile!.followed.loadPage(1)
      expect(user1.profile!.followed.length).to.be.equal(1)
      expect(user1.profile!.followed.list.length).to.be.equal(1)
      expect(user1.profile!.followed.list[0].id).to.be.equal(user2.username)
      expect(user1.profile!.followed.finished).to.be.equal(false)
      // load next page with one record
      await user1.profile!.followed.loadPage(1)
      expect(user1.profile!.followed.length).to.be.equal(2)
      expect(user1.profile!.followed.list.length).to.be.equal(2)
      expect(user1.profile!.followed.list[1].id).to.be.equal(user3.username)
      expect(user1.profile!.followed.finished).to.be.equal(true)
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
  it('test lookup', async done => {
    try {
      const profile: IProfile = await user1.lookup('abc1')
      expect(profile.id).to.be.equal(user1.username)
      expect(profile.handle).to.be.equal('abc1')
      expect(profile.firstName).to.be.equal('name1')
      expect(profile.lastName).to.be.equal('lname1')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('profile details', async done => {
    try {
      const profile: IProfile = await user1.loadProfile(user2.username!)
      expect(profile.id).to.be.equal(user2.username)
      expect(profile.handle).to.be.equal('abc2')
      expect(profile.firstName).to.be.equal('name2')
      expect(profile.lastName).to.be.equal('lname2')
      done()
    } catch (e) {
      done(e)
    }
  })
  after('remove', async () => {
    await user1.remove()
    await user2.remove()
    await user3.remove()
  })
})
