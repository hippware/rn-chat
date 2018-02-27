// @flow

import {action, when, observable, computed, reaction} from 'mobx';
import validate from 'validate.js';

// eslint-disable-next-line
const isAlphabet = '^\\pL[ 0-9`\'"\u0060\u00B4\u2018\u2019\u201C\u201D\\pL]+[\\pL0-9]$';

const profileConstraints = {
  handle: {
    length: {
      minimum: 3,
      maximum: 16,
      message: 'must be 3 - 16 characters',
    },
    format: {
      pattern: /\w+/,
      message: 'can only contain alphanumeric characters',
    },
    // this validator set in SearchStore.js
    usernameUniqueValidator: true,
  },
  firstName: {
    format: {
      pattern: isAlphabet,
      message: 'can only contain alphabet characters',
    },
    length: {
      minimum: 1,
      maximum: 32,
      message: 'must be 1 - 20 characters',
    },
  },
  lastName: {
    format: {
      pattern: isAlphabet,
      message: 'can only contain alphabet characters',
    },
    length: {
      minimum: 1,
      maximum: 32,
      message: 'must be 1 - 20 characters',
    },
  },
  email: {
    email: true,
    length: {
      maximum: 254,
      message: 'is invalid',
    },
  },
};

export const validateProfile = async (profileObject: Object): Promise<Object> => {
  return new Promise((resolve, reject) => {
    validate.async(profileObject, profileConstraints).then(res => resolve(res), res => reject(res));
  });
};

export class ValidateItem {
  @observable errorMessage: string = '';
  @observable value: string;
  @observable isValid: ?boolean = undefined;
  key: string;

  constructor(key: string, value: string, validator: Function) {
    this.key = key;
    this.value = value;
    reaction(
      () => this.value,
      val =>
        validator({[this.key]: val})
          .then((r) => {
            this.isValid = true;
            this.errorMessage = '';
          })
          .catch((e) => {
            this.isValid = false;
            this.errorMessage = e[key][0];
          }),
    );
  }
}

type VProfileType = {
  handle: string,
  firstName: string,
  lastName: string,
  email: string,
};

export class ValidatableProfile {
  @observable handle: ValidateItem;
  @observable firstName: ValidateItem;
  @observable lastName: ValidateItem;
  @observable email: ValidateItem;

  constructor(obj: VProfileType) {
    Object.keys(obj).forEach((key) => {
      if (['handle', 'firstName', 'lastName', 'email'].includes(key)) {
        this[key] = new ValidateItem(key, obj[key], validateProfile);
      }
    });
  }

  @computed
  get isValid(): boolean {
    return !!this.handle.isValid && !!this.firstName.isValid && !!this.lastName.isValid && (!this.email.value || !!this.email.isValid);
  }

  get asObject(): Object {
    return {
      handle: this.handle.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
    };
  }
}
