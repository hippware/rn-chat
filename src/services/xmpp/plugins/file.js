require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
const NS = 'hippware.com/hxep/http-file';
/***
 * This class adds roster functionality to standalone XMPP service
 */
export default class  {
    constructor(service){
        this.service = service;
        if (!service){
            throw new Error("No xmpp service is defined for plugin");
        }
        this.host = this.service.host;
        this.uploadId = null;
        if (!this.host){
            throw new Error("HOST is not defined");
        }
        Strophe.addNamespace('HTTPFILEX', 'hippware.com/hxep/http-file');
    }

    _onUploadResponseReceived(stanza) {
        console.log("ONUPLOADRESPONSE:", stanza);
        //let roster = [];
        //const children = stanza.query.item;
        //if (children) {
        //    for (let i = 0; i < children.length; i++) {
        //        const jid = children[i].jid;
        //        // ignore other domains
        //        if (Strophe.getDomainFromJid(jid) != this.host) {
        //            continue;
        //        }
        //        const username = Strophe.getNodeFromJid(jid);
        //        const subscription = children[i].subscription;
        //        // offline status by default
        //        roster.push({username, subscription, status: 'unavailable'})
        //    }
        //    if (this.service.delegate && this.service.delegate.onRosterReceived) {
        //        this.service.delegate.onRosterReceived(roster);
        //    }
        //}
    }


    onIQ(stanza){
        const id = stanza.id;
        console.log("_onIQ "+id+" " +this.rosterId);
        if (id == this.rosterId){
            this._onRosterReceived(stanza);
        }
    }

    /**
     * Send file upload request and get results to callback function
     * @param callback function will be called with result
     */
    requestUpload(){
        this.uploadId = Utils.getUniqueId('file');
        const iq = $iq({type: 'get', id: this.uploadId})
            .c('upload-request', {xmlns: NS});

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


