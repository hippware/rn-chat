require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
import assert from 'assert';
import {HOST} from '../../../globals';

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
        this._onUploadResponseReceived = this._onUploadResponseReceived.bind(this);
        this.requestUpload = this.requestUpload.bind(this);
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

    onConnected(username, password){
        this.username = username;
    }

    onIQ(stanza){
        const id = stanza.id;
        if (id == this.uploadId){
            this._onUploadResponseReceived(stanza);
        }
    }

    /**
     * Send file upload request
     */
    requestUpload({filename, size, mimeType, width, height, purpose}){
        assert(filename, "filename should be defined");
        assert(size, "size should be defined");
        assert(mimeType, "mimeType should be defined");
        assert(width, "width should be defined");
        assert(height, "height should be defined");
        if (!purpose){
            purpose = 'avatar:'+this.username + '@' + HOST;
        }
        this.uploadId = Utils.getUniqueId('file');
        const iq = $iq({type: 'get', id: this.uploadId})
            .c('upload-request', {xmlns: NS})
                .c('filename', {}).t(filename).up()
                .c('size', {}).t(size).up()
                .c('mime-type', {}).t(mimeType).up()
                .c('width', {}).t(width).up()
                .c('height', {}).t(height).up()
                .c('purpose', {}).t(purpose);

        this.service.sendIQ(iq);
    }



}


