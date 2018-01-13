// @flow

import XMPP from 'react-native-xmpp';
import Utils from './utils';
import {DEBUG} from '../../globals';
import assert from 'assert';
import autobind from 'autobind-decorator';
import * as log from '../../utils/log';

// TODO: pare down the mess of globals added by strophe
require('./strophe');

@autobind
export default class {
  host: string;
  // _connection;
  handlers = [];
  log: Function;

  constructor(log: Function = () => null) {
    this.log = log;
    XMPP.on('login', this._onConnected);
    // XMPP.on('loginError', this._onAuthFail);
    XMPP.on('disconnect', this._onDisconnected);
    XMPP.on('roster', this._onRoster);
    XMPP.on('presence', this._onPresence);
    XMPP.on('message', this._onMessage);
    XMPP.on('iq', this._onIQ);
  }

  _onRoster(roster) {
    if (this.onRoster) {
      this.onRoster(roster);
    }
  }

  // _onAuthFail(error) {
  //   console.log('xmpp onAuthFail', error);
  //   if (this.onAuthFail) {
  //     this.onAuthFail(error);
  //   }
  // }

  sendStanza(stanza) {
    console.log('xmpp sendStanza', stanza);
    // serialize stanza
    const data = stanza.toString();
    log.log('sendStanza:', data, {level: log.levels.VERBOSE});
    XMPP.sendStanza(data);
  }

  sendIQ(stanza) {
    console.log('xmpp sendIq', stanza);
    // serialize stanza
    XMPP.sendStanza(stanza.toString());
  }

  _onPresence(stanza) {
    console.log('xmpp onPresence', stanza);
    if (this.onPresence) {
      this.onPresence(stanza);
    }
  }

  _onIQ(stanza) {
    console.log('xmpp onIq', stanza);
    if (this.onIQ) {
      this.onIQ(stanza);
    }
  }

  _onConnected({username, password}) {
    console.log('ONCONNECTED, USERNAME', username, {level: log.levels.INFO});
    this.username = username.split('/')[0];
    if (this.onConnected) {
      this.onConnected(this.username.substring(0, this.username.indexOf('@')), password, this.host);
    }
  }

  _onDisconnected(error) {
    if (this.onDisconnected) {
      setTimeout(() => this.onDisconnected());
    }
  }

  _onMessage(message) {
    this.onMessage && this.onMessage(message);
  }

  removeFromRoster(username) {
    XMPP.removeFromRoster(`${username}@${this.host}`);
  }

  // login(username, password, host, resource) {
  //   assert(host, 'host should not be null');
  //   this.host = host;
  //   XMPP.connect(Utils.getJid(username, host, resource), password, XMPP.PLAIN, host, 5223);
  // }

  login = async (username, password, host, resource) => {
    console.log('xmpp login username:', username, 'password:', password, 'host:', host, 'resource:', resource);
    assert(host, 'xmpp host must be defined');
    this.host = host;
    assert(username, 'No username is given');
    const self = this;
    return new Promise((resolve, reject) => {
      XMPP.on('loginError', (error) => {
        reject(error);
      });
      XMPP.connect(Utils.getJid(username, host, resource), password, XMPP.PLAIN, host, 5223);
    });
  };

  sendPresence(data = {}) {
    XMPP.presence(data.to || this.host, data.type);
  }

  disconnect() {
    XMPP.disconnect();
  }

  disconnectAfterSending() {
    XMPP.disconnectAfterSending();
  }
}
