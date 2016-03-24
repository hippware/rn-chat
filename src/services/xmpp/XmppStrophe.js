require("./strophe");

import {HOST, DEBUG, SERVICE} from '../../globals';
const MAX_ATTEMPTS = 5;
var Strophe = global.Strophe;
import Utils from './utils';

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



export default class {
    constructor(host, service){
        if (!host){
            throw new Error("host is not defined");
        }
        if (!service){
            throw new Error("service URL is not defined");
        }
        this.host = host;
        this.service = service;
        this._connection = new Strophe.Connection(this.service);
    }

    _onPresence(stanza){
        let data = Utils.parseXml(stanza);
        this.onPresence(data.presence);
        return true;
    }

    _onMessage(stanza){
        let data = Utils.parseXml(stanza).message;
        if (data.body && data.body['#text']){
            data.body = data.body['#text'];
        }
        this.onMessage(data);
        return true;
    }

    _onIQ(stanza){
        let data = Utils.parseXml(stanza);
        this.onIQ(data.iq);
        return true;
    }

    sendIQ(data, callback){
        this._connection.sendIQ(data, callback);
    }

    sendStanza(stanza){
        this._connection.send(stanza);
    }

    /**
     * Send presence with given data
     * @param data presence data
     */
    sendPresence(data){
        // send presence
        this._connection.send($pres(data));
    }

    sendMessage(msg){
        this._connection.send($msg({to: msg.to + "@" + this.host, type: 'chat', id:msg.id}).c("body").t(msg.body));
    }

    login(username, password){
        const self = this;
        this._connection.connect(username + "@" + this.host, password, function (status) {
            switch (status){
                case Strophe.Status.CONNECTED:
                    self.sendPresence();
                    self.onConnected && self.onConnected(username, password);
                    if (self._connection){
                        self._connection.addHandler(self._onMessage.bind(self), null, "message", null, null);
                        self._connection.addHandler(self._onPresence.bind(self), null, "presence", null, null);
                        self._connection.addHandler(self._onIQ.bind(self), null, "iq", null, null);
                    }
                    return;
                case Strophe.Status.DISCONNECTED:
                    console.log("DISCONNECTED");
                    self.onDisconnected && self.onDisconnected();
                    return;
                case Strophe.Status.AUTHFAIL:
                    console.log("AUTH FAIL");
                    self.onAuthFail && self.onAuthFail();
                    return;

            }
        });
    }

    disconnect(){
        this._connection.flush();
        this._connection.disconnect();
    }






}

