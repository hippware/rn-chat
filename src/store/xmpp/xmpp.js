import {USE_IOS_XMPP, settings, isTesting} from '../../globals';
import Kefir from 'kefir';
import Utils from './utils';
import assert from 'assert';
let XmppConnect;
if (USE_IOS_XMPP){
  XmppConnect = require('./XmppIOS').default;
} else {
  XmppConnect = require('./XmppStrophe').default;
}

const provider = new XmppConnect();
export const iq = Kefir.stream(emitter => provider.onIQ = iq => emitter.emit(iq)).log('iq');

export const message = Kefir.stream(emitter => provider.onMessage = message => emitter.emit(message)).log('message');

export const presence = Kefir.stream(emitter => provider.onPresence = presence => emitter.emit(presence)).log('presence');

export const disconnected = Kefir.stream(emitter =>
  provider.onDisconnected = () => emitter.emit({connected: false})).log('disconnected');

export const connected = Kefir.stream(emitter =>
  provider.onConnected = (user, password, server) => emitter.emit({user, password, server, connected:true})).log('connected');

export const authError = Kefir.stream(emitter => provider.onAuthFail = error => emitter.emit(error)).log('authError');

export function connect(user, password, host) {
  assert(user, "connect: user is not defined");
  assert(password, "connect: password is not defined");
  assert(host, "connect: host is not defined");
  
  console.log("connect::", user, password, host);
  return new Promise((resolve, reject)=> {
    const onConnected = data => {
      console.log("ACCEPT PROMISE");
      connected.offValue(onConnected);
      authError.offValue(onAuthError);
      resolve(data)
    };
    const onAuthError = error => {
      console.log("REJECT PROMISE:", error);
      
      authError.offValue(onAuthError);
      connected.offValue(onConnected);
      reject(error)
    };
    connected.onValue(onConnected);
    authError.onValue(onAuthError);
    provider.login(user, password, host);
  });
}

// registers/login given user
export async function register(resource, provider_data) {
  assert(resource, "resource should not be null");
  assert(provider_data, "provider_data should not be null");
  const host = isTesting || settings.isTesting ? 'testing.dev.tinyrobot.com' : 'staging.dev.tinyrobot.com';
  const user = 'register';
  const password = `$J$${JSON.stringify({provider: 'digits', resource, token: true, provider_data})}`;
  console.log("register::", resource, provider_data, password, host);
  try {
    await connect(user, password, host);
  } catch (error) {
    const xml = new DOMParser().parseFromString(error, "text/xml").documentElement;
    const data = Utils.parseXml(xml).failure;
    if ('redirect' in data) {
      const {user, server, token} = JSON.parse(data.text);
      assert(user, "register response doesn't contain user");
      assert(server, "register response doesn't contain server");
      assert(token, "register response doesn't contain token");
      return {user, server, password: token};
    } else {
      throw new Error(data.text);
    }
  }
}

export function disconnect() {
  return new Promise((resolve, reject)=> {
    const onDisconnected = data => {
      disconnected.offValue(onDisconnected);
      resolve(data)
    };
    disconnected.onValue(onDisconnected);
    provider.disconnect();
  });
}

export function sendIQ(data) {
  if (!data.tree().getAttribute('id')) {
    data.tree().setAttribute('id', Utils.getUniqueId('iq'));
  }
  if (!data.tree().getAttribute('to')) {
    assert(provider.host, "Host should be not null!");
    data.tree().setAttribute('to', provider.host);
  }
  if (!data.tree().getAttribute('from')) {
    data.tree().setAttribute('from', provider.username);
  }
  const id = data.tree().getAttribute('id');
  return new Promise((resolve, reject)=> {
    const stream = iq.filter(stanza => stanza.id == id);
    const callback = stanza => {
      stream.offValue(callback);
      if (!stanza || stanza.type === 'error') {
        reject(stanza ? stanza.error : {text: 'error'});
      } else {
        resolve(stanza);
      }
    };
    stream.onValue(callback);
    provider.sendIQ(data);
  });
}

export function sendStanza(stanza) {
  provider.sendStanza(stanza);
}

export function sendPresence(presence) {
  provider.sendPresence(presence);
}

