import {createUser, fillAndSaveProfile, dumpProfile, sleep, waitFor} from './support/testuser'
import {IWocky, IProfile} from '../../src/wocky'
import {getSnapshot} from 'mobx-state-tree'

let user: IWocky,
  user2: IWocky,
  user1user2Profile: IProfile | undefined,
  user2user1Profile: IProfile | undefined
let user1phone, user2phone: string

describe('New GraphQL profile tests', () => {
  beforeAll(async () => {
    jest.setTimeout(30000)
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
      expect(e.messages).toBeDefined()
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
    user2phone = user2.profile!.phoneNumber!

    await fillAndSaveProfile(user, 'name1', 'lname1')
    await fillAndSaveProfile(user2, 'name2', 'lname2')
    await dumpProfile(user, 'USER1')
    await dumpProfile(user2, 'USER2')
  })

  it('update clientData', async () => {
    expect(user.profile!.clientData.guestOnce).toBeFalsy()
    await user.profile!.clientData!.flip('guestOnce')
    expect(user.profile!.clientData.guestOnce).toBeTruthy()
    await sleep(1000)
    const data: any = await user.transport.loadProfile(user.username!)
    const clientData = JSON.parse(data.clientData)
    expect(clientData.guestOnce).toBeTruthy()
  })

  it('toggle userFullAudit', async () => {
    expect(user.profile!.fullAudit).toBe(false)
    await user.userFullAudit(true)
    await user.loadProfile(user.profile!.id)
    expect(user.profile!.fullAudit).toBe(true)
    await user.userFullAudit(false)
    await user.loadProfile(user.profile!.id)
    expect(user.profile!.fullAudit).toBe(false)
  })

  it('user1 sent friend invite to user2', async () => {
    expect(user.profile!.sortedFriends.length).toBe(0)
    expect(user2.profile!.sortedFriends.length).toBe(0)
    expect(user.profile!.receivedInvitations.length).toBe(0)
    expect(user2.profile!.receivedInvitations.length).toBe(0)
    expect(user.profile!.sentInvitations.length).toBe(0)
    expect(user2.profile!.sentInvitations.length).toBe(0)
    user1user2Profile = await user.loadProfile(user2.username!)
    user2user1Profile = await user2.loadProfile(user.username!)
    expect(user1user2Profile).toBeTruthy()
    expect(user2user1Profile).toBeTruthy()
    expect(user1user2Profile!.hasReceivedInvite).toBeFalsy()
    expect(user2user1Profile!.hasReceivedInvite).toBeFalsy()
    expect(user1user2Profile!.hasSentInvite).toBeFalsy()
    expect(user2user1Profile!.hasSentInvite).toBeFalsy()
    await user1user2Profile!.invite()
    expect(user.profile!.sentInvitations.length).toBe(1)
    expect(user.profile!.sentInvitations.list[0].id).toBe(user2.username)
    expect(user1user2Profile!.hasReceivedInvite).toBeTruthy()
    await waitFor(() => user2user1Profile!.hasSentInvite, 'user invitation notification')
    expect(user2.profile!.receivedInvitations.list[0].id).toBe(user.username)
  })

  it('relogin, check lists for both accounts', async () => {
    await user.logout()
    await user2.logout()
    user = await createUser(undefined, user1phone)
    user2 = await createUser(undefined, user2phone)
    expect(user.profile!.receivedInvitations.length).toBe(0)
    expect(user2.profile!.receivedInvitations.length).toBe(1)
    expect(user.profile!.sentInvitations.length).toBe(1)
    expect(user2.profile!.sentInvitations.length).toBe(0)
    user1user2Profile = await user.loadProfile(user2.username!)
    user2user1Profile = await user2.loadProfile(user.username!)
    expect(user1user2Profile!.hasReceivedInvite).toBeTruthy()
    expect(user2user1Profile!.hasSentInvite).toBeTruthy()
  })

  it('accept invite', async () => {
    expect(user2user1Profile!.isFriend).toBeFalsy()
    await user2user1Profile!.invite() // became friends!
    await waitFor(() => user2user1Profile!.isFriend, 'user relationship should be friends')
    expect(user2user1Profile!.hasReceivedInvite).toBeFalsy()
    expect(user2.profile!.friends.length).toBe(1)
    expect(user2.profile!.friends.list[0].id).toBe(user.username)
  })

  it('check for notification', async () => {
    await waitFor(() => user1user2Profile!.isFriend, 'user relationship should be friends')
    expect(user.profile!.friends.length).toBe(1)
    expect(user.profile!.friends.list[0].id).toBe(user2.username)
    expect(user.profile!.receivedInvitations.length).toBe(0)
    expect(user.profile!.sentInvitations.length).toBe(0)
  })

  it('relogin, check friends lists for both accounts', async () => {
    await user.logout()
    await user2.logout()
    user = await createUser(undefined, user1phone)
    user2 = await createUser(undefined, user2phone)
    expect(user.profile!.receivedInvitations.length).toBe(0)
    expect(user2.profile!.receivedInvitations.length).toBe(0)
    expect(user.profile!.sentInvitations.length).toBe(0)
    expect(user2.profile!.sentInvitations.length).toBe(0)
    expect(user.profile!.friends.length).toBe(1)
    expect(user2.profile!.friends.length).toBe(1)

    user1user2Profile = await user.loadProfile(user2.username!)
    user2user1Profile = await user2.loadProfile(user.username!)
    // console.log('PROFILE12', JSON.stringify(user1user2Profile))
    // console.log('PROFILE21', JSON.stringify(user1user2Profile))
    expect(user1user2Profile!.isFriend).toBeTruthy()
    expect(user2user1Profile!.isFriend).toBeTruthy()
    await waitFor(
      () => user1user2Profile!.status === 'ONLINE',
      'user2 didnt come online in time',
      2000
    )
    await waitFor(
      () => user2user1Profile!.status === 'ONLINE',
      'user1 didnt come online in time',
      2000
    )
  })

  it('unfriend, check notification', async () => {
    expect(user2.profile!.friends.length).toBe(1)
    await user1user2Profile!.unfriend()
    expect(user1user2Profile!.isFriend).toBeFalsy()
    expect(user.profile!.friends.length).toBe(0)
    // wait for 'NONE' contact notification processing
    await waitFor(() => !user2user1Profile!.isFriend, 'user relationship should be none')
    expect(user2.profile!.friends.length).toBe(0)
    expect(user2user1Profile!.isFriend).toBeFalsy()
  })

  it('relogin, check empty friends lists for both accounts', async () => {
    await user.logout()
    await user2.logout()
    user = await createUser(undefined, user1phone)
    user2 = await createUser(undefined, user2phone)
    expect(user.profile!.friends.length).toBe(0)
    expect(user2.profile!.friends.length).toBe(0)

    user1user2Profile = await user.loadProfile(user2.username!)
    user2user1Profile = await user2.loadProfile(user.username!)
    // console.log('PROFILE12', JSON.stringify(user1user2Profile))
    // console.log('PROFILE21', JSON.stringify(user1user2Profile))
    expect(user1user2Profile!.hasReceivedInvite).toBeFalsy()
    expect(user1user2Profile!.hasSentInvite).toBeFalsy()
    expect(user1user2Profile!.isFriend).toBeFalsy()
  })

  // // TODO: check profile is online after presence enabled
  // // await waitFor(() => user2.profile.sortedFriends[0].status === 'available', 'user2 not available in time')

  // it('load followers', async () => {
  //   const steve = await createUser()
  //   await steve.profile!.update({
  //     handle: 'steve' + steve.profile!.phoneNumber!.replace('+', ''),
  //     firstName: 'steve',
  //     lastName: 'stevenson',
  //     email: 's@ss.com',
  //   })
  //   await steve.profile!.save()

  //   // verify that all 3 profiles have handles
  //   // this is a back-end requirement for users to return in 'followers' or 'following' query
  //   expect([!!user.profile!.handle, !!user2.profile!.handle, !!steve.profile!.handle]).toEqual([
  //     true,
  //     true,
  //     true,
  //   ])
  //   // TODO: verify that these profile updates exist on the server (via `save`)

  //   const user1steve = await user.loadProfile(steve.username!)
  //   expect(user1steve).toBeTruthy()
  //   await user1steve.followers.load()
  //   expect(user1steve.followers.length).toEqual(0)
  //   const user2steve = await user2.loadProfile(steve.username!)
  //   await user2steve.follow()
  //   await user1steve.followers.load({force: true})
  //   await steve.remove()
  //   expect(user1steve.followers.length).toEqual(1)
  //   expect(user1steve.followers.list[0].handle).toEqual(user2.profile!.handle)
  // })

  it('block and unblock', async () => {
    expect(user.profile!.blocked.length).toBe(0)
    await user1user2Profile!.block()
    expect(user.profile!.blocked.length).toBe(1)
    await user1user2Profile!.unblock()
    expect(user.profile!.blocked.length).toBe(0)
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

  it('toggles presence', async () => {})

  // // TODO deal with verification of search?
  // // it('searches users', async done => {
  // //   try {
  // //     timestamp()
  // //     await gql.login(user.username!, user.password!, host)
  // //     await gql.searchUsers('abc')
  // //     // NOTE: results for newly created users don't show up in the results which makes expected values
  // //     // on the return from `searchUsers` difficult here
  // //     done()
  // //   } catch (e) {
  // //     done(e)
  // //   }
  // // })

  // it('enable/disable push notifications', async () => {
  //   await user.enablePush('randomToken')
  //   await user.disablePush()
  // })

  // it('remove/delete user', async () => {
  //   const user3 = await createUser()
  //   expect(user3).toBeTruthy()
  //   await user3.remove()
  //   // todo: any way to verify (other than no errors?)
  // })

  afterAll(async () => {
    await sleep(1000)
    try {
      await user.remove()
    } catch (e) {
      console.warn('error removing user 1', e)
    }
    try {
      await user2.remove()
    } catch (e) {
      console.warn('error removing user 2', e)
    }
  })
})
