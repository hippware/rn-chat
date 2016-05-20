import {USE_IOS_XMPP, HOST} from '../globals';
import Kefir from 'kefir';
import Atom from 'kefir.atom';
import Utils from './xmpp/utils';

let XmppConnect;
if (USE_IOS_XMPP){
  XmppConnect = require('./xmpp/XmppIOS').default;
} else {
  XmppConnect = require('./xmpp/XmppStrophe').default;
}
const provider = new XmppConnect(HOST);

export const iq = Kefir.stream(emitter => provider.onIQ = iq => emitter.emit(iq)).log('iq');
export const message = Kefir.stream(emitter => provider.onMessage = message => emitter.emit(message)).log('message');
export const presence = Kefir.stream(emitter => provider.onPresence = presence => emitter.emit(presence)).log('presence');

export function connect({user, password, host = HOST}) {
  return Kefir.stream(emitter => {
    provider.host = host;
    provider.onConnected = data => emitter.emit({user, password, host, connected: true});
    provider.onDisconnected = data => emitter.end();
    provider.onAuthFail = error => emitter.emit({connected: false, error});
    provider.login(user, password);
  });
}

export function disconnect() {
  provider.disconnect();
}

export function sendIQ(data){
  if (!data.tree().getAttribute('id')){
    data.tree().setAttribute('id', Utils.getUniqueId('iq'));
  }
  if (!data.tree().getAttribute('to')){
    data.tree().setAttribute('to', provider.host);
  }
  const id = data.tree().getAttribute('id');
  return new Promise((resolve, reject)=> {
    iq.filter(stanza => stanza.id == id).onValue(stanza => {
      if (stanza.type === "error"){
        reject(stanza.error);
      } else {
        resolve(stanza);
      }
    });
    provider.sendIQ(data);
  });
}

export function sendMessage(message){
  provider.sendMessage(message);
}

export function sendPresence(presence){
  provider.sendPresence(presence);
}

// export const connected = credentials.map(({user, password, host = HOST}) => Kefir.stream(emitter => {
//   console.log("USERNAME:", user);
//   let provider = new XmppConnect(host);
//   provider.onConnected = data => emitter.emit({connected:true, provider});
//   provider.onDisconnected = data => emitter.emit({disconnected: true});
//   provider.onAuthFail = error => {
//     let data = undefined;
//     if (error) {
//       try {
//         const xml = new DOMParser().parseFromString(error, "text/xml").documentElement;
//         data = Utils.parseXml(xml).failure;
//       } catch (e) {
//         reject(e);
//       }
//     }
//     emitter.emit({disconnected: true, error:data});
//   };
//   provider.login(user, password);
// })).log('connected');

// const iq = Kefir.stream(emitter => provider.onIQ = iq => emitter.emit(iq)).log('iq');
// const message = Kefir.stream(emitter => provider.onMessage = message => emitter.emit(message)).log('message');
// const presence = Kefir.stream(emitter => provider.onPresence = presence => emitter.emit(presence)).log('presence');

// export function disconnect(){
//   provider.disconnect();
// }
//
//
