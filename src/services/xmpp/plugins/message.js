require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
var _ = require('lodash');
/***
 * This class adds message functionality to XMPP service
 */
export default class {
    composingTimeout = 3000;
    _composing = {};

    constructor(service) {
        if (!service) {
            throw new Error("No xmpp service is defined for plugin");
        }
        this.service = service;
        Strophe.addNamespace('CHATSTATES', 'http://jabber.org/protocol/chatstates');
        this.onMessage = this.onMessage.bind(this);
        this.composing = this.composing.bind(this);
    }

    onMessage(stanza) {
        console.log("MESSAGE RECEIVED:",stanza);
        const jid = stanza.from;
        const user = Utils.getNodeJid(jid);
        const type = stanza.type;
        const body = stanza.body;
        const id = stanza.id;
        let time = Date.now();
        if (stanza.delay && stanza.x) {
            const stamp = stanza.x.stamp;
            if (stamp) {
                time = Utils.iso8601toDate(stamp).getTime();
            }
        }
        if (!this.service.delegate){
            console.log("NO DELEGATE for XMPP SERVICE!");
        }

        body && this.service.delegate.onMessageReceived && this.service.delegate.onMessageReceived({from: user, body, type, id, time});
        stanza.composing!==undefined && this.service.delegate.onMessageComposing && this.service.delegate.onMessageComposing(user);
        stanza.paused!==undefined && this.service.delegate.onMessagePaused && this.service.delegate.onMessagePaused(user);
    }

    composing(username){
        if (this._composing[username]) {
            this._composing[username].call();
            return;
        }
        this._composing[username] = _.debounce(()=>this._paused(username), this.composingTimeout);

        let msg = $msg({to: username  + "@" + this.service.host, type: 'chat'});
        msg.c('composing', {xmlns: Strophe.NS.CHATSTATES});
        console.log("SENDING:"+msg.toString());
        this.service.sendStanza(msg);
    }

    _paused(username) {
        if (this._composing[username]) {
            delete this._composing[username];
        }
        let msg = $msg({to: username  + "@" + this.service.host, type: 'chat'});
        msg.c('paused', {xmlns: Strophe.NS.CHATSTATES});
        console.log("SENDING:"+msg.toString());
        this.service.sendStanza(msg);
    }
}
