import {createXmpp, waitFor} from './support/testuser'
import {when} from 'mobx'
import {IWocky} from '../src/store/Wocky'

// tslint:disable:no-console

let user1: IWocky, user2: IWocky, user3: IWocky

function timestamp() {
  console.log('TIME: ', new Date().toLocaleString())
}

describe('ProfileStore', () => {
  beforeAll(() => {
    jest.setTimeout(30000)
  })
  it('create first user', async done => {
    try {
      timestamp()
      user1 = await createXmpp(31)
      timestamp()
      await waitFor(() => user1.profile !== null, 'user1 profile to load')
      timestamp()
      await user1.profile!.update({
        handle: 'abc12',
        firstName: 'name1',
        lastName: 'lname1',
        email: 'a@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create second user', async done => {
    try {
      timestamp()
      user2 = await createXmpp(32)
      timestamp()
      await waitFor(() => user2.profile !== null, 'user2 profile to load')
      timestamp()
      await user2.profile!.update({
        handle: 'abc2',
        firstName: 'name2',
        lastName: 'lname2',
        email: 'a2@aa.com',
      })
      done()
    } catch (e) {
      done(e)
    }
  })
  it('create third user', async done => {
    try {
      timestamp()
      user3 = await createXmpp(33)
      timestamp()
      await waitFor(() => user3.profile !== null, 'user3 profile to load')
      timestamp()
      await user3.profile!.update({handle: 'abc3', firstName: 'name3', email: 'a3@aa.com'})
      done()
    } catch (e) {
      done(e)
    }
  })
  it('add two users to roster', async done => {
    try {
      const profile2 = await user1.loadProfile(user2.username!)
      expect(profile2.isVerified).toBe(false)
      expect(profile2.handle).toEqual('abc2')
      expect(profile2.isFollowed).toBe(false)
      await profile2.follow()
      expect(profile2.isFollowed).toBe(true)
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
    expect(user1.profiles.get(user1.username!)).toBeTruthy()
    expect(user1.profiles.get(user1.username!)!.isOwn).toBe(true)
    expect(user1.profiles.get(user2.username!)).toBeTruthy()
    expect(user1.profiles.get(user2.username!)!.isOwn).toBe(false)
  })

  it('followed profile relations', async done => {
    try {
      await user1.loadProfile(user1.username!)
      expect(user1.profile!.followedSize).toEqual(2)
      expect(user1.profile!.followed.loading).toEqual(false)
      expect(user1.profile!.followed.finished).toEqual(false)
      // load first page (one record per page)
      // await user1.profile!.followed.loadPage(1)
      // expect(user1.profile!.followed.length).toEqual(1)
      // expect(user1.profile!.followed.list.length).toEqual(1)
      // expect(user1.profile!.followed.list[0].id).toEqual(user2.username)
      // expect(user1.profile!.followed.finished).toEqual(false)
      // // load next page with one record
      // await user1.profile!.followed.loadPage(1)
      // expect(user1.profile!.followed.length).toEqual(2)
      // expect(user1.profile!.followed.list.length).toEqual(2)
      // expect(user1.profile!.followed.list[1].id).toEqual(user3.username)
      // expect(user1.profile!.followed.finished).toEqual(true)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('followers profile relations', async done => {
    try {
      await user1.profile!.followers.load()
      expect(user1.profile!.followers.length).toEqual(0)
      done()
    } catch (e) {
      done(e)
    }
  })
  it('profile details', async done => {
    try {
      const profile = await user1.loadProfile(user2.username!)
      expect(profile.id).toEqual(user2.username)
      expect(profile.handle).toEqual('abc2')
      expect(profile.firstName).toEqual('name2')
      expect(profile.lastName).toEqual('lname2')
      done()
    } catch (e) {
      done(e)
    }
  })
  afterAll(async () => {
    await user1.remove()
    await user2.remove()
    await user3.remove()
  })
})
