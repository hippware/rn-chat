import {createModelSchema, child} from 'serializr';
import {action, when, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Location from './Location';
import File from './File';
import model from './model';
import file from '../store/fileStore';
import profile from '../store/profileStore';
import autobind from 'autobind-decorator';
import * as log from '../utils/log';
import {validate, validateAll} from 'validate-model';

const isLength = {validator: 'isLength', arguments: [1, 20], message: '{TITLE} must be 1 - 20 characters'};
const matches = {validator: 'matches', arguments: /^[ \w]+$/, message: '{TITLE} can only contain alphabet characters'};
const isLength35 = {validator: 'isLength', arguments: [1, 35], message: '{TITLE} must be 1 - 35 characters'};
const isEmail = {validator: 'isEmail', message: '{TITLE} is invalid'};

const validationModel = {
  handle: {
    title: 'Username',
    validate: [
      {validator: 'isLength', arguments: [3, 16], message: 'Username must be 3 - 16 characters'},
      {validator: 'isAlphanumeric', message: 'Username can only contain alphanumeric characters'},
    ],
  },
  firstName: {
    title: 'First Name',
    validate: [isLength, matches],
  },
  lastName: {
    title: 'First Name',
    validate: [isLength, matches],
  },
  email: {
    title: 'Email',
    validate: [isEmail, isLength35],
  },
};

@autobind
export default class Profile {
  user: string;
  @observable firstName: string;
  @observable lastName: string;
  @observable handle: string;
  @observable tagline: string;
  @observable avatar: File = null;
  @observable email: string;
  @observable error: string;
  @observable phoneNumber: string;
  @observable location: Location;
  @observable loaded: boolean = false;
  @observable isFollower: boolean = false;
  @observable isFollowed: boolean = false;
  @observable isNew: boolean = false;
  @observable isBlocked: boolean = false;
  @observable hidePosts: boolean = false;
  @observable status: string;
  @observable botSize: number = undefined;
  @observable followersSize: number = undefined;
  @observable botsSize: number = undefined;
  @observable isValid: boolean = false;

  @computed get isMutual(): boolean {
    return this.isFollower && this.isFollowed;
  }

  get isOwn() {
    return model.profile && model.user === this.user;
  }

  constructor(user, data) {
    // assert(user, "user must be defined");

    try {
      this.user = user;
      if (data) {
        this.load(data);
      } else if (user) {
        when('Profile.when', () => model.profile && model.connected, this.download);
      }
    } catch (e) {
      console.error('ERROR!', e);
    }
  }

  @action download() {
    profile
      .request(this.user, this.isOwn)
      .then(data => {
        this.load(data);
      })
      .catch(e => log.log('PROFILE REQUEST ERROR:', e));
  }

  @action load = (data = {}) => {
    for (let key of Object.keys(data)) {
      if (key === 'avatar') {
        if (data.avatar && typeof data.avatar === 'string') {
          this.avatar = file.create(data.avatar + '-thumbnail');
        }
      } else {
        this[key] = data[key];
      }
    }
    this.loaded = true;
  };
  /**
   * Validates this object
   * @param name name of attribute
   * @returns {valid, messages}
   */
  validate(name: string) {
    if (name) {
      if (!validationModel[name]) {
        return {valid: true};
      }
      const res = validate(validationModel[name], this[name]);
      const {valid} = validateAll(validationModel, this);
      this.isValid = valid;
      return res;
    }
  }
  @computed get displayName(): string {
    if (this.firstName && this.lastName) {
      return this.firstName + ' ' + this.lastName;
    }
    if (this.firstName) {
      return this.firstName;
    } else if (this.lastName) {
      return this.lastName;
    } else if (this.handle) {
      return this.handle;
    } else {
      return ' '; // this.user;
    }
  }
}

Profile.schema = {
  name: 'Profile',
  primaryKey: 'user',
  properties: {
    firstName: {type: 'string', optional: true},
    lastName: {type: 'string', optional: true},
    email: {type: 'string', optional: true},
    handle: {type: 'string', optional: true},
    phoneNumber: {type: 'string', optional: true},
    isNew: {type: 'bool', optional: true},
    isBlocked: {type: 'bool', optional: true},
    isFollower: {type: 'bool', optional: true},
    isFollowed: {type: 'bool', optional: true},
    avatar: {type: 'File', optional: true},
    user: 'string',
  },
};

createModelSchema(Profile, {
  user: true,
  handle: true,
  tagline: true,
  loaded: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  isNew: true,
  isBlocked: true,
  isFollower: true,
  isFollowed: true,
  hidePosts: true,
  botsSize: true,
  followersSize: true,
  followedSize: true,
  avatar: child(File),
});

Profile.serializeInfo.factory = context => profile.create(context.json.user, context.json);
