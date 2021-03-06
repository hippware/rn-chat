import {observable, action, computed} from 'mobx'
import {IWocky, IProfile, FriendShareTypeEnum} from 'src/wocky'
import RNContacts, {Contact, PhoneNumber} from 'react-native-contacts'
import {log} from 'src/utils/logger'
import {PermissionsAndroid, Platform} from 'react-native'
import {parsePhoneNumberFromString} from 'libphonenumber-js'

// todo: revisit these labels with the Android port
const labelPrecedence = ['main', 'mobile', 'iPhone', 'home', 'work', 'other']

function isMoreImportant(phoneNew: PhoneNumber, phoneExisting: PhoneNumber): boolean {
  let precNew = labelPrecedence.indexOf(phoneNew.label)
  let precOld = labelPrecedence.indexOf(phoneExisting.label)

  // correct for non-existent labels
  precNew = precNew > -1 ? precNew : 1000
  precOld = precOld > -1 ? precOld : 1000

  return precNew < precOld
}

type UserContactRelationship = 'FRIEND' | 'INVITED' | 'INVITED_BY' | 'NONE' | 'SELF' | null

const CONTACTS_MAX = 100

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
  @observable phoneNumber?: PhoneNumber

  constructor(contact: Contact) {
    this.contact = contact
  }

  @computed
  get thumbnailPath(): string | undefined {
    return this.profile && this.profile.avatar && this.profile.avatar.thumbnail
      ? this.profile.avatar.thumbnail.uri
      : this.contact.thumbnailPath
  }

  @computed
  get displayName(): string {
    const parts: string[] = []
    if (this.contact.givenName) parts.push(this.contact.givenName)
    if (this.contact.familyName) parts.push(this.contact.familyName)
    return parts.join(' ').trim()
  }

  @computed
  get displayNameSingle(): string {
    return this.displayName.split(' ')[0]
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
    const formatted = parsePhoneNumberFromString(bulkData.e164PhoneNumber)
    if (this.phoneNumber) {
      if (num && isMoreImportant(num, this.phoneNumber)) {
        this.phoneNumber = {
          ...num,
          number: formatted ? formatted.formatInternational() : bulkData.e164PhoneNumber,
        }
      }
    } else if (num) {
      this.phoneNumber = {
        ...num,
        number: formatted ? formatted.formatInternational() : bulkData.e164PhoneNumber,
      }
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
    /*
      ensure the contact fits the following criteria:
      1. has at least 1 phone #
      2. has either a first or last name
      3. has a matched phone number (in case the phone # is shared with a different contact)
    */

    const filtered = this.contacts
      .slice()
      .filter(
        c =>
          c.contact.phoneNumbers.length > 0 &&
          (c.contact.familyName || c.contact.givenName) &&
          c.phoneNumber
      )

    // sort alphabetically by first name (or last name if no first name)
    return filtered.sort((a, b) => {
      return a.displayName > b.displayName ? 1 : -1
    })
  }

  private requestPermissionIOS = async () => {
    return new Promise<boolean>((resolve, reject) => {
      RNContacts.requestPermission((error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result === 'authorized')
        }
      })
    })
  }

  private requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Access Contacts',
      message: 'The contacts in your address book will be used to find friends on the app.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    })
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      log('Contacts permissions granted')
      return true
    } else {
      return false
    }
  }

  requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return this.requestPermissionIOS()
    } else {
      return this.requestPermissionAndroid()
    }
  }

  loadContacts = async () => {
    this.loading = true
    RNContacts.getAll(async (error, contacts) => {
      if (!error && contacts) {
        this.contacts.replace(contacts.map(c => new MyContact(c)))
        const phoneNumbers = contacts.reduce<string[]>((prev, current) => {
          return current.phoneNumbers ? [...prev, ...current.phoneNumbers.map(p => p.number)] : prev
        }, [])

        // chunk the requests to ensure that we do max 100 phone #s per request
        const promises: Array<Promise<void>> = []
        while (phoneNumbers.length) {
          promises.push(this.lookupPhoneNumbers(phoneNumbers.slice(0, CONTACTS_MAX - 1)))
          phoneNumbers.splice(0, CONTACTS_MAX - 1)
        }
        // todo: set this.loading to false after the first promise resolves?
        await Promise.all(promises)
      }
      // todo: process error?
      this.loading = false
    })
  }

  lookupPhoneNumbers = async (phoneNumbers: string[]): Promise<void> => {
    if (phoneNumbers.length > CONTACTS_MAX) {
      throw new Error(`cannot query more than ${CONTACTS_MAX} phone numbers at a time`)
    }
    const bulkResult = await this.wocky!.userBulkLookup(phoneNumbers)
    bulkResult.forEach(r => {
      // find the associated contact from the phoneNumber
      const contact = this.contacts.find(c => {
        return c.contact.phoneNumbers
          ? c.contact.phoneNumbers.map(pn => pn.number).includes(r.phoneNumber)
          : false
      })

      // update the contact with the bulk result
      if (contact) {
        contact.updateWithBulkData(r)
      }
    })
  }

  async inviteContact(contact: MyContact, shareType: FriendShareTypeEnum) {
    if (!contact.phoneNumber) return
    await this.wocky!.friendInvite(contact.phoneNumber!.number, shareType)
    contact.smsSent = true
  }
}

export default ContactStore
