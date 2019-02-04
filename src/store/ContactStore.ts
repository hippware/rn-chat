import {observable, action, computed} from 'mobx'
import {IWocky, IProfile} from 'wocky-client'
import RNContacts, {Contact} from 'react-native-contacts'

const phoneNumberLabelsPrecedence = ['main', 'mobile', 'iPhone', 'home', 'work', 'other']
const phoneNumberExcludedLabels = ['home fax', 'work fax']

// tslint:disable:max-classes-per-file

export class MyContact {
  @observable profile: IProfile | undefined
  contact: Contact
  phoneNumber: string
  e164PhoneNumber: string

  constructor(contact: Contact, phoneNumber = '', e164PhoneNumber = '') {
    this.contact = contact
    this.phoneNumber = phoneNumber
    this.e164PhoneNumber = e164PhoneNumber
  }

  @computed
  get thumbnailPath(): string | undefined {
    return this.profile && this.profile.avatar && this.profile.avatar.thumbnail
      ? this.profile.avatar.thumbnail.uri
      : this.contact.thumbnailPath
  }

  @action
  setProfile(profile: IProfile) {
    this.profile = profile
  }
}

class ContactStore {
  @observable loading: boolean = false
  readonly contacts = observable.array<MyContact>([])
  wocky: IWocky | undefined

  constructor(wocky: IWocky) {
    this.wocky = wocky
  }

  requestPermission = async () => {
    return new Promise<void>((resolve, reject) => {
      RNContacts.requestPermission((error, result) => {
        if (!error && result === 'authorized') {
          resolve()
        } else {
          reject(error)
        }
      })
    })
  }

  loadContacts = async () => {
    this.loading = true
    RNContacts.getAll(async (error, contacts) => {
      if (!error) {
        /*
        contacts.push({
          givenName: 'a',
          phoneNumbers: [{label: 'blah', number: '+61404378363'}]
        })
        contacts.push({
          givenName: 'b',
          phoneNumbers: [{label: 'blah', number: '+1555025663'}]
        })
        contacts.push({
          givenName: 'abc',
          phoneNumbers: [
            {label: 'foo', number: '+61404378363'},
            {label: 'bar', number: '+1555025663'}
          ]
        })
        console.log('loadContacts: contacts: ', contacts)
        */

        const phoneNumbers = contacts.reduce<string[]>((prev, current) => {
          return [...prev, ...current.phoneNumbers.map(p => p.number)]
        }, [])

        // console.log('loadContacts: phoneNumbers: ', phoneNumbers)

        const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
        const lookupResult = []
        bulkResult.forEach(item => {
          // Todo: Remove condition once wocky #2207 is fixed
          if (item) lookupResult[item.phoneNumber] = item
        })

        // console.log('loadContacts: lookupResult: ', lookupResult)

        // Use an object so as to avoid duplicates
        const map = {}
        contacts.forEach(contact => {
          // Create a contact for each account, if any
          let hasAccount = false
          contact.phoneNumbers.forEach(item => {
            // ToDo: Skip account if itself
            if (lookupResult[item.number].user) {
              const myContact = new MyContact(contact)
              myContact.setProfile(lookupResult[item.number].user)
              map[lookupResult[item.number].user.id] = myContact
              hasAccount = true
            }
          })

          // If there are any accounts, don't process any more
          if (hasAccount) return

          // Pick a phone number according to (complex?) business logic
          let phoneNumber: string = ''

          const phoneNumbersByLabel = []
          contact.phoneNumbers.forEach(item => {
            phoneNumbersByLabel[item.label] = item.number
          })

          // Pick the first phone number with a priority label
          for (const label of phoneNumberLabelsPrecedence) {
            if (phoneNumbersByLabel[label]) {
              phoneNumber = phoneNumbersByLabel[label]
              break
            }
          }

          // If no priority label. Pick the first non-excluded number
          if (!phoneNumber) {
            for (const item of contact.phoneNumbers) {
              if (!phoneNumberExcludedLabels.includes(item.label)) {
                phoneNumber = item.number
                break
              }
            }
          }

          if (phoneNumber) {
            const myContact = new MyContact(
              contact,
              phoneNumber,
              lookupResult[phoneNumber].e164PhoneNumber
            )
            map[phoneNumber] = myContact
          }
        })

        const myContacts = Object.values(map).sort((a, b) => {
          if (a.profile) {
            if (b.profile) {
              // a.profile && b.profile
              return a.profile.handle.localeCompare(b.profile.handle)
            } else {
              // a.profile && !b.profile
              return -1
            }
          } else if (b.profile) {
            // !a.profile && b.profile
            return 1
          } else {
            // !a.profile && !b.profile
            return `${a.contact.givenName} ${a.contact.givenName}`.localeCompare(
              `${b.contact.givenName} ${b.contact.givenName}`
            )
          }
        })

        this.contacts.replace(myContacts)

        // console.log('loadContacts: this.contacts: ', this.contacts)
      }
      // todo: process error?
      this.loading = false
    })
  }
}

export default ContactStore
