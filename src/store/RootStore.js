import Storage from './Storage';
import ProfileStore from './ProfileStore';
import LocationStore from './LocationStore';
import FileStore from './FileStore';
import MessageStore from './MessageStore';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import FriendStore from './FriendStore';
import SearchStore from './SearchStore';
import StateStore from './StateStore';
import autobind from 'autobind-decorator';

@autobind
export default class RootStore {
  static constitute() {
    return [Model, FileStore, XMPP, LocationStore, ProfileStore, MessageStore, Storage,
      FriendStore, SearchStore];
  }
  model: Model;
  file: FileStore;
  xmpp: XMPP;
  location: LocationStore;
  profile: ProfileStore;
  message: MessageStore;
  storage;
  friend: FriendStore;
  search: SearchStore;
  
  constructor(model, file, xmpp, location, profile, message, storage, friend, search){
    this.model = model;
    this.file = file;
    this.xmpp = xmpp;
    this.location = location;
    this.profile = profile;
    this.message = message;
    this.storage = storage;
    this.friend = friend;
    this.search = search;
    this.state = new StateStore(this); 
  }
}
