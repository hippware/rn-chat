// @flow

import {types} from 'mobx-state-tree';
import File from './File';

const Profile = types
  .model('Profile', {
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
  })
  .actions((self) => {
    function load(data = {}) {
      Object.keys(data).forEach((key) => {
        if (key === 'avatar') {
          if (data.avatar && typeof data.avatar === 'string') {
            this.avatar = file.create(`${data.avatar}-thumbnail`);
          }
        } else if (key === 'roles') {
          if (data.roles) {
            const roles = typeof data.roles === 'string' ? [data.roles] : data.roles;
            this.roles.replace(roles);
          }
        } else {
          this[key] = data[key];
        }
      });
      // for (const key of Object.keys(data)) {
      //   if (key === 'avatar') {
      //     if (data.avatar && typeof data.avatar === 'string') {
      //       this.avatar = file.create(`${data.avatar}-thumbnail`);
      //     }
      //   } else if (key === 'roles') {
      //     if (data.roles) {
      //       const roles = typeof data.roles === 'string' ? [data.roles] : data.roles;
      //       this.roles.replace(roles);
      //     }
      //   } else {
      //     this[key] = data[key];
      //   }
      // }
      this.loaded = true;
    }
    return {load};
  });

export default Profile;
