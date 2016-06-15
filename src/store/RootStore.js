import {USE_IOS_XMPP} from '../globals';

var Storage;
if (USE_IOS_XMPP){
  console.log("real RealmStore");
  Storage = require('./RealmStore').default;
} else {
  console.log("mock AsyncStorage");
  Storage = class {setItem(x,d){console.log("setItem:", x, d)} getItem(){}}
}
import LocalStoreStorage from './LocalStorageStore';
import ProfileStore from './ProfileStore';
import LocationStore from './LocationStore';
import FileStore from './FileStore';
import XmppStore from './XmppStore';
import MessageStore from './MessageStore';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import FriendStore from './FriendStore';
import SearchStore from './SearchStore';

import autobind from 'autobind-decorator';

@autobind
export default class RootStore {
  static constitute() {
    return [Model, FileStore, XMPP, LocationStore, ProfileStore, XmppStore, MessageStore, Storage,
      FriendStore, SearchStore];
  }
  model: Model;
  file: FileStore;
  xmppStore: XmppStore;
  xmpp: XMPP;
  location: LocationStore;
  profile: ProfileStore;
  message: MessageStore;
  storage;
  friend: FriendStore;
  search: SearchStore;
  
  constructor(model, file, xmpp, location, profile, xmppStore, message, storage, friend, search){
    this.model = model;
    this.file = file;
    this.xmpp = xmpp;
    this.location = location;
    this.profile = profile;
    this.xmppStore = xmppStore;
    this.message = message;
    this.storage = storage;
    this.friend = friend;
    this.search = search;
  }
}
