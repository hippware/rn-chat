// @flow

import autobind from 'autobind-decorator';
import Profile from '../model/Profile';

@autobind
class ProfileFactory {
  profiles: {[key: string]: Profile} = {};

  clear() {
    this.profiles = {};
  }

  create = (user: string, data?: Object, force?: boolean): Profile => {
    if (!this.profiles[user]) {
      this.profiles[user] = new Profile(user, data);
    } else if (force) {
      this.profiles[user].download();
    }
    if (data) {
      this.profiles[user].load(data);
    }
    return this.profiles[user];
  };
}

export default new ProfileFactory();
