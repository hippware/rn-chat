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
//      console.log("MODEL CHANGE:", serialize(model));
      this.provider.save(serialize(model));
      //this.provider.save({});
    });
    
    const res = await this.provider.load();
//    console.log("LOADED:", res);
    const d = deserialize(Model, res) || {};
    //delete d.events;
    //delete d.chats;
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

FileSource.schema = {
  name: 'FileSource',
  primaryKey: 'uri',
  properties: {
    uri: 'string',
    contentType: {type: 'string', optional: true},
    cached: {type: 'bool', optional: true},
  }
};


createModelSchema(FileSource, {
  uri: true,
  contentType: true,
  cached: true,
});

File.schema = {
  name: 'File',
  primaryKey: 'id',
  properties: {
    source: {type: 'FileSource', optional: true},
    width: {type: 'int', optional: true},
    height: {type: 'int', optional: true},
    id: 'string',
  }
};

createModelSchema(File, {
  id: true,
  source: child(FileSource),
  width: true,
  height: true,
});

File.serializeInfo.factory = (context) => file.create(context.json.id, context.json);

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
  }
};

createModelSchema(Profile, {
  user: true,
  handle: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  isNew: true,
  isBlocked: true,
  isFollower: true,
  isFollowed: true,
  avatar: child(File)
});
Profile.serializeInfo.factory = (context) => profile.create(context.json.user, context.json);

createModelSchema(Message, {
  id: true,
  from: child(Profile),
  to: true,
  media: child(File),
  unread: true,
  time: true,
  body: true,
  composing: true,
  paused: true,
});


createModelSchema(Chat, {
  id: true,
  _messages: list(child(Message)),
  participants: list(child(Profile)),
});
Chat.serializeInfo.factory = (context) => message.create(context.json.id);


createModelSchema(Chats, {
  _list: list(child(Chat)),
});


createModelSchema(FriendList, {
  _list: list(child(Profile)),
});

createModelSchema(EventChat, {
//  chat: child(Chat),
  chat: ref("id", (id, cb) =>cb(null, message.create(id)))
});
createModelSchema(EventFriend, {
  //profile: child(Profile),//ref("user", (user, cb) => cb(null, profile.create(user))),
  profile: ref("user", (user, cb) => cb(null, Profile.serializeInfo.factory({json:{user}}))),
  _time: true,
});
createModelSchema(EventContainer, {
  chat: child(EventChat),
  friend: child(EventFriend)
});

createModelSchema(EventList, {
  _list: list(child(EventContainer)),
});


createModelSchema(Model, {
  id: true,
  chats: child(Chats),
  friends: child(FriendList),
  profile: child(Profile),
  events: child(EventList),
  user: true,
  server: true,
  password: true,
});



