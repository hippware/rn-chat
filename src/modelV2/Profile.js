// @flow

import {types} from 'mobx-state-tree';
import File from './File';

const Profile = types.model('Profile', {
  id: types.identifier(types.string),
  firstName: '',
  lastName: '',
  handle: '',
  // tagline: string,
  avatar: types.maybe(File),
  email: '',
  error: '',
  phoneNumber: '',
  // location: Location,
  loaded: false,
  isFollower: false,
  isFollowed: false,
  isNew: false,
  isBlocked: false,
  hidePosts: false,
  // status: string,
  // followersSize: ?number = undefined,
  // botsSize: ?number = undefined,
  // isValid: boolean = false,
  // roles: IObservableArray<string> = observable([]),
  // handler: ?Function,
});

export default Profile;
