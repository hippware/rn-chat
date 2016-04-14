require("./strophe");
var Strophe = global.Strophe;
import Utils from './utils';
import service, {MESSAGE_RECEIVED} from './xmpp';

var _ = require('lodash');
/***
 * This class adds message functionality to XMPP service
 */
class MessageService {
    composingTimeout;
    _composing;

    constructor() {
        this.composingTimeout = 3000;
        this._composing = {};
        Strophe.addNamespace('CHATSTATES', 'http://jabber.org/protocol/chatstates');
        Strophe.addNamespace('MAM', 'urn:xmpp:mam:1');
        this.receiveMessage = this.receiveMessage.bind(this);
        this.composing = this.composing.bind(this);
        this.requestArchive = this.requestArchive.bind(this);
    }

    receiveMessage(){
        return new Promise((resolve, reject)=>{
            const callback = stanza => {
                let time = Date.now();
                if (stanza.result && stanza.result.forwarded) {
                    if (stanza.result.forwarded.delay) {
                        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
                    }
                    stanza = stanza.result.forwarded.message;
                }
                console.log("MESSAGE RECEIVED:", stanza);
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
                resolve({from: user, body, type, id, time});
            };
            service.eventEmmiter.once(MESSAGE_RECEIVED, callback);
        });
    }

    /**
     * Request message archive using XEP-0313
     */
    requestArchive(criterias){
        console.log("REQUEST ARCHIVE:", iq);
        this.archiveId = Utils.getUniqueId('mam');
        const iq = $iq({type: 'set', id: this.archiveId})
            .c('query', {queryid: this.archiveId, xmlns: Strophe.NS.MAM});

        return service.sendIQ(iq)
    }

    composing(username){
        if (this._composing[username]) {
            this._composing[username].call();
            return;
        }
        this._composing[username] = _.debounce(()=>this._paused(username), this.composingTimeout);

        let msg = $msg({to: username  + "@" + service.host, type: 'chat'});
        msg.c('composing', {xmlns: Strophe.NS.CHATSTATES});
        console.log("SENDING:"+msg.toString());
        service.sendStanza(msg);
    }

    _paused(username) {
        if (this._composing[username]) {
            delete this._composing[username];
        }
        let msg = $msg({to: username  + "@" + service.host, type: 'chat'});
        msg.c('paused', {xmlns: Strophe.NS.CHATSTATES});
        console.log("SENDING:"+msg.toString());
        service.sendStanza(msg);
    }
}

export default new MessageService();
