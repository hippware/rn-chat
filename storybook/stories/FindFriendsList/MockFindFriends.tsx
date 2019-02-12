import React from 'react'
import OnboardingFindFriendsList from '../../../src/components/Onboarding/OnboardingFindFriendsList'
import {Provider} from 'mobx-react/native'
import ContactStore, {MyContact} from '../../../src/store/ContactStore'
import {observable} from 'mobx'
import {IWocky} from 'wocky-client'

const contacts: any[] = require('./contacts.json')

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function emptyFn() {
  /* noop */
}

const mockWocky = {
  async userBulkLookup() {
    return require('./bulkResult.json')
  },
}

class MockStore implements ContactStore {
  @observable loading: boolean = false

  readonly contacts = observable.array<MyContact>([])
  wocky: IWocky | undefined

  constructor(wocky: IWocky) {
    this.wocky = wocky
  }

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

    // console.log('& loadContacts: phoneNumbers: ', phoneNumbers)

    const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
    // console.log('& bulkResult: ', bulkResult)
    // // console.log('& my contacts: ', this.contacts.slice())
    // bulkResult.forEach(r => {
    //   // find the associated contact from the phoneNumber
    //   const contact = this.contacts.find(c =>
    //     c.contact.phoneNumbers.map(pn => pn.number).includes(r.phoneNumber)
    //   )

    //   // update the contact with the bulk result
    //   if (contact) {
    //     contact.updateWithBulkData(r)
    //   }
    // })
    // todo: process error?
    this.loading = false
  }
}

const contactStore = new MockStore(mockWocky as any)

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
