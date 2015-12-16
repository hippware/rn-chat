require("./strophe");
var service;
import {HYBRID_XMPP} from '../globals';
if (HYBRID_XMPP){
    service = require('./XmppCoreIOS').default;
} else {
    service = require('./XmppCoreStrophe').default;
}

var Strophe = global.Strophe;

/***
 * This class adds roster functionality to standalone XMPP service
 */
class RosterXmppService {
    constructor(service){
        this.onSubscribeRequest = null;
        this.onRosterReceived = null;
        this.rosterId = null;
        this.onPresence = null;
        this.onPresenceUpdate = null;
        this.onDisconected = null;
        this.onAuthFail = null;
        this.service = service;
        this.host = this.service.host;
        this.service.onPresence = this._onPresence.bind(this);
        this.service.onConnected = this._onConnected.bind(this);
        this.service.onAuthFail = this._onAuthFail.bind(this);
        this.service.onMessage = this._onMessage.bind(this);
        this.service.onDisconnected = this._onDisconnected.bind(this);
        this.service.onIQ = this._onIQ.bind(this);
        this.username = null;
        this.startTime = null;
        Strophe.addNamespace('ROSTERX', 'http://jabber.org/protocol/rosterx');
    }

    get isConnected() {
        return this.service.isConnected;
    }

    sendMessage(msg){
        this.service.sendMessage(msg);
    }

    _onRosterReceived(stanza) {
        let roster = [];
        const children = stanza.query.item;
        for (let i = 0; i < children.length; i++) {
            const jid = children[i].jid;
            const username = Strophe.getNodeFromJid(jid);
            const subscription = children[i].subscription;
            roster.push({username, subscription})
        }
        console.log("XMPP ROSTER RECEIVED:"+(new Date()-this.startTime)/1000);
        if (this.onRosterReceived){
            this.onRosterReceived(roster);
        }
    }


    _onAuthFail(){
        if (this.onAuthFail){
            this.onAuthFail();
        }
    }

    _onDisconnected(){
        if (this.onDisconnected){
            this.onDisconnected();
        }
    }

    _onMessage(stanza){
        if (this.onMessage){
            this.onMessage(stanza);
        }
        return true;
    }

    _onIQ(stanza){
        //const id = stanza.getAttribute("id");
        const id = stanza.id;
        console.log("_onIQ "+id+" " +this.rosterId);
        if (id == this.rosterId){
            this._onRosterReceived(stanza);
        } else if (this.onIQ) {
            this.onIQ(stanza);
        }

        return true;
    }

    _onConnected(){
        console.log("XMPP CONNECTED:"+(new Date()-this.startTime)/1000);
        //console.log("RosterService _onConnected");
        if (this.onConnected){
            this.onConnected();
        }
        this.requestRoster();
    }


    _onPresence(stanza) {
        const jid = stanza.from;
        const user = Strophe.getNodeFromJid(jid);
        if (user == this.username){
            return;
        }
        if (stanza.type == "subscribe" && this.onSubscribeRequest) {
            this.onSubscribeRequest(user);
        } else {
            if (this.onPresenceUpdate) {
                const type = stanza.type || 'online';
                this.onPresenceUpdate(user, type)
            }
        }
        if (this.onPresence) {
            this.onPresence(stanza);
        }

    }

    /**
     * Send presence with given data
     * @param data presence data
     */
    sendPresence(data){
        // send presence
        this.service.sendPresence(data);
    }

    /**
     * Send roster request and get results to callback function
     * @param callback function will be called with result
     */
    requestRoster(){
        this.rosterId = this.service.getUniqueId('roster');
        const iq = $iq({type: 'get', id: this.rosterId})
            .c('query', {xmlns: Strophe.NS.ROSTER});

        this.service.sendIQ(iq);
    }

    removeFromRoster(username){
        const iq = $iq({type: 'set', id: this.service.getUniqueId('roster')})
            .c('query', {xmlns: Strophe.NS.ROSTER}).c('item', { jid:username + '@' + this.host, subscription:'remove'});
        this.service.sendIQ(iq);
    }

    /**
     * Send 'subscribe' request for given user
     * @param username username to subscribe
     */
    subscribe(username){
        this.sendPresence({to: username + "@" + this.host, type:'subscribe'});
    }

    /**
     * Send 'subscribed' request for given user
     * @param username user to send subscribed
     */
    authorize(username){
        this.sendPresence({to: username + "@" + this.host, type:'subscribed'});
    }

    /**
     * unsubscribe from the user's with username presence
     * @param username username to unsubscribe
     */
    unsubscribe(username){
        this.sendPresence({to: username + "@" + this.host, type:'unsubscribe'});
    }

    /**
     * Unauthorize the user with username to subscribe to the authenticated user's presence
     * @param username username to unauthorize
     */
    unauthorize(username){
        this.sendPresence({to: username + "@" + this.host, type:'unsubscribed'});
    }

    login(username, password) {
        this.username = username;
        this.startTime = new Date();
        service.login(username, password);
    }

    disconnect(){
        service.disconnect();
    }
}


let rosterService = new RosterXmppService(service);

export default rosterService;
