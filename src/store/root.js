import LocalStoreStorage from './LocalStorageStore';
import ProfileStore from './ProfileStore';
import LocationStore from './LocationStore';
import FileStore from './FileStore';
import XmppStore from './XmppStore';
import MessageStore from './MessageStore';
import Model from '../model/Model';

const model: Model = new Model();
const location: LocationStore = new LocationStore(model);
const file: FileStore = new FileStore(model);
const profile: ProfileStore = new ProfileStore(model, file);
const xmpp: XmppStore = new XmppStore(model);
const message: MessageStore = new MessageStore(model, profile, file);
const localstorage: LocalStoreStorage = new LocalStoreStorage(model, profile);

export {
  model,
  localstorage,
  profile,
  location,
  xmpp,
  message,
  file
}
