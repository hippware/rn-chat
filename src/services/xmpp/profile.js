require("./strophe");
import Utils from './utils';
import assert from 'assert';
import service from './xmpp';
import fileService from './file';

const NS = 'hippware.com/hxep/user';
class ProfileService {
    constructor(){
        this.requestProfile = this.requestProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.requestNode = this.requestNode.bind(this);
        this.cache = {};
    }

    async requestNode(node, fields, skipCache){
        if (!skipCache && this.cache[node]){
            console.log("CACHED =", node);
            this.cache[node].cached = true;
            return this.cache[node];
        }
        const file = tempDir + '/' + node.replace('/','_') +".json";
        console.log("REQUEST NODE:", file);
        if (!skipCache && await fileExists(file)){
            console.log("EXISTED FILE:", file);
            this.cache[node] = {...JSON.parse(await readFile(file)), cached:true};
            return this.cache[node];
        }
        let iq = $iq({type: 'get', to: service.host})
            .c('get', {xmlns: NS, node});
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
        // download avatar
        if (res.avatar){
            res.avatarPath = await fileService.requestDownload(res.avatar);
        }
        if (res.node == 'user/' + service.username) {
            res.own = true;
        } else {
            await writeFile(file, JSON.stringify(res));
            this.cache[node] = res;
        }
        return res;
    }
    /**
     * Send file upload request
     */
    async requestProfile(user, fieldsData, skipCache = false) {
        assert(user || service.username, "No username is defined for profile request");
        const node = 'user/'+(user || service.username);
        let fields = fieldsData || (user ? ['avatar', 'handle','firstName', 'lastName'] : ['avatar', 'handle', 'firstName', 'lastName','email']);
        return this.requestNode(node, fields, skipCache);
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
