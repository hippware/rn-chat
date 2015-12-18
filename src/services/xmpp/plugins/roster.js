require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
/***
 * This class adds roster functionality to standalone XMPP service
 */
export default class  {
    constructor(service){
        this.rosterId = null;
        this.onIQ = this.onIQ.bind(this);
        this.onConnected = this.onConnected.bind(this);
        this.onPresence = this.onPresence.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.authorize = this.authorize.bind(this);
        this.unauthorize = this.unauthorize.bind(this);
        this.service = service;
        if (!service){
            throw new Error("No xmpp service is defined for plugin");
        }
        this.host = this.service.host;
        if (!this.host){
            throw new Error("HOST is not defined");
        }
        this.username = null;
        Strophe.addNamespace('ROSTERX', 'http://jabber.org/protocol/rosterx');
    }

    _onRosterReceived(stanza) {
        let roster = [];
        const children = stanza.query.item;
        for (let i = 0; i < children.length; i++) {
            const jid = children[i].jid;
            // ignore other domains
            if (Strophe.getDomainFromJid(jid)!=this.host){
                continue;
            }
            const username = Strophe.getNodeFromJid(jid);
            const subscription = children[i].subscription;
            // offline status by default
            roster.push({username, subscription, status:'unavailable'})
        }
        if (this.service.delegate && this.service.delegate.onRosterReceived){
            this.service.delegate.onRosterReceived(roster);
        }
    }


    onIQ(stanza){
        const id = stanza.id;
        console.log("_onIQ "+id+" " +this.rosterId);
        if (id == this.rosterId){
            this._onRosterReceived(stanza);
        }
    }

    onConnected(username){
        this.username = username;
        this.requestRoster();
    }


    onPresence(stanza) {
        const jid = stanza.from;
        const user = Strophe.getNodeFromJid(jid);

        // ignore own presence change
        if (user == this.username){
            return;
        }
        if (stanza.type == "subscribe") {
            if (this.service.delegate && this.service.delegate.onSubscribeRequest) {
                this.service.delegate.onSubscribeRequest(user);
            }
        } else {
            if (this.service.delegate && this.service.delegate.onPresenceUpdate) {
                const type = stanza.type || 'online';
                this.service.delegate.onPresenceUpdate(user, type)
            }
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
        this.rosterId = Utils.getUniqueId('roster');
        const iq = $iq({type: 'get', id: this.rosterId})
            .c('query', {xmlns: Strophe.NS.ROSTER});

        this.service.sendIQ(iq);
    }

    removeFromRoster(username){
        const iq = $iq({type: 'set', id: Utils.getUniqueId('roster')})
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

}


