import {observable, computed} from 'mobx'
import validate from 'validate.js'
import {ValidateItem} from './ValidateItem'
export {ValidateItem} from './ValidateItem'

// eslint-disable-next-line
const isAlphabet = '^\\pL[ 0-9`\'"\u0060\u00B4\u2018\u2019\u201C\u201D\\pL]*[\\pL0-9]?$'

const profileConstraints = {
  handle: {
    length: {
      minimum: 3,
      maximum: 16,
      message: 'must be 3 - 16 characters',
    },
    format: {
      pattern: /\w+/,
      message: 'can only contain alphanumeric characters and _',
    },
    // this validator set in SearchStore.js
    usernameUniqueValidator: true,
  },
  firstName: {
    format: {
      pattern: isAlphabet,
      message: 'is invalid',
    },
    length: {
      minimum: 1,
      maximum: 32,
      message: 'must be 1 - 32 characters',
    },
  },
  lastName: {
    format: {
      pattern: isAlphabet,
      message: 'is invalid',
    },
    length: {
      minimum: 1,
      maximum: 32,
      message: 'must be 1 - 32 characters',
    },
  },
  email: {
    email: true,
    length: {
      maximum: 254,
      message: 'must be less than 254 characters',
    },
  },
}

export const validateProfile = async (profileObject: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    validate.async(profileObject, profileConstraints).then(res => resolve(res), res => reject(res))
  })
}

type VProfileType = {
  handle?: string
  firstName?: string
  lastName?: string
  email?: string
}

export class ValidatableProfile {
  @observable handle?: ValidateItem
  @observable firstName?: ValidateItem
  @observable lastName?: ValidateItem
  @observable email?: ValidateItem

  constructor(obj: VProfileType) {
    Object.keys(obj).forEach(key => {
      if (['handle', 'firstName', 'lastName', 'email'].includes(key)) {
        this[key] = new ValidateItem(key, obj[key], validateProfile)
      }
    })
  }

  @computed
  get isValid(): boolean {
    return (
      !!this.handle!.isValid &&
      !!this.firstName!.isValid &&
      !!this.lastName!.isValid &&
      !!this.email!.isValid
    )
  }

  get asObject(): any {
    return {
      handle: this.handle!.value,
      firstName: this.firstName!.value,
      lastName: this.lastName!.value,
      email: this.email!.value,
    }
  }
}
