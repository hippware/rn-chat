import React from 'react'
import OnboardingFindFriendsList from '../../../src/components/Onboarding/OnboardingFindFriendsList'
import {Provider} from 'mobx-react/native'
import ContactStore, {MyContact} from '../../../src/store/ContactStore'
import {observable} from 'mobx'
import {Profile} from 'wocky-client'

const contacts: any[] = require('./contacts.json')

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

class MockStore implements ContactStore {
  @observable loading: boolean = false

  readonly contacts = observable.array<MyContact>([])
  wocky

  requestPermission = async () => {
    // noop
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

  inviteContact = async (contact: MyContact) => {
    await sleep(1000)
    contact.smsSent = true
  }
}

const contactStore = new MockStore()

// tslint:disable-next-line
export default class MockFindFriends extends React.Component {
  componentDidMount() {
    contactStore.loadContacts()
  }

  render() {
    return (
      <Provider contactStore={contactStore}>
        <OnboardingFindFriendsList onPress={emptyFn} />
      </Provider>
    )
  }
}
