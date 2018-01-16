import { expect } from 'chai'
import { destroy } from 'mobx-state-tree'
import { createXmpp } from './support/testuser'
import { when } from 'mobx'
import { ProfileList } from '../src/model'
import { IXmppService } from '../src'

let user1: IXmppService, user2: IXmppService

describe('ConnectStore', () => {
  before(async done => {
    user1 = await createXmpp(23)
    user2 = await createXmpp(24)
    expect(user1.username).to.be.not.null
    expect(user2.username).to.be.not.null
    expect(user1.connected).to.be.true
    expect(user2.connected).to.be.true
    done()
  })

  it('check automatic loading profile', async done => {
    when(
      () => (user1.profile ? true : false),
      () => {
        const data = user1.profile!
        expect(data.handle).to.be.equal('')
        expect(data.firstName).to.be.equal('')
        expect(data.lastName).to.be.equal('')
        done()
      }
    )
  })

  it('update profile with invalid handle', async done => {
    try {
      await user1.updateProfile({ handle: 'a', firstName: 'b', lastName: 'c' })
      done('exception should be raisen!')
    } catch (e) {
      expect(e).to.be.equal('Handle should be at least 3 character(s).')
      done()
    }
  })
  it('update profile', async done => {
    try {
      await user2.updateProfile({ handle: 'aaac12', firstName: 'b', lastName: 'c' })
      await user1.updateProfile({ handle: 'aaac11', firstName: 'b', lastName: 'c' })
      const data = user1.profile!
      expect(data.handle).to.be.equal('aaac11')
      expect(data.firstName).to.be.equal('b')
      expect(data.lastName).to.be.equal('c')
      await user1.updateProfile({ handle: 'aaacc11' })
      expect(data.handle).to.be.equal('aaacc11')
      expect(data.firstName).to.be.equal('b')
      expect(data.lastName).to.be.equal('c')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('make them friends', async done => {
    expect(user1.roster.length).to.be.equal(0)
    expect(user2.roster.length).to.be.equal(0)
    await user1.addToRoster(user2.username!)
    await user2.addToRoster(user1.username!)
    when(
      () => user1.roster.length === 1 && user2.roster.length === 1,
      () => {
        expect(user1.roster[0].user).to.be.equal(user2.username)
        expect(user2.roster[0].user).to.be.equal(user1.username)
        // check profile is online
        when(() => user2.roster[0].status === 'available', done)
      }
    )
  })
  it('send message', async done => {
    user1.sendMessage({ body: 'hello', to: user2.username })
    const from = `${user1.username}@${user1.host}/testing`
    when(() => user2.message.body === 'hello' && user2.message.from === from, done)
  })
  it('check profile status', async done => {
    try {
      await user2.disconnect()
      expect(user2.profile!.status).to.be.equal('unavailable')
      when(() => user1.roster[0].status === 'unavailable', done)
    } catch (e) {
      done(e)
    }
  })
  it('check roster', async done => {
    try {
      await user2.login()
      when(
        () => user2.roster.length === 1,
        () => {
          expect(user2.roster[0].user === user1.username)
          expect(user2.roster[0].status === 'available')
          done()
        }
      )
    } catch (e) {
      done(e)
    }
  })
  after('remove', async () => {
    await user1.remove()
    await user2.remove()
    expect(user1.connected).to.be.false
    expect(user2.connected).to.be.false
    // destroy(user1)
    // destroy(user2)
  })
})
