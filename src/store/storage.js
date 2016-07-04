import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize} from 'serializr';
import {Model} from '../model/model';

let Provider;
if (USE_IOS_XMPP){
  console.log("real RealmStore");
  Provider = require('./storage/RealmStore').default;
} else {
  console.log("mock AsyncStorage");
  Provider = require('./storage/TestStorage').default;
}

@autobind
class Storage {
  provider = new Provider();
  
  load(){
    return new Promise((resolve, reject) => {
      const res = this.provider.load();
      if (!res){
        reject();
      } else {
        const model = deserialize(Model, res);
        if (model.user && model.password && model.server){
          resolve(model);
        } else {
          reject();
        }
      }
    });
  }
  
  save(data){
    console.log("SAVE:", data);
    this.provider.save(data);
    return data;
  }
}

export default new Storage();