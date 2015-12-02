export const HOST = 'beng.dev.tinyrobot.com';
export const SERVICE = "wss://"+HOST+"/ws-xmpp";

global.DOMParser = require("xmldom").DOMParser;
global.document = new DOMParser().parseFromString("<html><head></head><body></body></html>","html");
global.window = global;

require("strophe.js");
var Strophe = global.Strophe;

Strophe.log = function (level, msg) {
    console.log(msg);
};

Strophe.Connection.prototype.rawInput = function (data) {
    console.log('rawInput: ' + data);
};

Strophe.Connection.prototype.rawOutput = function (data) {
    console.log('rawOutput: ' + data);
};

export class XmppService {
    constructor(host, service){
        this.onConnected = null;
        this.onDisconnected = null;
        this.onAuthFail = null;
        this.onMessage = null;
        this.onIQ = null;
        this.onPresence = null;

        this.host = host;
        this.service = service;
        this._connection = new Strophe.Connection(this.service);
    }

    _onPresence(stanza){
        if (this.onPresence){
            this.onPresence(stanza);
        }
        return true;
    }

    _onMessage(stanza){
        if (this.onMessage){
            this.onMessage(stanza);
        }
        return true;
    }

    _onIQ(stanza){
        if (this.onIQ){
            this.onIQ(stanza);
        }
        return true;
    }

    sendIQ(data, callback){
        this._connection.sendIQ(data, callback);
    }

    getUniqueId(name){
        return this._connection.getUniqueId(name);
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
        this._connection.send($msg({to: msg.to + "@" + this.host, type: 'chat'}).c("body").t(msg.body));
    }

    login(username, password){
        const self = this;
        this._connection.connect(username + "@" + this.host, password, function (status) {
            switch (status){
                case Strophe.Status.CONNECTED:
                    if (self.onConnected) self.onConnected();
                    self.sendPresence();
                    if (self._connection){
                        self._connection.addHandler(self._onMessage.bind(self), null, "message", null, null);
                        self._connection.addHandler(self._onPresence.bind(self), null, "presence", null, null);
                        self._connection.addHandler(self._onIQ.bind(self), null, "iq", null, null);
                    }
                    return;
                case Strophe.Status.DISCONNECTED:
                    if (self.onDisconnected) self.onDisconnected();
                    return;
                case Strophe.Status.AUTHFAIL:
                    if (self.onAuthFail) self.onAuthFail();
                    return;

            }
        });
    }

    disconnect(){
        this._connection.flush();
        this._connection.disconnect();
    }






}

let service = new XmppService(HOST, SERVICE);

export default service;