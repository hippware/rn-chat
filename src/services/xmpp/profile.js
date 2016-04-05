require("./strophe");
import Utils from './utils';
import assert from 'assert';
import service from './xmpp';

const NS = 'hippware.com/hxep/user';
class ProfileService {
    constructor(){
        this.requestProfile = this.requestProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }
    /**
     * Send file upload request
     */
    requestProfile(node, fields = ['avatar', 'handle']){
        if (!node){
            node = service.username;
        }
        assert(node, "node should be defined");
        return new Promise((resolve, reject)=>{
            let iq = $iq({type: 'get',to:service.host})
                .c('get', {xmlns: NS, node:'user/'+node});
            for (let field of fields){
                iq = iq.c('field', {var:field}).up()
            }

            service.sendIQ(iq).then(stanza=>{
                let data = stanza.fields.field;
                let res = {};
                for (let item of data){
                    res[item.var] = item.value;
                }
                res.node = stanza.fields.node;
                if (res.node == 'user/'+service.username){
                    res.own = true;
                }
                resolve(res);
            });
        });
    }

    updateProfile(node, data){
        if (!node){
            node = service.username;
        }
        assert(node, "node should be defined");
        assert(data, "data should be defined");
        return new Promise((resolve, reject)=> {
            let iq = $iq({type: 'set', to: service.host})
                .c('set', {xmlns: NS, node:'user/'+node});
            for (let field of Object.keys(data)) {
                if (data.hasOwnProperty(field) && data[field]) {
                    iq = iq.c('field', {var: field, type: 'string'}).c('value').t(data[field]).up().up()
                }
            }
            service.sendIQ(iq).then(stanza=>{
                if (stanza.setResponse){
                    resolve(data);
                } else {
                    reject(stanza);
                }
            }).catch(stanza=>reject(stanza.error));
        });

    }



}


export default new ProfileService();
