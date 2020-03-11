import React, {useEffect} from 'react'
import OnboardingFindFriendsList from '../../../src/components/Onboarding/OnboardingFindFriendsList'
import {Provider} from 'mobx-react'
import {MyContact} from '../../../src/store/ContactStore'
import {observable, computed} from 'mobx'
import {Profile} from 'wocky-client'
import ContactInviteList from '../../../src/components/people-lists/ContactInviteList'

const contacts: any[] = require('./contacts.json')
// const contacts: any[] = require('./contactsMiranda2.json')

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function emptyFn() {
  /* noop */
}

const wocky = {
  userBulkLookup: async phoneNumbers => {
    const data = require('./bulkResult.json')
    data.forEach(d => {
      if (d.user) {
        d.user = Profile.create(d.user)
      }
    })
    return data
  },
}

class MockStore /* implements ContactStore */ {
  @observable loading: boolean = false

  readonly contacts = observable.array<MyContact>([])
  wocky

  @computed
  get sortedContacts() {
    console.log('& sorted contacts', this.contacts.slice())
    // ensure the contact has an assigned phone #, either a first or last name, and is not already a friend
    const filtered = this.contacts
      .slice()
      .filter(
        c =>
          c.contact.phoneNumbers.length > 0 &&
          (c.contact.familyName || c.contact.givenName) &&
          c.relationship !== 'FRIEND'
      )

    // sort alphabetically by first name (or last name if no first name)
    return filtered.sort((a, b) => {
      return a.displayName > b.displayName ? 1 : -1
    })
  }

  requestPermission = async () => {
    return true
  }

  loadContacts = async () => {
    this.loading = true
    await sleep(1000)
    this.contacts.replace(contacts.map(c => new MyContact(c)))
    const phoneNumbers = contacts.reduce<string[]>((prev, current) => {
      return [...prev, ...current.phoneNumbers.map(p => p.number)]
    }, [])

    const bulkResult = await wocky!.userBulkLookup(phoneNumbers)

    bulkResult.forEach(r => {
      // find the associated contact from the phoneNumber
      const contact = this.contacts.find(c =>
        c.contact.phoneNumbers.map(pn => pn.number).includes(r.phoneNumber)
      )

      // update the contact with the bulk result
      if (contact) {
        contact.updateWithBulkData(r)
      }
    })
    // todo: process error?
    this.loading = false
  }

  lookupPhoneNumbers = async () => {
    // noop
  }

  inviteContact = async (contact: MyContact) => {
    await sleep(1000)
    contact.smsSent = true
  }
}

const contactStore = new MockStore()
const homeStore = {}

export const MockFindFriendsList = ({onboarding}: {onboarding: boolean}) => {
  useEffect(() => {
    contactStore.loadContacts()
  }, [])
  return (
    <Provider contactStore={contactStore} homeStore={homeStore}>
      {onboarding ? <OnboardingFindFriendsList onPress={emptyFn} /> : <ContactInviteList />}
    </Provider>
  )
}
