import {USE_IOS_XMPP, HOST} from '../../globals';
import Kefir from 'kefir';
import Utils from './utils';
import autobind from 'autobind-decorator';

let XmppConnect;
if (USE_IOS_XMPP){
  XmppConnect = require('./XmppIOS').default;
} else {
  XmppConnect = require('./XmppStrophe').default;
}

@autobind
class XMPP {
  provider = new XmppConnect(HOST);
  
  iq = Kefir.stream(emitter => this.provider.onIQ = iq => emitter.emit(iq)).log('iq');
  
  message = Kefir.stream(emitter => this.provider.onMessage = message => emitter.emit(message)).log('message');
  
  presence = Kefir.stream(emitter => this.provider.onPresence = presence => emitter.emit(presence)).log('presence');
  
  disconnected = Kefir.stream(emitter =>
    this.provider.onDisconnected = () => emitter.emit({connected: false})).log('disconnected');
  
  connected = Kefir.stream(emitter =>
    this.provider.onConnected = (user, password, host) => emitter.emit({user, password, host, connected:true})).log('connected');
  
  authError = Kefir.stream(emitter => this.provider.onAuthFail = error => emitter.emit(error)).log('authError');
  
  connect(user, password, host = HOST) {
    console.log("connect::", user, password, host);
    this.provider.host = host;
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
    const id = data.tree().getAttribute('id');
    return new Promise((resolve, reject)=> {
      const stream = this.iq.filter(stanza => stanza.id == id);
      const callback = stanza => {
        stream.offValue(callback);
        resolve(stanza);
      };
      stream.onValue(callback);
      this.provider.sendIQ(data);
    });
  }
  
  sendStanza(stanza) {
    this.provider.sendStanza(stanza);
  }
  
  sendPresence(presence) {
    this.sendPresence(presence);
  }
}

export default new XMPP()
