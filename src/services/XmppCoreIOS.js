import XMPP from 'react-native-xmpp';
import {HOST, HYBRID_XMPP} from '../globals';

export class XmppService {
    constructor(host){
        this.onConnected = null;
        this.onPresenceUpdate = null;
        this.onRosterReceived = null;
        this.onDisconnected = null;
        this.onAuthFail = null;
        this.onMessage = null;
        this.onIQ = null;
        this.onPresence = null;

        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.host = host;
        this.username = null;
        this.startTime = null;
        XMPP.on('login', this._onConnected.bind(this));
        XMPP.on('loginError', this._onAuthFail.bind(this));
        XMPP.on('disconnect', this._onDisconnected.bind(this));
        XMPP.on('roster', this._onRoster.bind(this));
        XMPP.on('presence', this._onPresence.bind(this));
        XMPP.on('message', this._onMessage.bind(this));
        XMPP.on('iq', this._onIQ.bind(this));
    }

    _onAuthFail(error){
        if (this.onAuthFail){
            this.onAuthFail(error);
        }
    }

    getUniqueId(suffix) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        if (typeof(suffix) == "string" || typeof(suffix) == "number") {
            return uuid + ":" + suffix;
        } else {
            return uuid + "";
        }
    }

    sendIQ(stanza){
        // serialize stanza
        XMPP.sendStanza(stanza.toString());
    }

    getNodeJid(jid) {
        if (jid.indexOf("@") < 0) {
            return null;
        }
        return jid.split("@")[0];
    }

    _onPresence(stanza){
        if (this.onPresence){
            this.onPresence(stanza);
        }
    }

    _onIQ(stanza){
        if (this.onIQ){
            this.onIQ(stanza);
        }

    }

    _onRoster(list){
        console.log("XMPP ROSTER RECEIVED (iOS):"+(new Date()-this.startTime)/1000);
        if (this.onRosterReceived){
            this.onRosterReceived(list);
        }
    }

    _onConnected(){
        this.isConnected = true;
        console.log("XMPP CONNECTED (iOS):"+(new Date()-this.startTime)/1000);
        if (!HYBRID_XMPP){
            XMPP.fetchRoster();
        }
        if (this.onConnected){
            this.onConnected();
        }
    }

    _onDisconnected(error){
        if (!XMPP.isConnected){
            return;
        }
        this.isConnected = false;
        if (this.onDisconnected){
            this.onDisconnected();
        }
    }

    _onMessage(message){
        console.log("INCOMING MESSAGE:",message);
        if (message.body){
            const user = this.getNodeJid(message.from);
            let time = Date.now();
            if (this.onMessage){
                this.onMessage({body: message.body, from:user, time});
            }
        }
    }

    removeFromRoster(username){
        XMPP.removeFromRoster(username + "@" + this.host);
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


    login(username, password){
        this.username = username;
        this.startTime = new Date();
        XMPP.connect(username + "@" + this.host, password);
    }

    sendMessage(msg){
        console.log("SENDING XMPP MESSAGE", msg);
        XMPP.message(msg.body, msg.to + "@" + this.host);
    }

    sendPresence(data){
        XMPP.presence(data.to, data.type);
    }

    disconnect(){
        XMPP.disconnect();
    }


}

let service = new XmppService(HOST);

export default service;