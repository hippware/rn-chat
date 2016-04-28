import {USE_IOS_XMPP, HOST, SERVICE} from '../../globals';
import EventEmmiter from 'events';
import Utils from './utils';
import assert from 'assert';

export const AUTH_FAIL = "XMPPAuthFail";
export const MESSAGE_RECEIVED = "XMPPMessageReceived";
export const MESSAGE_SENT = "XMPPMessageSent";
export const IQ_RECEIVED = "IQXMPPReceived";
export const PRESENCE_RECEIVED = "PresenceXMPPReceived";
export const PRESENCE_SENT = "PresenceXMPPSent";
export const CONNECT_REQUEST = "ConnectRequestXMPP";
export const CONNECT_SUCCESS = "ConnectSuccessXMPP";
export const DISCONNECT_SUCCESS = "DisconnectSuccessXMPP";

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

export class XmppService {
    constructor(connect){
        this.isConnected = false;
        this.username = null;
        // custom callbacks
        this.onDisconnect = null;
        this.onConnect = null;
        this.onAuthError = null;
        //
        this.connect = connect;
        this.host = connect.host;
        this.login = this.login.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.eventEmmiter = new EventEmmiter();
        this.eventEmmiter.setMaxListeners(50);
        if (!this.host){
            throw new Error("Host is not defined");
        }
        connect.onConnected = this.onConnected.bind(this);
        connect.onDisconnected = this.onDisconnected.bind(this);
        connect.onAuthFail = this.onAuthFail.bind(this);
        connect.onPresence = this.onPresence.bind(this);
        connect.onMessage = this.onMessage.bind(this);
        connect.onIQ = this.onIQ.bind(this);
        this.startTime = null;
    }

    onConnected(username, password){
        console.log("XMPP CONNECTED:"+(new Date()-this.startTime)/1000, username, );
        this.isConnected = true;
        this.username = username;
        this.eventEmmiter.emit(CONNECT_SUCCESS, username, password);
        this.onConnect && this.onConnect({username, password});
    }

    onDisconnected(error){
        console.log("XMPP DISCONNECTED:", error);
        this.isConnected = false;
        this.onDisconnect && this.onDisconnect();
        this.eventEmmiter.emit(DISCONNECT_SUCCESS);
    }

    onAuthFail(error){
        this.isConnected = false;
        this.onAuthError && this.onAuthError(error);
        this.eventEmmiter.emit(AUTH_FAIL, error);
    }

    onPresence(data){
        this[PRESENCE_RECEIVED] && this[PRESENCE_RECEIVED](data);
        this.eventEmmiter.emit(PRESENCE_RECEIVED, data);
    }

    onMessage(data){
        this[MESSAGE_RECEIVED] && this[MESSAGE_RECEIVED](data);
        this.eventEmmiter.emit(MESSAGE_RECEIVED, data);
    }

    onIQ(data){
        //console.log("_onIQ:", data);
        this.eventEmmiter.emit(IQ_RECEIVED, data);
    }

    sendMessage({msg}){
        this.connect.sendMessage(msg);
        this.eventEmmiter.emit(MESSAGE_SENT, msg);
        return msg;
    }

    sendStanza(data){
        this.connect.sendStanza(data);
    }

    sendPresence(data){
        console.log("SENDING PRESENCE:", data);
        this.connect.sendPresence(data);
        this.eventEmmiter.emit(PRESENCE_SENT, data);
    }

    sendIQ(data){
        if (!data.tree().getAttribute('id')){
            data.tree().setAttribute('id', Utils.getUniqueId('iq'));
        }
        const id = data.tree().getAttribute('id');
        return new Promise((resolve, reject)=> {
            const callback = stanza => {
                if (stanza.id == id){
                    this.eventEmmiter.removeListener(IQ_RECEIVED, callback);
                    if (stanza.type == "error"){
                        reject(stanza.error);
                    } else {
                        resolve(stanza);
                    }
                }
            };
            this.connect.sendIQ(data);
            this.eventEmmiter.on(IQ_RECEIVED, callback);
        });
    }

    disconnect(){
        console.log("TRYING TO DISCONNECT");
        this.connect.disconnect();
    }

    login({username, password}){
        this.startTime = new Date();
        console.log("TRYING TO XMPP CONNECT");
        this.connect.login(username, password);
    }
}


var connect;
if (USE_IOS_XMPP){
    let XmppConnect = require('./XmppIOS').default;
    connect = new XmppConnect(HOST);
} else {
    let XmppConnect = require('./XmppStrophe').default;
    connect = new XmppConnect(HOST, SERVICE);
}

export default new XmppService(connect);

