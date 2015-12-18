import Utils from '../utils';
/***
 * This class adds message functionality to XMPP service
 */
export default class {
    constructor(service) {
        if (!service) {
            throw new Error("No xmpp service is defined for plugin");
        }
        this.service = service;
        this.onMessage = this.onMessage.bind(this);

    }

    onMessage(stanza) {
        console.log("MESSAGE RECEIVED:",stanza);
        const jid = stanza.from;
        const user = Utils.getNodeJid(jid);
        const type = stanza.type;
        const body = stanza.body;
        const id = stanza.id;
        let time = Date.now();
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
}
