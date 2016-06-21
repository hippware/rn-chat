import {USE_IOS_XMPP, HOST} from '../../globals';
import Kefir from 'kefir';
import Utils from './utils';
import assert from 'assert';
import autobind from 'autobind-decorator';
import {settings, isTesting} from '../../globals';
let XmppConnect;
if (USE_IOS_XMPP){
  XmppConnect = require('./XmppIOS').default;
} else {
  XmppConnect = require('./XmppStrophe').default;
}

@autobind
export default class XMPP {
  constructor(){
    this.host = isTesting || settings.isTesting ? 'testing.dev.tinyrobot.com' : 'staging.dev.tinyrobot.com';
    console.log("XMPP HOST:", this.host);
    this.provider = new XmppConnect(this.host);
    this.iq = Kefir.stream(emitter => this.provider.onIQ = iq => emitter.emit(iq)).log('iq');

    this.message = Kefir.stream(emitter => this.provider.onMessage = message => emitter.emit(message)).log('message');

    this.presence = Kefir.stream(emitter => this.provider.onPresence = presence => emitter.emit(presence)).log('presence');

    this.disconnected = Kefir.stream(emitter =>
      this.provider.onDisconnected = () => emitter.emit({connected: false})).log('disconnected');

    this.connected = Kefir.stream(emitter =>
      this.provider.onConnected = (user, password, host) => emitter.emit({user, password, host, connected:true})).log('connected');

    this.authError = Kefir.stream(emitter => this.provider.onAuthFail = error => emitter.emit(error)).log('authError');

  }
  
  connect(user, password, host) {
    assert(user, "connect: user is not defined");
    assert(password, "connect: password is not defined");
    this.provider.host = host || this.host;

    console.log("connect::", user, password, this.provider.host);
    return new Promise((resolve, reject)=> {
      const onConnected = data => {
        this.connected.offValue(onConnected);
        resolve(data)
      };
      const onAuthError = error => {
        this.authError.offValue(onAuthError);
        reject(error)
      };
      this.connected.onValue(onConnected);
      this.authError.onValue(onAuthError);
      this.provider.login(user, password);
    });
  }
  
  // registers/login given user
  async register(resource, provider_data) {
    assert(resource, "resource should not be null");
    assert(provider_data, "provider_data should not be null");
    const user = 'register';
    const password = `$J$${JSON.stringify({provider: 'digits', resource, token: true, provider_data})}`;
    console.log("register::", resource, provider_data, password);
    try {
      await this.connect(user, password);
    } catch (error) {
      const xml = new DOMParser().parseFromString(error, "text/xml").documentElement;
      const data = Utils.parseXml(xml).failure;
      if ('redirect' in data) {
        const {user, server, token} = JSON.parse(data.text);
        assert(user, "register response doesn't contain user");
        assert(server, "register response doesn't contain server");
        assert(token, "register response doesn't contain token");
        return {user, host:server, password:token};
      } else {
        throw new Error(data.text);
      }
    }
  }

  disconnect() {
    return new Promise((resolve, reject)=> {
      const onDisconnected = data => {
        this.disconnected.offValue(onDisconnected);
        resolve(data)
      };
      this.disconnected.onValue(onDisconnected);
      this.provider.disconnect();
    });
  }
  
  sendIQ(data) {
    if (!data.tree().getAttribute('id')) {
      data.tree().setAttribute('id', Utils.getUniqueId('iq'));
    }
    if (!data.tree().getAttribute('to')) {
      data.tree().setAttribute('to', this.provider.host);
    }
    if (!data.tree().getAttribute('from')) {
      data.tree().setAttribute('from', this.provider.username);
    }
    const id = data.tree().getAttribute('id');
    return new Promise((resolve, reject)=> {
      const stream = this.iq.filter(stanza => stanza.id == id);
      const callback = stanza => {
        stream.offValue(callback);
        if (!stanza || stanza.type === 'error'){
          reject(stanza ? stanza.error : {text: 'error'});
        } else {
          resolve(stanza);
        }
      };
      stream.onValue(callback);
      this.provider.sendIQ(data);
    });
  }
  
  sendStanza(stanza) {
    this.provider.sendStanza(stanza);
  }
  
  sendPresence(presence) {
    this.provider.sendPresence(presence);
  }
}

