import service from './../../services/roster';
import * as xmpp from './xmpp';

export const REQUEST_UNSUBSCRIBE = 'REQUEST_UNSUBSCRIBE';
export function requestUnsubscribe(user){
    return { type: REQUEST_UNSUBSCRIBE, user };
}

export const REQUEST_SUBSCRIBE = 'REQUEST_SUBSCRIBE';
export function requestSubscribe(user){
    return { type: REQUEST_SUBSCRIBE, user };
}

export const REQUEST_AUTHORIZE = 'REQUEST_AUTHORIZE';
export function requestAuthorize(user){
    return { type: REQUEST_AUTHORIZE, user };
}

export const REQUEST_UNAUTHORIZE = 'REQUEST_UNAUTHORIZE';
export function requestUnauthorize(user){
    return { type: REQUEST_UNAUTHORIZE, user };
}

export const SUBSCRIBE_REQUEST_RECEIVED = 'SUBSCRIBE_REQUEST_RECEIVED';
export function subscribeRequestReceived(user){
    return { type: SUBSCRIBE_REQUEST_RECEIVED, user}
}

export const ROSTER_RECEIVED = 'ROSTER_RECEIVED';
export function rosterReceived(list){
    return {type: ROSTER_RECEIVED, list};
}

export const REMOVE_ROSTER_ITEM_REQUEST = 'REMOVE_ROSTER_ITEM_REQUEST';
export function removeRosterItemRequest(user){
    return {type: REMOVE_ROSTER_ITEM_REQUEST, user};
}

export function removeRosterItem(user){
    return dispatch => {
        dispatch(removeRosterItemRequest(user));
        service.removeFromRoster(user);
    }
}

export function subscribe(user) {
    return dispatch => {
        dispatch(requestSubscribe(user));
        service.subscribe(user);
    }
}

export function unsubscribe(user) {
    return dispatch => {
        dispatch(requestUnsubscribe(user));
        service.unsubscribe(user);
    }
}

export function authorize(user) {
    return dispatch => {
        dispatch(requestAuthorize(user));
        service.authorize(user);
    }
}

export function unauthorize(user) {
    return dispatch => {
        dispatch(requestUnauthorize(user));
        service.unauthorize(user);
    }
}

export function processLogin(username, password){
    return dispatch => {
        dispatch(xmpp.requestLogin());
        service.onConnected = () => dispatch(xmpp.connected());
        service.onDisconnected = () => dispatch(xmpp.disconnected());
        service.onAuthFail = () => dispatch(xmpp.authfail());
        service.onMessage = (msg) => dispatch(xmpp.messageReceived(msg));
        service.login(username, password);
        service.onRosterReceived = (result)=> dispatch(rosterReceived(result));
        service.onSubscribeRequest = (user) => dispatch(subscribeRequestReceived(user));
    }
}

/***
 * This class adds roster functionality to standalone XMPP service
 */
class RosterXmppService {
    constructor(service){
        this.onSubscribeRequest = null;
        this.onRosterReceived = null;
        this.onPresence = null;
        this.onDisconected = null;
        this.onAuthFail = null;
        this.service = service;
        this.host = this.service.host;
        this.service.onPresence = this._onPresence.bind(this);
        this.service.onConnected = this._onConnected.bind(this);
        this.service.onMessage = this._onMessage.bind(this);
        this.service.onDisconnected = this._onDisconnected.bind(this);
        this.service.onIQ = this._onIQ.bind(this);
        Strophe.addNamespace('ROSTERX', 'http://jabber.org/protocol/rosterx');
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
        if (this.onIQ){
            this.onIQ(stanza);
        }
        return true;
    }

    _onRosterReceived(list){
        if (this.onRosterReceived){
            this.onRosterReceived(list);
        }
    }

    _onConnected(){
        console.log("RosterService _onConnected");
        if (this.onConnected){
            this.onConnected();
        }
        this.requestRoster(this._onRosterReceived.bind(this));
    }


    _onPresence(stanza){
        console.log("INPUT PRESENCE:"+Strophe.serialize(stanza));
        const jid = stanza.getAttribute("from");
        const user = Strophe.getNodeFromJid(jid);
        if (stanza.getAttribute("type") == "subscribe" && this.onSubscribeRequest) {
            this.onSubscribeRequest(user);
        }
        if (this.onPresence){
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
     * @param data
     */
    requestRoster(callback){
        const iq = $iq({type: 'get', id: this.service.getUniqueId('roster')})
            .c('query', {xmlns: Strophe.NS.ROSTER});
        this.service.sendIQ(iq, function (stanza) {
            console.log("ROSTER:"+Strophe.serialize(stanza));
            let roster = [];
            const children = stanza.childNodes[0].childNodes;
            for (let i=0;i<children.length;i++){
                const jid = children[i].getAttribute('jid');
                const username = Strophe.getNodeFromJid(jid);
                const subscription = children[i].getAttribute('subscription');
                roster.push({username, subscription})
                console.log("ITEM:"+username);
            }
            callback(roster);
        });
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
        service.login(username, password);
    }
}


let rosterService = new RosterXmppService(service);
