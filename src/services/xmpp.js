export const HOST = 'beng.dev.tinyrobot.com';
//export const SERVICE = "wss://"+HOST+"/ws-xmpp";
export const SERVICE = "ws://beng.dev.tinyrobot.com:5280/ws-xmpp";
const MAX_ATTEMPTS = 5;
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

        this.isConnected = false;
        this.reconnectAttempts = 0;
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

    iso8601toDate(date){
        var timestamp = Date.parse(date), minutesOffset = 0;
        if(isNaN(timestamp)) {
            var struct = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date);
            if(struct) {
                if(struct[8] !== 'Z') {
                    minutesOffset = +struct[10] * 60 + (+struct[11]);
                    if(struct[9] === '+') {
                        minutesOffset = -minutesOffset;
                    }
                }
                return new Date(+struct[1], +struct[2] - 1, +struct[3], +struct[4], +struct[5] + minutesOffset, +struct[6], struct[7] ? +struct[7].substr(0, 3) : 0);
            } else {
                // XEP-0091 date
                timestamp = Date.parse(date.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + 'Z');
            }
        }
        return new Date(timestamp);
    }

    _onMessage(stanza){
        if (this.onMessage){
            const jid = stanza.getAttribute("from");
            const user = Strophe.getNodeFromJid(jid);
            const type = stanza.getAttribute('type');
            const elems = stanza.getElementsByTagName('body');
            const id = stanza.getAttribute('id');
            const xarr = stanza.getElementsByTagName('delay');
            let time = Date.now();
            if (xarr && xarr.length>0){
                const x = xarr[0];
                const stamp = x.getAttribute('stamp');
                if (stamp){
                    time = this.iso8601toDate(stamp).getTime()
                    console.log("DELAYED STAMP "+stamp+" TIME "+time);
                }
            }

            if (elems.length > 0) {
                const body = elems[0];
                const text = Strophe.getText(body);
                this.onMessage({from: user, body:text, type, id, time});
            }
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
        this._connection.send($msg({to: msg.to + "@" + this.host, type: 'chat', id:msg.id}).c("body").t(msg.body));
    }

    login(username, password){
        const self = this;
        this._connection.connect(username + "@" + this.host, password, function (status) {
            switch (status){
                case Strophe.Status.CONNECTED:
                    self.isConnected = true;
                    self.reconnectAttempts = 0;
                    if (self.onConnected) self.onConnected();
                    self.sendPresence();
                    if (self._connection){
                        self._connection.addHandler(self._onMessage.bind(self), null, "message", null, null);
                        self._connection.addHandler(self._onPresence.bind(self), null, "presence", null, null);
                        self._connection.addHandler(self._onIQ.bind(self), null, "iq", null, null);
                    }
                    return;
                case Strophe.Status.DISCONNECTED:
                    self.isConnected = false;
                    self.reconnectAttempts++;
                    if (self.onDisconnected) self.onDisconnected();
                    if (self.reconnectAttempts < MAX_ATTEMPTS){
                        console.log("Trying to reconnect, attempts"+self.reconnectAttempts);
                        self.login(username, password);
                    }
                    return;
                case Strophe.Status.AUTHFAIL:
                    console.log("AUTHFAIL!"+self.onAuthFail);
                    if (self.onAuthFail) self.onAuthFail();
                    return;

            }
        });
    }

    disconnect(){
        console.log("DISCONNECT SERVICE");
        // avoid reconnect
        this.reconnectAttempts = MAX_ATTEMPTS;
        this._connection.flush();
        this._connection.disconnect();
    }






}

let service = new XmppService(HOST, SERVICE);

export default service;