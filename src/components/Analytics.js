import Mixpanel from 'react-native-mixpanel';
import {settings, k} from '../globals';
import {autorun} from 'mobx';
import model from '../model/model';

class Analytics {
  init(){
    Mixpanel.sharedInstanceWithToken(settings.isStaging ? '5ee41c4ec134d9c7d769d9ddf41ed8eb': '3f62ffcf7a8fc0100157f877af5668a6');
    
    autorun(()=>{
      if (model.profile && model.profile.loaded){
        Mixpanel.identify(model.user + model.resource);
        Mixpanel.set({
          "$email": model.profile.email,
          "firstName": model.profile.firstName,
          "lastName": model.profile.lastName,
          "phone": model.profile.phoneNumber,
          "username": model.profile.handle,
        });
        Mixpanel.track("profile loaded");
      }
    });
  }
}


export default new Analytics();