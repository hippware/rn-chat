require("./strophe");
var Strophe = global.Strophe;
import Utils from './utils';
import service, {MESSAGE_RECEIVED} from './xmpp';
import profileService from './profile';

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
        this.composing = this.composing.bind(this);
        this.requestArchive = this.requestArchive.bind(this);
        this._onMessage = this._onMessage.bind(this);
        service[MESSAGE_RECEIVED] = this._onMessage;
        this.onMessage = null;
        this.onPausing = null;
        this.onComposing = null;
        this.archive = [];
    }

    async _onMessage(stanza) {
        let time = Date.now();
        let archived = 0;
        if (stanza.result && stanza.result.forwarded) {
            if (stanza.result.forwarded.delay) {
                time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
            }
            archived = 1;
            stanza = stanza.result.forwarded.message;
        }
        const jid = stanza.from;
        const user = Utils.getNodeJid(jid);
        const type = stanza.type;
        const body = stanza.body;
        const id = stanza.id;
        const to = Utils.getNodeJid(stanza.to);
        if (stanza.delay && stanza.x) {
            const stamp = stanza.x.stamp;
            if (stamp) {
                time = Utils.iso8601toDate(stamp).getTime();
            }
        }
        const msg = {from: user, body, to, type, id, time};
        if (msg.body) {
            if (archived) {
                this.archive.push({...msg, own: user == service.username});
            } else {
                const profile = await profileService.requestProfile(user);
                this.onMessage({...msg, profile});
            }
        } else if (msg.composing) {
            this.onComposing(msg.from);
        } else if (msg.paused) {
            this.onPausing(msg.from);
        }
    }

    /**
     * Request message archive using XEP-0313
     */
    async requestArchive(criterias){
        this.archiveId = Utils.getUniqueId('mam');
        const iq = $iq({type: 'set', id: this.archiveId})
            .c('query', {queryid: this.archiveId, xmlns: Strophe.NS.MAM});
        this.archive = [];
        await service.sendIQ(iq);
        for (let i=0;i<this.archive.length;i++){
            let msg = this.archive[i];
            msg.profile = await profileService.requestProfile(msg.own ? msg.to : msg.from);
        }
        console.log("RECEIVED FULL ARCHIVE:", this.archive);
        return this.archive;
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
