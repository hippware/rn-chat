import {USE_IOS_XMPP} from '../globals';

var Storage;
if (USE_IOS_XMPP){
  console.log("real RealmStore");
  Storage = require('./RealmStore').default;
} else {
  console.log("mock AsyncStorage");
  Storage = require('./TestStorage').default;
}

export default Storage;