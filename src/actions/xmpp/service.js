export const HOST = 'beng.dev.tinyrobot.com';
export const SERVICE = "wss://"+HOST+"/ws-xmpp";

var strophe = require("react-native-strophe").Strophe;
var Strophe = strophe.Strophe;

class XmppService {
    constructor(host, service){
        this.onConnected = null;
        this.onDisconnected = null;
        this.onAuthFail = null;
        this.onMessage = null;
        this.onIQ = null;
        this.onPresence = null;
        this.onSubscribeRequest = null;

        this.host = host;
        this.service = service;
        this._connection = new Strophe.Connection(this.service);
        Strophe.addNamespace('ROSTERX', 'http://jabber.org/protocol/rosterx');
    }

    _onPresence(stanza){
        console.log("INPUT PRESENCE:"+Strophe.serialize(stanza));
        const jid = stanza.getAttribute("from");
        const user = Strophe.getNodeFromJid(jid);
        if (stanza.getAttribute("type") == "subscribe" && this.onSubscribeRequest) {
            this.onSubscribeRequest(user);
        } else if (this.onPresence){
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

    /**
     * Send roster request and get results to callback function
     * @param data
     */
    requestRoster(callback){
        const iq = $iq({type: 'get',  id: this._connection.getUniqueId('roster')})
            .c('query', {xmlns: Strophe.NS.ROSTER});
        this._connection.sendIQ(iq.tree(), function (stanza) {
            console.log("ROSTER:"+Strophe.serialize(stanza));
            let roster = [];
            const children = stanza._childNodes[0]._childNodes;
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

    /**
     * Send presence with given data
     * @param data presence data
     */
    sendPresence(data){
        // send presence
        this._connection.send($pres(data));
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

    sendMessage(msg){
        this._connection.send($msg({to: msg.to + "@" + this.host, type: 'chat'}).c("body").t(msg.body));
    }

    login(username, password){
        const self = this;
        this._connection.connect(username + "@" + this.host, password, function (status) {
            switch (status){
                case Strophe.Status.CONNECTED:
                    self.sendPresence();
                    if (self._connection){
                        self._connection.addHandler(self._onMessage.bind(self), null, "message", null, null);
                        self._connection.addHandler(self._onPresence.bind(self), null, "presence", null, null);
                        self._connection.addHandler(self._onIQ.bind(self), null, "iq", null, null);
                    }
                    if (self.onConnected) self.onConnected();
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