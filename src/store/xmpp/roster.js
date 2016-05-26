require("./strophe");
var Strophe = global.Strophe;
import service, {PRESENCE_RECEIVED} from './xmpp';
import assert from 'assert';
const NS = 'jabber:iq:roster';
const FAVORITE_GROUP = '__star__';
/***
 * This class adds roster functionality to standalone XMPP service
 */
class RosterService {
    constructor(){
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.authorize = this.authorize.bind(this);
        this.unauthorize = this.unauthorize.bind(this);
        this.requestRoster = this.requestRoster.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this._onPresence = this._onPresence.bind(this);
        service[PRESENCE_RECEIVED] = this._onPresence;
        this.onPresenceUpdate = null;
        this.onSubscribeRequest = null;
    }

    _onPresence(stanza) {
        const jid = stanza.from;
        const user = Strophe.getNodeFromJid(jid);
        const presence = { type: stanza.type || 'online', own: user == service.username, user, status: stanza.status || 'online'};

        if (presence.type === 'subscribe'){
            this.onSubscribeRequest(presence);
        } else if (!presence.own){
            this.onPresenceUpdate(presence);
        }
    }

    /**
     * Send roster request and get results to callback function
     * @param callback function will be called with result
     */
    async requestRoster(){
        const iq = $iq({type: 'get'}).c('query', {xmlns: NS});
        const stanza = await service.sendIQ(iq);

        let roster = [];
        let children = stanza.query.item;
        if (children && !Array.isArray(children)){
            children = [children];
        }
        if (children) {
            for (let i = 0; i < children.length; i++) {
                const jid = children[i].jid;
                // ignore other domains
                if (Strophe.getDomainFromJid(jid) != service.host) {
                    continue;
                }
                const username = Strophe.getNodeFromJid(jid);
                // offline status by default
                roster.push({username, ...children[i], isFavorite:children[i].group == FAVORITE_GROUP})
            }
        }
        console.log("RECEIVED ROSTER:", roster);
        return roster;
    }

    remove({user}){
        assert(user, "User is not defined to remove");
        const iq = $iq({type: 'set'})
            .c('query', {xmlns: NS}).c('item', { jid:user + '@' + service.host, subscription:'remove'});
        return service.sendIQ(iq);
    }

    async add({user}){
        assert(user, "User is not defined for addition to the roster");
        const iq = $iq({type: 'set'})
            .c('query', {xmlns: NS}).c('item', { jid:user + '@' + service.host});
        const stanza = await service.sendIQ(iq);
        return user;

    }

    async addFavorite({user}){
        assert(user, "User is not defined for addition to the roster");
        const iq = $iq({type: 'set'})
            .c('query', {xmlns: NS}).c('item', { jid:user + '@' + service.host}).c('group').t(FAVORITE_GROUP);
        const stanza = await service.sendIQ(iq);
        return user;

    }

    /**
     * Send 'subscribe' request for given user
     * @param username username to subscribe
     */
    subscribe(username){
        console.log("SUBSCRIBE::::", username);
        service.sendPresence({to: username + "@" + service.host, type:'subscribe'});
    }

    /**
     * Send 'subscribed' request for given user
     * @param username user to send subscribed
     */
    authorize(username){
        service.sendPresence({to: username + "@" + service.host, type:'subscribed'});
    }

    /**
     * unsubscribe from the user's with username presence
     * @param username username to unsubscribe
     */
    unsubscribe(username){
        service.sendPresence({to: username + "@" + service.host, type:'unsubscribe'});
    }

    /**
     * Unauthorize the user with username to subscribe to the authenticated user's presence
     * @param username username to unauthorize
     */
    unauthorize(username){
        service.sendPresence({to: username + "@" + service.host, type:'unsubscribed'});
    }

}



export default new RosterService();