import XMPP from 'react-native-xmpp';
import Utils from './utils';
import {DEBUG} from '../../globals';
import assert from 'assert';
import autobind from 'autobind-decorator';

@autobind
export default class {
    constructor() {
        XMPP.on('login', this._onConnected.bind(this));
        XMPP.on('loginError', this._onAuthFail.bind(this));
        XMPP.on('disconnect', this._onDisconnected.bind(this));
        XMPP.on('roster', this._onRoster.bind(this));
        XMPP.on('presence', this._onPresence.bind(this));
        XMPP.on('message', this._onMessage.bind(this));
        XMPP.on('iq', this._onIQ.bind(this));
    }

    _onRoster(roster) {
        if (this.onRoster) {
            this.onRoster(roster);
        }
    }

    _onAuthFail(error) {
        if (this.onAuthFail) {
            this.onAuthFail(error);
        }
    }

    sendStanza(stanza) {
        // serialize stanza
        const data = stanza.toString();
        console.log('sendStanza:', data);
        XMPP.sendStanza(data);
    }

    sendIQ(stanza) {
        // serialize stanza
        XMPP.sendStanza(stanza.toString());
    }

    _onPresence(stanza) {
        if (this.onPresence) {
            this.onPresence(stanza);
        }
    }

    _onIQ(stanza) {
        if (this.onIQ) {
            this.onIQ(stanza);
        }
    }

    _onConnected({username, password}) {
        console.log('ONCONNECTED, USERNAME', username);
        this.username = username.split('/')[0];
        if (this.onConnected) {
            this.onConnected(
                this.username.substring(0, this.username.indexOf('@')),
                password,
                this.host
            );
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
        XMPP.removeFromRoster(username + '@' + this.host);
    }

    login(username, password, host, resource) {
        assert(host, 'host should not be null');
        this.host = host;
        XMPP.connect(Utils.getJid(username, host, resource), password, XMPP.PLAIN);
    }

    sendPresence(data = {}) {
        XMPP.presence(data.to || this.host, data.type);
    }

    disconnect() {
        XMPP.disconnect(null);
    }
}
