import {USE_IOS_XMPP, HOST, SERVICE} from '../globals';
var storage;
if (USE_IOS_XMPP){
  console.log("real AsyncStorage");
  storage = require('react-native').AsyncStorage;
} else {
  console.log("mock AsyncStorage");
  storage = {setItem:(x,d)=>{console.log("setItem:", x, d)}, getItem:()=>undefined}
}

export default storage;

