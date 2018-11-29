import {createUser, timestamp, waitFor} from './support/testuser'
import {IWocky} from '../src'
import {getSnapshot} from 'mobx-state-tree'

let user: IWocky, user2: IWocky
let user1phone: string

describe('NewGraphQL tests', () => {
  it('get user1 credential via GraphQL', async () => {
    timestamp()
    user = await createUser()
    expect(user.username).toBeTruthy()
  })

  it('get user2 credentials via GraphQL', async () => {
    timestamp()
    user2 = await createUser()
    expect(user2.username).toBeTruthy()
    // not sure why they're the same
    expect(user.username).not.toEqual(user2.username)
  })

  it('update profile with invalid handle', async () => {
    try {
      expect(user.profile!.updated).toBe(false)
      expect(await user.profile!.update({handle: 'a', firstName: 'b', lastName: 'c'})).toThrow()
    } catch (e) {
      expect(user.profile!.updated).toBe(false)
      expect(e.message).toEqual(
        '[{"__typename":"ValidationMessage","message":"should be at least 3 character(s)"}]'
      )
    }
  })

  it('update profile', async () => {
    timestamp()
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
  })

  it('make them friends', async () => {
    expect(user.sortedRoster.length).toEqual(0)
    expect(user2.sortedRoster.length).toEqual(0)
    const user1user2Profile = await user.loadProfile(user2.username!)
    expect(user1user2Profile).toBeTruthy()
    await user1user2Profile.follow()
    await waitFor(
      () => user.sortedRoster.length === 1 && user2.sortedRoster.length === 1,
      'user1 and user2 rosters didnt update in time'
    )

    // TODO: continue with roster expects
    // expect(user.sortedRoster[0].id).toEqual(user2.username)
    // expect(user2.sortedRoster[0].id).toEqual(user.username)
    // // check profile is online
    // await waitFor(() => user2.sortedRoster[0].status === 'available', 'user2 not available in time')
  })

  afterAll(async () => {
    try {
      await user.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
    try {
      await user2.remove()
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })
})
