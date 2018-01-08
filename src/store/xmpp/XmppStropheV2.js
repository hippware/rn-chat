import Utils from './utils';
import autobind from 'autobind-decorator';
import assert from 'assert';

require('./strophe');

const {Strophe} = global;

@autobind
export default class XmppStropheV2 {
  host: string;
  _connection;
  handlers = [];
  log: Function;

  /**
   * Creates class instance
   * @param host xmpp host
   * @param log optional log function
   */
  constructor(host, log = () => null) {
    assert(host, 'xmpp host must be defined');
    this.host = host;
    this.log = log;
    Strophe.log = function (level, msg) {
      log(msg);
    };

    Strophe.Connection.prototype.rawInput = function (data) {
      log(`rawInput: ${data}`);
    };

    Strophe.Connection.prototype.rawOutput = function (data) {
      log(`rawOutput: ${data}`);
    };
  }

  async login(username, password, resource) {
    assert(username, 'No username is given');
    const self = this;
    return new Promise((resolve, reject) => {
      self._connection = new Strophe.Connection(`ws://${this.host}:5280/ws-xmpp`);
      self._connection.connect(Utils.getJid(username, this.host, resource), password, (status, condition) => {
        switch (status) {
          case Strophe.Status.CONNECTED:
            self.log(`${username} CONNECTED`);
            if (self._connection) {
              self.handlers.push(self._connection.addHandler(self._onMessage, null, 'message', null, null));
              self.handlers.push(self._connection.addHandler(self._onPresence, null, 'presence', null, null));
              self.handlers.push(self._connection.addHandler(self._onIQ, null, 'iq', null, null));
            }
            self.sendPresence();
            self.username = `${username}@${self.host}`;
            self.onConnected && self.onConnected(username, password, self.host);
            resolve({username, password, host: self.host});
            return;
          case Strophe.Status.DISCONNECTED:
            self.log(`${username} DISCONNECTED`);
            // if (self._connection) {
            //   self.handlers.forEach(self._connection.deleteHandler);
            // }
            self.username = undefined;
            if (self.onDisconnected) {
              setTimeout(() => self.onDisconnected());
            }
            reject();
            return;
          case Strophe.Status.AUTHFAIL:
            self.log(`${username} AUTHFAIL: ${condition}`);
            setTimeout(() => self.onAuthFail && self.onAuthFail(condition));
            reject(condition);
        }
      });
    });
  }

  _onPresence(stanza) {
    const data = Utils.parseXml(stanza);
    this.onPresence && this.onPresence(data.presence);
    return true;
  }

  _onMessage(stanza) {
    const data = Utils.parseXml(stanza).message;
    this.onMessage && this.onMessage(data);
    return true;
  }

  _onIQ(stanza) {
    const data = Utils.parseXml(stanza);
    this.onIQ && this.onIQ(data.iq);
    return true;
  }

  sendIQ(data, callback) {
    this._connection.sendIQ(data, callback);
  }

  sendStanza(stanza) {
    this._connection.send(stanza);
  }

  /**
   * Send presence with given data
   * @param data presence data
   */
  sendPresence(data) {
    // send presence
    this._connection.send($pres(data));
  }

  disconnect() {
    this._connection.flush();
    this._connection.disconnect();
  }

  disconnectAfterSending() {
    this._connection.flush();
    this._connection.disconnect();
  }
}

