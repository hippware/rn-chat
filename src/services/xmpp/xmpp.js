import {USE_IOS_XMPP, HOST, SERVICE} from '../../globals';
import EventEmmiter from 'events';
import Utils from './utils';
import assert from 'assert';

export const AUTH_FAIL = "XMPPAuthFail";
export const MESSAGE_RECEIVED = "XMPPMessageReceived";
export const MESSAGE_SENT = "XMPPMessageSent";
export const IQ_RECEIVED = "IQXMPPReceived";
export const IQ_SENT = "IQXMPPSent";
export const IQ_ERROR = "IQXMPPError";
export const PRESENCE_RECEIVED = "PresenceXMPPReceived";
export const PRESENCE_SENT = "PresenceXMPPSent";
export const CONNECT_REQUEST = "ConnectRequestXMPP";
export const CONNECT_SUCCESS = "ConnectSuccessXMPP";

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

export class XmppService {
    constructor(connect){
        this.isConnected = false;
        this.username = null;
        this.connect = connect;
        this.host = connect.host;
        this.eventEmmiter = new EventEmmiter();
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
        console.log("XMPP CONNECTED:"+(new Date()-this.startTime)/1000);
        this.isConnected = true;
        this.username = username;
        this.eventEmmiter.emit(CONNECT_SUCCESS, username, password);
    }

    onDisconnected(error){
        this.isConnected = false;
    }

    onAuthFail(error){
        this.eventEmmiter.emit(AUTH_FAIL, {message: error});
    }

    onPresence(data){
        this.eventEmmiter.emit(PRESENCE_RECEIVED, data);
    }

    onMessage(data){
        this.eventEmmiter.emit(MESSAGE_RECEIVED, data);
    }

    onIQ(data){
        if (data.type === "error"){
            this.eventEmmiter.emit(IQ_ERROR, data);
        } else {
            this.eventEmmiter.emit(IQ_RECEIVED, data);
        }
    }

    sendMessage(data){
        this.connect.sendMessage(data);
        this.eventEmmiter.emit(MESSAGE_SENT, data);
    }

    sendStanza(data){
        this.connect.sendStanza(data);
    }

    sendPresence(data){
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
                    resolve(stanza);
                    this.eventEmmiter.removeListener(IQ_RECEIVED, callback);
                    this.eventEmmiter.removeListener(IQ_ERROR,errorCallback);
                }
            };

            const errorCallback = stanza => {
                if (stanza.id == id){
                    console.log("ERRROR CALLBACK", stanza.id, id);
                    reject(stanza);
                    this.eventEmmiter.removeListener(IQ_RECEIVED, callback);
                    this.eventEmmiter.removeListener(IQ_ERROR, errorCallback);
                }
            };

            this.connect.sendIQ(data);
            this.eventEmmiter.emit(IQ_SENT, data);
            this.eventEmmiter.addListener(IQ_RECEIVED, callback);
            this.eventEmmiter.addListener(IQ_ERROR, errorCallback);
        });
    }

    disconnect(){
        this.connect.disconnect();
    }

    login(username, password){
        return new Promise((resolve, reject)=> {
            const successCallback = (username, password) => {
                resolve(username, password);
            };

            const failureCallback = stanza => {
                reject(stanza);
            };

            this.startTime = new Date();
            console.log("LOGIN:", username, password);
            this.connect.login(username, password);
            this.eventEmmiter.emit(CONNECT_REQUEST, username, password);
            this.eventEmmiter.once(CONNECT_SUCCESS, successCallback);
            this.eventEmmiter.once(AUTH_FAIL, failureCallback);
        });
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

