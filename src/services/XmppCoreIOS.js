import XMPP from 'react-native-xmpp';
import {HOST} from './settings';

export class XmppService {
    constructor(host){
        this.onConnected = null;
        this.onDisconnected = null;
        this.onAuthFail = null;
        this.onMessage = null;
        this.onIQ = null;
        this.onPresence = null;

        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.host = host;
        XMPP.on('connect', this._onConnected.bind(this));
        XMPP.on('disconnect', this._onDisconnected.bind(this));
    }

    _onConnected(){
        this.isConnected = true;
        if (this.onConnected){
            this.onConnected();
        }
    }

    _onDisconnected(error){
        if (!XMPP.isConnected){
            return;
        }
        this.isConnected = false;
        if (this.onDisconnected){
            this.onDisconnected();
        }
    }

    login(username, password){
        XMPP.connect(username + "@" + this.host, password);
    }

    disconnect(){
        XMPP.disconnect();
    }






}

let service = new XmppService(HOST);

export default service;