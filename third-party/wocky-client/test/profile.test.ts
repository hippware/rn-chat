import {createUser, waitFor} from './support/testuser'
import {IWocky, IProfile} from '../src'
import {getSnapshot} from 'mobx-state-tree'

let user: IWocky, user2: IWocky, user1user2Profile: IProfile
let user1phone: string

describe('New GraphQL profile tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    user = await createUser()
    user2 = await createUser()
  })

  it('checks created users', async () => {
    expect(user.username).toBeTruthy()
    expect(user2.username).toBeTruthy()
    expect(user.username).not.toBe(user2.username)
  })

  it('update profile with invalid handle', async () => {
    try {
      expect(user.profile!.updated).toBe(false)
      expect(await user.profile!.update({handle: 'a', firstName: 'b', lastName: 'c'})).toThrow()
    } catch (e) {
      expect(user.profile!.updated).toBe(false)
      expect(e.message).toBe(
        'GraphQL userUpdate error: {"__typename":"UserUpdatePayload","messages":[{"__typename":"ValidationMessage","message":"should be at least 3 character(s)"}],"successful":false}'
      )
    }
  })

  it('update profiles with handles', async () => {
    await waitFor(
      () => user.profile !== null && user.profile.phoneNumber !== null,
      `user profile failed to load with phone number. ${getSnapshot(user)}`
    )
    expect(user.profile).toBeTruthy()
    expect(user.profile!.phoneNumber).toBeTruthy()
    user1phone = user.profile!.phoneNumber!
    await user.profile!.update({
      handle: 'a' + user1phone.replace('+', ''),
      firstName: 'name1',
      lastName: 'lname1',
      email: 'a@aa.com',
    })
    await user.profile!.save()
    await user2.profile!.update({
      handle: 'b' + user1phone.replace('+', ''),
      firstName: 'name2',
      lastName: 'lname2',
      email: 'b@bb.com',
    })
    await user2.profile!.save()
  })

  it('user1 follows user2', async () => {
    expect(user.sortedRoster.length).toBe(0)
    expect(user2.sortedRoster.length).toBe(0)
    user1user2Profile = await user.loadProfile(user2.username!)
    const user2user1Profile = await user2.loadProfile(user.username!)
    expect(user1user2Profile).toBeTruthy()
    expect(user2user1Profile).toBeTruthy()
    await user1user2Profile.follow()
    await waitFor(
      () => user.sortedRoster.length === 1 && user2.sortedRoster.length === 1,
      'user1 and user2 rosters didnt update in time'
    )
    expect(user.sortedRoster[0].id).toBe(user2.username)
    expect(user2.sortedRoster[0].id).toBe(user.username)
    expect(user1user2Profile.isFollowed).toBe(true)
    expect(user2user1Profile.isFollower).toBe(true)
  })

  // TODO: check profile is online after presence enabled
  // await waitFor(() => user2.sortedRoster[0].status === 'available', 'user2 not available in time')

  it('load followers', async () => {
    const steve = await createUser()
    await steve.profile!.update({
      handle: 'steve' + steve.profile!.phoneNumber!.replace('+', ''),
      firstName: 'steve',
      lastName: 'stevenson',
      email: 's@ss.com',
    })
    await steve.profile!.save()

    // verify that all 3 profiles have handles
    // this is a back-end requirement for users to return in 'followers' or 'following' query
    expect([!!user.profile!.handle, !!user2.profile!.handle, !!steve.profile!.handle]).toEqual([
      true,
      true,
      true,
    ])
    // TODO: verify that these profile updates exist on the server (via `save`)

    const user1steve = await user.loadProfile(steve.username!)
    expect(user1steve).toBeTruthy()
    await user1steve.followers.load()
    expect(user1steve.followers.length).toEqual(0)
    const user2steve = await user2.loadProfile(steve.username!)
    await user2steve.follow()
    await user1steve.followers.load({force: true})
    await steve.remove()
    expect(user1steve.followers.length).toEqual(1)
    expect(user1steve.followers.list[0].handle).toEqual(user2.profile!.handle)
  })

  it('unfollow and refollow', async () => {
    expect(user.followed.length).toBe(1)
    await user1user2Profile.unfollow()
    expect(user1user2Profile.isFollowed).toBe(false)
    expect(user.followed.length).toBe(0)
    await user1user2Profile.follow()
  })

  it('block and unblock', async () => {
    expect(user.blocked.length).toBe(0)
    await user1user2Profile.block()
    expect(user.blocked.length).toBe(1)
    expect(user.followed.length).toBe(0)
    await user1user2Profile.unblock()
    expect(user.blocked.length).toBe(0)
    expect(user.followed.length).toBe(0)
  })

  it('hide and unhide', async () => {
    const date = new Date(Date.now() + 1000)
    await user.profile!.hide(true, date)
    expect(user.profile!.hidden!.expires!.getTime()).toEqual(date.getTime())
    expect(user.profile!.hidden!.enabled).toEqual(true)
    await user.profile!.hide(false, undefined)
    expect(user.profile!.hidden!.expires).toBe(null)
    expect(user.profile!.hidden!.enabled).toEqual(false)
  })

  // TODO deal with verification of search?
  // it('searches users', async done => {
  //   try {
  //     timestamp()
  //     await gql.login(user.username!, user.password!, host)
  //     await gql.searchUsers('abc')
  //     // NOTE: results for newly created users don't show up in the results which makes expected values
  //     // on the return from `searchUsers` difficult here
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // })

  it('enable/disable push notifications', async () => {
    await user.enablePush('randomToken')
    await user.disablePush()
  })

  it('remove/delete user', async () => {
    const user3 = await createUser()
    expect(user3).toBeTruthy()
    await user3.remove()
    // todo: any way to verify (other than no errors?)
  })

  afterAll(async () => {
    try {
      await user.remove()
    } catch (e) {
      // console.warn('error removing user 1', e)
    }
    try {
      await user2.remove()
    } catch (e) {
      // console.warn('error removing user 2', e)
    }
  })
})
