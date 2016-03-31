require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
import assert from 'assert';
import {HOST} from '../../../globals';

const NS = 'hippware.com/hxep/user';
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
        this._onUserProfileReceived = this._onUserProfileReceived.bind(this);
        this._onUserProfileUpdateReceived = this._onUserProfileUpdateReceived.bind(this);
        this.requestProfile = this.requestProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        if (!this.host){
            throw new Error("HOST is not defined");
        }
        Strophe.addNamespace('HTTPFILEX', 'hippware.com/hxep/http-file');
    }

    _onUserProfileReceived(stanza) {
        if (this.service.delegate && this.service.delegate.onUserProfileReceived && stanza.fields){
            let data = stanza.fields.field;
            let res = {};
            for (let item of data){
                let value = item.value;
                if (typeof value === 'object'){
                    value = value['#text'];
                }
                res[item.var] = value;
            }
            res.node = stanza.fields.node;
            this.service.delegate.onUserProfileReceived(res);
        }
    }

    _onUserProfileUpdateReceived(stanza) {
        if (this.service.delegate && this.service.delegate.onUserProfileUpdateReceived && stanza.fields){
            console.log("USERPROFILEUPDATE", stanza);
            let res = {};
            res.node = stanza.fields.node;
            this.service.delegate.onUserProfileUpdateReceived(res);
        }
    }

    onConnected(username, password){
        this.username = username;
    }

    onIQ(stanza){
        if (stanza.id.indexOf('requestProfile') != -1){
            this._onUserProfileReceived(stanza);
        }
        if (stanza.id.indexOf('updateProfile') != -1){
            this._onUserProfileUpdateReceived(stanza);
        }
    }

    /**
     * Send file upload request
     */
    requestProfile(node, fields){
        assert(node, "node should be defined");
        let id = Utils.getUniqueId('requestProfile');
        let iq = $iq({type: 'get',to:HOST, id})
            .c('get', {xmlns: NS, node});
        for (let field of fields){
           iq = iq.c('field', {var:field}).up()
        }

        this.service.sendIQ(iq);
    }

    updateProfile(node, data){
        assert(node, "node should be defined");
        let id = Utils.getUniqueId('updateProfile');
        let iq = $iq({type: 'set',to:HOST, id})
            .c('set', {xmlns: NS, node});
        for (let field of Object.keys(data)){
            if (data.hasOwnProperty(field)){
                iq = iq.c('field', {var:field, type:'string'}).c('value').t(data[field]).up().up()
            }
        }

        this.service.sendIQ(iq);
    }



}


