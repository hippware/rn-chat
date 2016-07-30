import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import model, {Model} from '../model/model';
import {autorunAsync} from 'mobx';
import Chats from '../model/Chats';
import FriendList from '../model/FriendList';
import EventChat from '../model/EventChat';
import EventFriend from '../model/EventFriend';
import EventContainer from '../model/EventContainer';
import EventList from '../model/EventList';
import Profile from '../model/Profile';
import File from '../model/File';
import FileSource from '../model/FileSource';
import Chat from '../model/Chat';
import Message from '../model/Message';
import file from './file';
import message from './message';
import profile from './profile';

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
      this.provider.save(serialize(model));
      //this.provider.save({});
    });
    
    const res = await this.provider.load();
    const d = deserialize(Model, res) || {};
    // delete d.events;
    // delete d.chats;
    // delete d.friends;
    // for (let key of Object.keys(d)){
    //   model[key] = d[key];
    // }
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


