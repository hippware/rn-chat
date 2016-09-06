import autobind from 'autobind-decorator';
import Profile from '../model/Profile';

@autobind
class ProfileFactory {
  profiles: {string: Profile} = {};
  
  
  create = (user, data) => {
    console.log("PROFILE CREATE", user, JSON.stringify(data));
    if (!this.profiles[user]){
      this.profiles[user] = new Profile(user);
    }
    if (data){
      this.profiles[user].load(data);
    }
    return this.profiles[user];
  };
  
}

export default new ProfileFactory()