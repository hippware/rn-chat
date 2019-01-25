import {observable, action, computed} from 'mobx'
import {IWocky, IProfile} from 'wocky-client'
import RNContacts, {Contact} from 'react-native-contacts'

// tslint:disable:max-classes-per-file

export class MyContact {
  @observable profile: IProfile | undefined
  contact: Contact

  constructor(contact: Contact) {
    this.contact = contact
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
        console.log(contacts)
        this.contacts.replace(contacts.map(c => new MyContact(c)))
        const phoneNumbers = this.contacts.reduce<string[]>((prev, current) => {
          return [...prev, ...current.contact.phoneNumbers.map(p => p.number)]
        }, [])

        // todo: uncomment once Bernard figures out what's bombing
        const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
        console.log('result', bulkResult)

        // todo: loop through bulkResult and update this.contacts accordingly
      }
      // todo: process error?
      this.loading = false
    })
  }
}

export default ContactStore
