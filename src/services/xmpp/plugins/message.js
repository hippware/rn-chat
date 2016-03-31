require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
var _ = require('lodash');
/***
 * This class adds message functionality to XMPP service
 */
export default class {
    composingTimeout;
    _composing;

    constructor(service) {
        if (!service) {
            throw new Error("No xmpp service is defined for plugin");
        }
        this.composingTimeout = 3000;
        this._composing = {};
        this.service = service;
        Strophe.addNamespace('CHATSTATES', 'http://jabber.org/protocol/chatstates');
        Strophe.addNamespace('MAM', 'urn:xmpp:mam:1');
        this.onMessage = this.onMessage.bind(this);
        this.composing = this.composing.bind(this);
        this.requestArchive = this.requestArchive.bind(this);
    }

    onMessage(stanza) {
        let time = Date.now();
        if (stanza.result && stanza.result.forwarded){
            if (stanza.result.forwarded.delay){
                time =  Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
            }
            stanza = stanza.result.forwarded.message;
            if (typeof stanza.body === 'object')
                stanza.body = stanza.body['#text'];
        }
        console.log("MESSAGE RECEIVED:",stanza);
        const jid = stanza.from;
        const user = Utils.getNodeJid(jid);
        const type = stanza.type;
        const body = stanza.body;
        const id = stanza.id;
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

    /**
     * Request message archive using XEP-0313
     */
    requestArchive(criterias){
        console.log("REQUEST ARCHIVE:", iq);
        this.archiveId = Utils.getUniqueId('mam');
        const iq = $iq({type: 'set', id: this.archiveId})
            .c('query', {queryid: this.archiveId, xmlns: Strophe.NS.MAM});

        this.service.sendIQ(iq);
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
