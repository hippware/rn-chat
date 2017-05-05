require('./strophe');

import {DEBUG} from '../../globals';
const MAX_ATTEMPTS = 5;
var Strophe = global.Strophe;
import Utils from './utils';
import autobind from 'autobind-decorator';
import assert from 'assert';

if (DEBUG) {
    Strophe.log = function (level, msg) {
        console.log(msg);
    };

    Strophe.Connection.prototype.rawInput = function (data) {
        console.log('rawInput: ' + data);
    };

    Strophe.Connection.prototype.rawOutput = function (data) {
        console.log('rawOutput: ' + data);
    };
}

@autobind
export default class {
    _onPresence(stanza) {
        let data = Utils.parseXml(stanza);
        this.onPresence(data.presence);
        return true;
    }

    _onMessage(stanza) {
        let data = Utils.parseXml(stanza).message;
        this.onMessage(data);
        return true;
    }

    _onIQ(stanza) {
        let data = Utils.parseXml(stanza);
        this.onIQ(data.iq);
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

    get connection() {
        return this._connection;
    }

    login(username, password, host, resource) {
        assert(username, 'No username is given');
        assert(host, 'No host is given');
        const self = this;
        this.service = 'ws://' + host + ':5280/ws-xmpp';
        // this.service = "wss://"+host+":5285/ws-xmpp";
        console.log('SERVICE:', this.service);
        this.host = host;
        this._connection = new Strophe.Connection(this.service);

        console.log('XmppStrophe login', username, password, host);
        this._connection.connect(Utils.getJid(username, host, resource), password, function (status, condition) {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    self.sendPresence();
                    self.username = username + '@' + host;
                    self.onConnected && self.onConnected(username, password, host);
                    if (self._connection) {
                        self._connection.addHandler(self._onMessage.bind(self), null, 'message', null, null);
                        self._connection.addHandler(self._onPresence.bind(self), null, 'presence', null, null);
                        self._connection.addHandler(self._onIQ.bind(self), null, 'iq', null, null);
                    }
                    return;
                case Strophe.Status.DISCONNECTED:
                    console.log('DISCONNECTED');
                    this.username = undefined;
                    if (self.onDisconnected) {
                        setTimeout(() => self.onDisconnected());
                    }
                    return;
                case Strophe.Status.AUTHFAIL:
                    console.log('AUTHFAIL', condition);
                    setTimeout(() => self.onAuthFail && self.onAuthFail(condition));
                    return;
            }
        });
    }

    disconnect() {
        console.log('TRYING TO DISCONNECT');
        this._connection.flush();
        this._connection.disconnect();
    }
}
