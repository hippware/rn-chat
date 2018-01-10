// @flow

import autobind from 'autobind-decorator';
import Utils from './utils';
import assert from 'assert';
import {action, observable, when} from 'mobx';
import Kefir from 'kefir';

const MEDIA = 'hippware.com/hxep/media';
const ROSTER = 'jabber:iq:roster';
const USER = 'hippware.com/hxep/user';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__blocked__';

@autobind
export default class XmppService {
  provider;
  iq;
  message;
  presence;
  @observable username: string;
  @observable password: string;
  @observable server: string;
  @observable connected: boolean = false;

  constructor(provider) {
    assert(provider, 'xmpp provider must be set');
    this.provider = provider;
    this.provider.onDisconnected = this.onDisconnect;
    this.provider.onConnected = this.onConnect;
    this.iq = Kefir.stream(emitter => (provider.onIQ = iq => emitter.emit(iq)));
    this.message = Kefir.stream(emitter => (provider.onMessage = msg => emitter.emit(msg)));
    this.presence = Kefir.stream(emitter => (provider.onIQ = presence => emitter.emit(presence)));
  }
  @action
  onDisconnect() {
    this.connected = false;
    this.username = undefined;
    this.password = undefined;
  }
  @action
  onConnect(username, password, host) {
    this.username = username;
    this.connected = true;
    this.password = password;
    this.server = host;
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
  async remove() {
    await this.sendIQ($iq({type: 'set'}).c('delete', {xmlns: USER}));
    await this.disconnect();
  }
  @action
  async login(user, pass, resource) {
    return await this.provider.login(user, pass, resource);
  }
  disconnect() {
    this.provider.disconnectAfterSending();
    return new Promise((resolve, reject) => {
      when(() => !this.connected, resolve);
    });
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
  async addToRoster(username, group = '') {
    this.sendPresence({to: `${username}@${this.server}`, type: 'subscribe'});
    const iq = $iq({type: 'set', to: `${this.username}@${this.server}`})
      .c('query', {xmlns: ROSTER})
      .c('item', {jid: `${username}@${this.server}`})
      .c('group')
      .t(group);
    await this.sendIQ(iq);
  }
  async removeFromRoster(username) {
    const iq = $iq({type: 'set', to: `${this.username}@${this.server}`})
      .c('query', {xmlns: ROSTER})
      .c('item', {jid: `${username}@${this.server}`, subscription: 'remove'});
    await this.sendIQ(iq);
    this.sendPresence({to: `${username}@${this.server}`, type: 'unsubscribe'});
  }
  async sendIQ(data, withoutTo): Promise<any> {
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
          reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error);
        } else {
          resolve(stanza);
        }
      };
      stream.onValue(callback);
      provider.sendIQ(data);
    });
  }
  async updateProfile(d: Object): Promise<any> {
    const data = Utils.fromCamelCase(d);
    let iq = $iq({type: 'set'}).c('set', {xmlns: USER, node: `user/${this.username}`});
    Object.keys(data).forEach((field) => {
      if (data.hasOwnProperty(field) && data[field]) {
        iq = iq
          .c('field', {
            var: field,
            type: field === 'avatar' ? 'file' : 'string',
          })
          .c('value')
          .t(data[field])
          .up()
          .up();
      }
    });
    await this.sendIQ(iq);
  }
  async loadProfile(user: string): Promise<Object> {
    if (!user) {
      throw new Error('User should not be null');
    }
    // try to connect
    if (!this.connected) {
      throw new Error('XMPP is not connected!');
    }
    const isOwn = user === this.username;
    const node = `user/${user}`;
    const fields = isOwn
      ? ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles', 'email', 'phone_number']
      : ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
    assert(node, 'Node should be defined');
    let iq = $iq({type: 'get'}).c('get', {xmlns: USER, node});
    fields.forEach((field) => {
      iq = iq.c('field', {var: field}).up();
    });
    const stanza = await this.sendIQ(iq);
    return Utils.processFields(stanza.fields.field);
  }
  processItem({handle, roles, avatar, jid, group, subscription, ask, created_at, ...props}) {
    const firstName = props.first_name;
    const lastName = props.last_name;
    // ignore other domains
    if (Strophe.getDomainFromJid(jid) !== this.server) {
      return null;
    }
    const user = Strophe.getNodeFromJid(jid);
    const createdTime = Utils.iso8601toDate(created_at).getTime();
    const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
    const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
    return {
      user,
      firstName,
      lastName,
      handle,
      avatar,
      roles: roles && roles.role,
      isNew: groups.includes(NEW_GROUP) && days <= 7,
      isBlocked: group === BLOCKED_GROUP,
      isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
      isFollower: subscription === 'from' || subscription === 'both',
    };
  }
  async requestRoster() {
    const iq = $iq({type: 'get', to: `${this.username}@${this.server}`}).c('query', {xmlns: ROSTER});
    const stanza = await this.sendIQ(iq);
    let children = stanza.query.item;
    if (children && !Array.isArray(children)) {
      children = [children];
    }
    return children.map(this.processItem).filter(x => x);
  }
}
