import {expect} from 'chai'
import {createXmpp, waitFor} from './support/testuser'
import {when} from 'mobx'
import {IWocky} from '../src/store/Wocky'

let user1: IWocky, user2: IWocky, user3: IWocky

describe('ProfileStore', () => {
  it('create first user', async done => {
    try {
      user1 = await createXmpp(31)
      await waitFor(() => user1.profile !== null)
      await user1.profile!.update({handle: 'abc1', firstName: 'name1', lastName: 'lname1', email: 'a@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create second user', async done => {
    try {
      user2 = await createXmpp(32)
      await waitFor(() => user2.profile !== null)
      await user2.profile!.update({handle: 'abc2', firstName: 'name2', lastName: 'lname2', email: 'a2@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create third user', async done => {
    try {
      user3 = await createXmpp(33)
      await waitFor(() => user3.profile !== null)
      await user3.profile!.update({handle: 'abc3', firstName: 'name3', email: 'a3@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('add two users to roster', async done => {
    try {
      const profile2 = await user1.loadProfile(user2.username!)
      expect(profile2.isVerified).to.be.false
      expect(profile2.handle).to.be.equal('abc2')
      expect(profile2.isFollowed).to.be.false
      await profile2.follow()
      expect(profile2.isFollowed).to.be.true
      const profile3 = await user1.loadProfile(user3.username!)
      await profile3.follow()
      done()
    } catch (e) {
      done(e)
    }
  })

  it('wait profile', async done => {
    try {
      when(() => user1.profile !== null, done)
    } catch (e) {
      done(e)
    }
  })

  it('get profile and check isOwn', () => {
    expect(user1.profiles.get(user1.username!)).to.be.not.null
    expect(user1.profiles.get(user1.username!)!.isOwn).to.be.true
    expect(user1.profiles.get(user2.username!)).to.be.not.null
    expect(user1.profiles.get(user2.username!)!.isOwn).to.be.false
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
      // // load next page with one record
      // await user1.profile!.followed.loadPage(1)
      // expect(user1.profile!.followed.length).to.be.equal(2)
      // expect(user1.profile!.followed.list.length).to.be.equal(2)
      // expect(user1.profile!.followed.list[1].id).to.be.equal(user3.username)
      // expect(user1.profile!.followed.finished).to.be.equal(true)
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
      const profile = await user1.lookup('abc1')
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
      const profile = await user1.loadProfile(user2.username!)
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
