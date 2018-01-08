import autobind from 'autobind-decorator';
import Utils from './utils';
import assert from 'assert';
import {action, observable} from 'mobx';
import Kefir from 'kefir';

const MEDIA = 'hippware.com/hxep/media';

@autobind
export default class XmppService {
  provider;
  message;
  iq;
  presence;
  @observable username: string;
  @observable password: string;
  @observable server: string;
  @observable resource: string;
  @observable connected: boolean = false;

  constructor(provider) {
    assert(provider, 'xmpp provider must be set');
    this.provider = provider;
    this.provider.onDisconnect = this.onDisconnect;
    this.iq = Kefir.stream(emitter => (provider.onIQ = iq => emitter.emit(iq))).log('iq');
    this.message = Kefir.stream(emitter => (provider.onMessage = message => emitter.emit(message))).log('message');
    this.presence = Kefir.stream(emitter => (provider.onPresence = presence => emitter.emit(presence))).log('presence');
  }
  onDisconnect() {
    this.connected = false;
    this.username = false;
    this.password = false;
  }
  @action
  async register(resource, provider_data, providerName = 'digits') {
    assert(resource, 'resource must be defined');
    assert(provider_data, 'provider_data must be defined');
    const password = `$J$${JSON.stringify({provider: providerName, resource, token: true, provider_data})}`;
    try {
      await this.provider.login('register', password);
    } catch (error) {
      this.provider.disconnectAfterSending();
      let data;
      try {
        const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
        data = Utils.parseXml(xml).failure;
      } catch (e) {
        throw error;
      }
      if ('redirect' in data) {
        const {user, server, token} = JSON.parse(data.text);
        assert(user, "register response doesn't contain user");
        assert(server, "register response doesn't contain server");
        // modify provider host to response's server
        this.provider.host = server;
        this.server = server;
        assert(token, "register response doesn't contain token");
        return {user, server, password: token};
      } else {
        throw data.text ? new Error(data.text) : error;
      }
    }
    throw new Error('Cannot register user');
  }
  @action
  async login(user, password, resource) {
    await this.provider.login(user, password, resource);
    this.username = user;
    this.connected = true;
    this.password = password;
    this.resource = resource;
  }
  disconnect() {
    this.provider.disconnectAfterSending();
  }
  sendStanza(stanza) {
    this.provider.sendStanza(stanza);
  }
  sendPresence(presence) {
    this.provider.sendPresence(presence);
  }
  sendMessage(msg) {
    assert(msg, 'msg is not defined');
    assert(msg.to, 'msg.to is not defined');
    let stanza = $msg({to: `${msg.to}@${this.provider.host}`, type: 'chat', id: msg.id})
      .c('body')
      .t(msg.body || '');
    if (msg.media) {
      stanza = stanza
        .up()
        .c('image', {xmlns: MEDIA})
        .c('url')
        .t(msg.media);
    }
    this.sendStanza(stanza);
  }
  sendIQ(data, withoutTo) {
    const {provider} = this;
    return new Promise((resolve, reject) => {
      if (!provider.host) {
        reject(new Error(`Provider host should be not null ${provider}`));
      }
      if (!provider.username) {
        reject(new Error('Provider username should be not null'));
      }
      if (!data.tree().getAttribute('id')) {
        data.tree().setAttribute('id', Utils.getUniqueId('iq'));
      }
      if (!data.tree().getAttribute('to') && !withoutTo) {
        assert(provider.host, 'Host should be not null!');
        data.tree().setAttribute('to', provider.host);
      }
      if (!data.tree().getAttribute('from')) {
        assert(provider.username, 'No provider.username is defined');
        data.tree().setAttribute('from', provider.username);
      }
      const id = data.tree().getAttribute('id');
      const stream = this.iq.filter(stanza => stanza.id === id);
      const callback = (stanza) => {
        stream.offValue(callback);
        if (stanza.type === 'error') {
          reject(stanza.error);
        } else {
          resolve(stanza);
        }
      };
      stream.onValue(callback);
      provider.sendIQ(data);
    });
  }
}
