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
    async requestProfile(node, fields = ['avatar', 'handle']) {
        if (!node) {
            node = service.username;
        }
        assert(node, "node should be defined");
        let iq = $iq({type: 'get', to: service.host})
            .c('get', {xmlns: NS, node: 'user/' + node});
        for (let field of fields) {
            iq = iq.c('field', {var: field}).up()
        }

        const stanza = await service.sendIQ(iq);

        let data = stanza.fields.field;
        let res = {};
        for (let item of data) {
            res[item.var] = item.value;
        }
        res.node = stanza.fields.node;
        if (res.node == 'user/' + service.username) {
            res.own = true;
        }
        return res;
    }

    async updateProfile(node, data) {
        if (!node) {
            node = service.username;
        }
        assert(node, "node should be defined");
        assert(data, "data should be defined");
        let iq = $iq({type: 'set', to: service.host})
            .c('set', {xmlns: NS, node: 'user/' + node});
        for (let field of Object.keys(data)) {
            if (data.hasOwnProperty(field) && data[field]) {
                iq = iq.c('field', {var: field, type: field==='avatar'? 'file': 'string'}).c('value').t(data[field]).up().up()
            }
        }
        const stanza = await service.sendIQ(iq);
        let res = {...data};
        if (node == service.username) {
            res.own = true;
        }
        return res;
    }



}


export default new ProfileService();
