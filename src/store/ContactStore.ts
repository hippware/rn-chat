import {observable, action, computed} from 'mobx'
import {IWocky, IProfile} from 'wocky-client'
import RNContacts, {Contact, PhoneNumber} from 'react-native-contacts'

const phoneNumberLabelsPrecedence = ['main', 'mobile', 'iPhone', 'home', 'work', 'other']
const phoneNumberExcludedLabels = ['home fax', 'work fax']

function phoneIsMoreImportant(phoneNew: PhoneNumber, phoneExisting: PhoneNumber): boolean {
  // todo
  // phoneNumberLabelsPrecedence.indexOf(num.label) < phoneNumberLabelsPrecedence.indexOf(this.phoneNumber.label)
  return true
}

export type UserContactRelationship = 'FRIEND' | 'INVITED' | 'INVITED_BY' | 'NONE' | 'SELF' | null

type BulkData = {
  e164PhoneNumber: string
  phoneNumber: string
  relationship: UserContactRelationship
  user?: IProfile
}

// tslint:disable:max-classes-per-file

export class MyContact {
  @observable profile?: IProfile
  @observable relationship: UserContactRelationship = null
  @observable smsSent: boolean = false
  contact: Contact
  // phoneNumber?: string
  // e164PhoneNumber?: string
  phoneNumber?: PhoneNumber

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
  updateWithBulkData(bulkData: BulkData) {
    // console.log('& update for', bulkData, this.contact)

    // short circuit if we already have a profile
    if (this.profile) return

    if (bulkData.user) {
      console.log('& user', bulkData.user)
      this.profile = bulkData.user
      this.relationship = bulkData.relationship
    }

    const num = this.contact.phoneNumbers.find(n => n.number === bulkData.phoneNumber)
    if (this.phoneNumber) {
      if (num && num.label && phoneIsMoreImportant(num, this.phoneNumber)) {
        this.phoneNumber = num
      }
    } else {
      this.phoneNumber = num
    }
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
        // console.log('& raw contacts', JSON.stringify(contacts))
        this.contacts.replace(contacts.map(c => new MyContact(c)))
        const phoneNumbers = contacts.reduce<string[]>((prev, current) => {
          return [...prev, ...current.phoneNumbers.map(p => p.number)]
        }, [])

        // console.log('& loadContacts: phoneNumbers: ', phoneNumbers)

        const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
        // console.log('& bulkResult: ', JSON.stringify(bulkResult))
        // console.log('& my contacts: ', this.contacts.slice())
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
      }
      // todo: process error?
      this.loading = false
    })
  }

  async inviteContact(contact: MyContact) {
    await this.wocky!.friendSmsInvite(contact.phoneNumber!.number)
    console.log('& invited')
    contact.smsSent = true
  }
}

export default ContactStore
