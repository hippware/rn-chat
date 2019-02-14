import {observable, action, computed} from 'mobx'
import {IWocky, IProfile} from 'wocky-client'
import RNContacts, {Contact, PhoneNumber} from 'react-native-contacts'

// todo: revisit these labels with the Android port
const labelPrecedence = ['main', 'mobile', 'iPhone', 'home', 'work', 'other']
// const labelExclude = ['home fax', 'work fax']

function isMoreImportant(phoneNew: PhoneNumber, phoneExisting: PhoneNumber): boolean {
  let precNew = labelPrecedence.indexOf(phoneNew.label)
  let precOld = labelPrecedence.indexOf(phoneExisting.label)

  // correct for non-existent labels
  precNew = precNew > -1 ? precNew : 1000
  precOld = precOld > -1 ? precOld : 1000

  return precNew < precOld
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
    // short circuit if we already have a profile
    if (this.profile) return

    if (bulkData.user) {
      this.profile = bulkData.user
      this.relationship = bulkData.relationship
    }

    const num = this.contact.phoneNumbers.find(n => n.number === bulkData.phoneNumber)
    if (this.phoneNumber) {
      if (num && isMoreImportant(num, this.phoneNumber)) {
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

  @computed
  get sortedContacts() {
    return this.contacts.slice().sort((a, b) => {
      if (a.relationship && !b.relationship) {
        return -100
      } else if (b.relationship && !a.relationship) {
        return 100
      } else if (a.relationship && b.relationship) {
        const relationshipPriorities = ['FRIEND', 'INVITED', 'INVITED_BY', 'NONE', 'SELF']
        return (
          relationshipPriorities.indexOf(a.relationship!) -
          relationshipPriorities.indexOf(b.relationship!)
        )
      } else {
        return 0
      }
    })
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
        this.contacts.replace(contacts.map(c => new MyContact(c)))
        const phoneNumbers = contacts.reduce<string[]>((prev, current) => {
          return [...prev, ...current.phoneNumbers.map(p => p.number)]
        }, [])

        const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
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
    contact.smsSent = true
  }
}

export default ContactStore
