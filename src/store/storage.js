import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize} from 'serializr';
import model, {Model} from '../model/model';
import {autorunAsync} from 'mobx';
let Provider;
if (USE_IOS_XMPP){
  console.log("real RealmStore");
  Provider = require('./storage/LocalStorageStore').default;
//  Provider = require('./storage/RealmStore').default;
} else {
  console.log("mock AsyncStorage");
  Provider = require('./storage/TestStorage').default;
}

@autobind
class Storage {
  provider = new Provider();
  
  async load(){
    autorunAsync(()=> {
//      console.log("MODEL CHANGE:", serialize(model));
      this.provider.save(serialize(model));
      //this.provider.save({});
    });
    
    const res = await this.provider.load();
//    console.log("LOADED:", res);
    const d = deserialize(Model, res) || {};
    for (let key of Object.keys(d)){
      model[key] = d[key];
    }
    if (!model.user || !model.password || !model.server){
      throw '';
    }
    return model;
  }
  
  save(){
//    this.provider.save(serialize(model));
    //model.clear();
    return model;
  }
}

export default new Storage();