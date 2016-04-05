import XMPP from 'react-native-xmpp';
import Utils from './utils';
import {DEBUG} from '../../globals';
export default class {
    constructor(host){
        if (!host){
            throw new Error("Host is not defiend")
        }
        this.host = host;
        XMPP.on('login', this._onConnected.bind(this));
        XMPP.on('loginError', this._onAuthFail.bind(this));
        XMPP.on('disconnect', this._onDisconnected.bind(this));
        XMPP.on('roster', this._onRoster.bind(this));
        XMPP.on('presence', this._onPresence.bind(this));
        XMPP.on('message', this._onMessage.bind(this));
        XMPP.on('iq', this._onIQ.bind(this));
    }

    _onRoster(roster){
        if (this.onRoster){
            this.onRoster(roster);
        }
    }

    _onAuthFail(error){
        if (this.onAuthFail){
            this.onAuthFail(error);
        }
    }

    sendStanza(stanza){
        // serialize stanza
        XMPP.sendStanza(stanza.toString());
    }

    sendIQ(stanza){
        // serialize stanza
        XMPP.sendStanza(stanza.toString());
    }

    _onPresence(stanza){
        if (this.onPresence){
            this.onPresence(stanza);
        }
    }

    _onIQ(stanza){
        if (this.onIQ){
            this.onIQ(stanza);
        }

    }

    _onConnected({username, password}){
        if (this.onConnected){
            this.onConnected(username.substring(0, username.indexOf('@')), password);
        }
    }

    _onDisconnected(error){
        if (this.onDisconnected){
            this.onDisconnected();
        }
    }

    _onMessage(message){
        this.onMessage && this.onMessage(message);
    }

    removeFromRoster(username){
        XMPP.removeFromRoster(username + "@" + this.host);
    }

    login(username, password){
        XMPP.connect(username + "@" + this.host, password, XMPP.PLAIN);
    }

    sendMessage(msg){
        XMPP.message(msg.body, msg.to + "@" + this.host);
    }

    sendPresence(data){
        XMPP.presence(data.to, data.type);
    }

    disconnect(){
        XMPP.disconnect();
    }


}

