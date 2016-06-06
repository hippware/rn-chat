import LocalStoreStorage from './LocalStorageStore';
import ProfileStore from './ProfileStore';
import LocationStore from './LocationStore';
import FileStore from './FileStore';
import XmppStore from './XmppStore';
import MessageStore from './MessageStore';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import FriendStore from './FriendStore';

import autobind from 'autobind-decorator';

@autobind
export default class RootStore {
  static constitute() {
    return [Model, FileStore, XMPP, LocationStore, ProfileStore, XmppStore, MessageStore, LocalStoreStorage,
      FriendStore];
  }
  model: Model;
  file: FileStore;
  xmppStore: XmppStore;
  xmpp: XMPP;
  location: LocationStore;
  profile: ProfileStore;
  message: MessageStore;
  localStorage: LocalStoreStorage;
  friend: FriendStore;
  
  constructor(model, file, xmpp, location, profile, xmppStore, message, localStorage, friend){
    this.model = model;
    this.file = file;
    this.xmpp = xmpp;
    this.location = location;
    this.profile = profile;
    this.xmppStore = xmppStore;
    this.message = message;
    this.localStorage = localStorage;
    this.friend = friend;
  }
}
