"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const Utils = require("./utils");
const FileService_1 = require("./FileService");
require("./XmppStropheV2");
const utils_1 = require("./utils");
const TIMEOUT = 10000;
const BOT_NS = 'hippware.com/hxep/bot';
const EXPLORE_NEARBY = 'explore-nearby-result';
const FILE_NS = 'hippware.com/hxep/http-file';
const ROSTER = 'jabber:iq:roster';
const NEW_GROUP = '__new__';
const BLOCKED_GROUP = '__blocked__';
const PUSH_NS = 'hippware.com/hxep/notifications';
const MEDIA = 'hippware.com/hxep/media';
const CONVERSATION_NS = 'hippware.com/hxep/conversations';
const RSM_NS = 'http://jabber.org/protocol/rsm';
const MAM_NS = 'urn:xmpp:mam:1';
const MAXINT = 1000;
const USER = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
const EVENT_NS = 'hippware.com/hxep/publishing';
class XmppTransport {
    constructor(provider, fileService, resource) {
        this.connected = false;
        this.connecting = false;
        this.iq = {};
        this.rosterItem = {};
        this.isGeoSearching = false;
        this.provider = provider;
        this.resource = resource;
        this.fileService = fileService;
        provider.onConnected = () => (this.connected = true);
        provider.onDisconnected = () => (this.connected = false);
        provider.onIQ = (iq) => {
            this.iq = iq;
            try {
                if (iq.query && iq.query.item && !utils_1.isArray(iq.query.item) && iq.query.item.jid) {
                    this.rosterItem = processRosterItem(iq.query.item, this.host);
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        provider.onMessage = (msg) => {
            if (msg.body || msg.media || msg.image || msg.result) {
                const _a = processMessage(Object.assign({}, msg, { unread: true }), this.username), { chatId } = _a, message = tslib_1.__rest(_a, ["chatId"]);
                this.message = { id: chatId, message };
            }
            else if (msg[EXPLORE_NEARBY] && msg[EXPLORE_NEARBY].bot) {
                if (msg[EXPLORE_NEARBY].bot) {
                    const bot = msg[EXPLORE_NEARBY].bot;
                    this.geoBot = Object.assign({ id: bot.id }, utils_1.processMap(bot));
                }
            }
            else if (msg.notification) {
                if (msg.notification['reference-changed']) {
                    this.notification = Object.assign({ changed: true }, msg.notification['reference-changed']);
                }
                else if (msg.notification.item) {
                    const item = processItem(msg.notification.item, msg.delay, this.username);
                    if (item) {
                        this.notification = Object.assign({}, item, { version: msg.notification.item.version });
                    }
                }
                else if (msg.notification.delete) {
                    this.notification = Object.assign({}, msg.notification.delete, { delete: true });
                }
                else {
                    console.warn('& notification: unhandled homestream notification', msg.notification);
                }
            }
        };
        provider.onPresence = (stanza) => {
            const id = Utils.getNodeJid(stanza.from);
            if (stanza.type === 'unavailable' || stanza.type === 'available' || !stanza.type) {
                const status = stanza.type || 'available';
                this.presence = { status, id };
            }
        };
    }
    login(user, password, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (user) {
                    this.username = user;
                }
                if (password) {
                    this.password = password;
                }
                if (host) {
                    this.host = host;
                }
                this.connecting = true;
                yield timeout(this.provider.login(this.username, this.password, this.host, this.resource), TIMEOUT);
                return true;
            }
            catch (e) {
                this.connected = false;
                throw e;
            }
            finally {
                this.connecting = false;
            }
        });
    }
    register(data, host, providerName = 'digits') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (host) {
                this.host = host;
            }
            const password = `$J$${JSON.stringify({
                provider: providerName,
                resource: this.resource,
                token: true,
                provider_data: data
            })}`;
            try {
                yield this.provider.login('register', password, this.host, this.resource);
            }
            catch (error) {
                yield this.disconnect();
                let d;
                try {
                    const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement;
                    d = Utils.parseXml(xml).failure;
                }
                catch (e) {
                    throw error;
                }
                if ('redirect' in d) {
                    const { user, server, token } = JSON.parse(d.text);
                    // modify provider host to response's server
                    this.provider.host = server;
                    this.host = server;
                    this.username = user;
                    this.password = token;
                    return { username: user, host: server, password: token };
                }
                else {
                    throw d.text ? new Error(d.text) : error;
                }
            }
            throw 'register must throw exception';
        });
    }
    testRegister({ phoneNumber }, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.register({
                userID: `000000${phoneNumber}`,
                phoneNumber: `+1555${phoneNumber}`,
                authTokenSecret: '',
                authToken: '',
                emailAddressIsVerified: false,
                'X-Auth-Service-Provider': 'http://localhost:9999',
                emailAddress: '',
                'X-Verify-Credentials-Authorization': ''
            }, host);
        });
    }
    disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.provider.disconnectAfterSending();
            yield timeout(new Promise(resolve => mobx_1.when(() => !this.connected, resolve)), TIMEOUT);
        });
    }
    sendIQ(data, withoutTo = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!data.tree().getAttribute('id')) {
                data.tree().setAttribute('id', Utils.getUniqueId('iq'));
            }
            if (!data.tree().getAttribute('to') && !withoutTo) {
                data.tree().setAttribute('to', this.host);
            }
            if (!data.tree().getAttribute('from')) {
                data.tree().setAttribute('from', `${this.username}@${this.host}`);
            }
            const id = data.tree().getAttribute('id');
            this.provider.sendIQ(data);
            return yield new Promise((resolve, reject) => mobx_1.when(() => this.iq && this.iq.id === id, () => {
                const stanza = this.iq;
                if (stanza.type === 'error') {
                    reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error['#text'] || stanza.error);
                    // reject('ERROR for stanza: ' + data.toString() + ' ' + (stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error))
                }
                else {
                    resolve(stanza);
                }
            }));
        });
    }
    loadProfile(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = user;
            const isOwn = id === this.username;
            const node = `user/${user}`;
            const fields = ['avatar', 'handle', 'first_name', 'tagline', 'last_name', 'bots+size', 'followers+size', 'followed+size', 'roles'];
            if (isOwn) {
                fields.push('email');
                fields.push('phone_number');
            }
            let iq = $iq({ type: 'get' }).c('get', { xmlns: USER, node });
            fields.forEach(field => {
                iq = iq.c('field', { var: field }).up();
            });
            const stanza = yield this.sendIQ(iq);
            return Object.assign({ id }, utils_1.processMap(stanza));
        });
    }
    requestProfiles(users) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!users || !users.length) {
                return [];
            }
            let iq = $iq({ type: 'get' }).c('users', { xmlns: USER });
            users.forEach(user => {
                iq = iq.c('user', { jid: `${user}@${this.host}` }).up();
            });
            const stanza = yield this.sendIQ(iq);
            let arr = stanza.users.user;
            if (!utils_1.isArray(arr)) {
                arr = [arr];
            }
            return arr.map((user) => (Object.assign({ id: user.user }, utils_1.processMap(user))));
        });
    }
    updateProfile(d) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fields = ['avatar', 'handle', 'email', 'first_name', 'tagline', 'last_name'];
            const data = fromCamelCase(d);
            let iq = $iq({ type: 'set' }).c('set', {
                xmlns: USER,
                node: `user/${this.username}`
            });
            fields.forEach(field => {
                if (data[field]) {
                    iq = iq
                        .c('field', {
                        var: field,
                        type: field === 'avatar' ? 'file' : 'string'
                    })
                        .c('value')
                        .t(data[field])
                        .up()
                        .up();
                }
            });
            yield this.sendIQ(iq);
        });
    }
    lookup(handle) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get' })
                .c('lookup', { xmlns: HANDLE })
                .c('item', { id: handle });
            const stanza = yield this.sendIQ(iq);
            const { jid, error } = stanza.results.item;
            if (error) {
                throw error;
            }
            const user = Strophe.getNodeFromJid(jid);
            return Object.assign({ id: user }, utils_1.processMap(stanza.results.item));
        });
    }
    remove() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.sendIQ($iq({ type: 'set' }).c('delete', { xmlns: USER }));
            yield this.disconnect();
        });
    }
    loadRelations(userId, relation = 'following', lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({
                type: 'get',
                to: this.host
            })
                .c('contacts', {
                xmlns: 'hippware.com/hxep/user',
                node: `user/${userId}`
            })
                .c('association')
                .t(relation)
                .up()
                .c('set', { xmlns: RSM_NS })
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('after')
                    .t(lastId)
                    .up();
            }
            const stanza = yield this.sendIQ(iq);
            let children = stanza.contacts.contact || [];
            if (!utils_1.isArray(children)) {
                children = [children];
            }
            const list = children.filter(({ jid }) => Strophe.getDomainFromJid(jid)).map(({ jid }) => ({ id: Strophe.getNodeFromJid(jid) }));
            return { list, count: parseInt(stanza.contacts.set.count) };
        });
    }
    downloadURL(tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get' })
                .c('download-request', { xmlns: FILE_NS })
                .c('id', {})
                .t(tros);
            let data = yield this.sendIQ(iq);
            if (!data) {
                throw 'invalid data';
            }
            if (!data.download) {
                throw 'file data should be defined';
            }
            data = data.download;
            const headers = {};
            if (data.headers && data.headers.header) {
                let arr = data.headers.header;
                if (!utils_1.isArray(arr)) {
                    arr = [arr];
                }
                for (const header of arr) {
                    headers[header.name] = header.value;
                }
            }
            return { url: data.url, headers };
        });
    }
    downloadFile(tros, name, sourceUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const folder = `${this.fileService.tempDir}/${tros.split('/').slice(-1)[0]}`;
            if (!(yield this.fileService.fileExists(folder))) {
                yield this.fileService.mkdir(folder);
            }
            const mainFileName = `${folder}/main.jpeg`;
            const fileName = `${folder}/${name}.jpeg`;
            const res = { uri: fileName, contentType: 'image/jpeg' };
            // check main file first
            if (yield this.fileService.fileExists(mainFileName)) {
                const response = yield this.fileService.getImageSize(mainFileName);
                if (response) {
                    res.uri = mainFileName;
                    res.width = response.width;
                    res.height = response.height;
                    res.cached = true;
                    return res;
                }
            }
            if (mainFileName !== fileName && (yield this.fileService.fileExists(fileName))) {
                const response = yield this.fileService.getImageSize(fileName);
                if (response) {
                    res.width = response.width;
                    res.height = response.height;
                    res.cached = true;
                    return res;
                }
            }
            return new Promise((resolve, reject) => {
                mobx_1.when(() => this.connected, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        let url = sourceUrl, headers = null;
                        if (!sourceUrl) {
                            const data = yield this.downloadURL(tros);
                            url = data.url;
                            headers = data.headers;
                        }
                        yield this.fileService.downloadHttpFile(url, fileName, headers);
                    }
                    catch (e) {
                        try {
                            yield this.fileService.removeFile(fileName);
                        }
                        catch (err) { }
                        resolve();
                        return;
                    }
                    res.cached = true;
                    const response = yield this.fileService.getImageSize(fileName);
                    if (response) {
                        res.width = response.width;
                        res.height = response.height;
                    }
                    resolve(res);
                }));
            });
        });
    }
    downloadThumbnail(url, tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.downloadFile(tros, 'thumbnail', url);
        });
    }
    downloadTROS(tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.downloadFile(tros, 'main', '');
        });
    }
    requestUpload({ file, size, width, height, access }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set' })
                .c('upload-request', { xmlns: FILE_NS })
                .c('filename', {})
                .t(file.name)
                .up()
                .c('size', {})
                .t(size)
                .up()
                .c('mime-type', {})
                .t(file.type)
                .up()
                .c('width', {})
                .t(width)
                .up()
                .c('height', {})
                .t(height)
                .up();
            if (access) {
                iq.c('access', {}).t(access);
            }
            // pass file to the result
            const stanza = yield this.sendIQ(iq);
            const data = Object.assign({}, stanza.upload, { file });
            // run upload in background
            FileService_1.upload(data);
            return data.reference_url;
        });
    }
    sendStanza(stanza) {
        this.provider.sendStanza(stanza);
    }
    sendPresence(stanza) {
        this.provider.sendPresence(stanza);
    }
    addToRoster(username, group) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: `${this.username}@${this.host}` })
                .c('query', { xmlns: ROSTER })
                .c('item', { jid: `${username}@${this.host}` })
                .c('group')
                .t(group);
            yield this.sendIQ(iq);
        });
    }
    removeFromRoster(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: `${this.username}@${this.host}` })
                .c('query', { xmlns: ROSTER })
                .c('item', { jid: `${username}@${this.host}`, subscription: 'remove' });
            yield this.sendIQ(iq);
        });
    }
    follow(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.sendPresence({ to: `${username}@${this.host}`, type: 'subscribe' });
            yield this.addToRoster(username, '');
        });
    }
    unfollow(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.sendPresence({ to: `${username}@${this.host}`, type: 'unsubscribe' });
        });
    }
    block(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.addToRoster(username, BLOCKED_GROUP);
        });
    }
    unblock(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.addToRoster(username, '');
        });
    }
    requestRoster() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: `${this.username}@${this.host}` }).c('query', {
                xmlns: ROSTER
            });
            const stanza = yield this.sendIQ(iq);
            let children = stanza.query.item;
            if (children && !utils_1.isArray(children)) {
                children = [children];
            }
            return children.map((rec) => processRosterItem(rec, this.host));
        });
    }
    enablePush(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set' }).c('enable', {
                xmlns: PUSH_NS,
                platform: 'apple',
                device: token
            });
            const data = yield this.sendIQ(iq);
            if (!data || !(data.enabled || data.enabled === ''))
                throw data;
        });
    }
    disablePush() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set' }).c('disable', { xmlns: PUSH_NS });
            const data = yield this.sendIQ(iq);
            if (!data || !(data.disabled || data.disabled === ''))
                throw data;
        });
    }
    sendMessage(msg) {
        let stanza = $msg({
            to: `${msg.to}@${this.host}`,
            type: 'chat',
            id: msg.id
        })
            .c('body')
            .t(msg.body ? msg.body.trim() : '');
        if (msg.media) {
            stanza = stanza
                .up()
                .c('image', { xmlns: MEDIA })
                .c('url')
                .t(msg.media.id);
        }
        this.provider.sendStanza(stanza);
    }
    loadChat(userId, lastId, max = 20) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: `${this.username}@${this.host}` })
                .c('query', { xmlns: MAM_NS })
                .c('x', { xmlns: 'jabber:x:data', type: 'submit' })
                .c('field', { var: 'FORM_TYPE', type: 'hidden' })
                .c('value')
                .t(MAM_NS)
                .up()
                .up()
                .c('field', { var: 'reverse' })
                .c('value')
                .t('true')
                .up()
                .up()
                .c('field', { var: 'with' })
                .c('value')
                .t(`${userId}@${this.host}`)
                .up()
                .up()
                .up()
                .c('set', { xmlns: RSM_NS })
                .c('max')
                .t(max.toString())
                .up()
                .c('before');
            if (lastId) {
                iq.t(lastId).up();
            }
            return yield this.sendIQ(iq);
        });
    }
    loadChats(max = 50) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const items = [];
            let count = MAXINT;
            let last;
            while (items.length < count) {
                const iq = $iq({ type: 'get', to: this.username + '@' + this.host })
                    .c('query', { xmlns: CONVERSATION_NS })
                    .c('set', { xmlns: RSM_NS });
                if (last) {
                    iq
                        .c('after')
                        .t(last)
                        .up();
                }
                iq.c('max').t(max.toString());
                const data = yield this.sendIQ(iq);
                if (!data || !data.query || !data.query.item) {
                    return [];
                }
                let res = data.query.item;
                count = data.query.set.count;
                last = data.query.set.last;
                if (!utils_1.isArray(res)) {
                    res = [res];
                }
                for (const item of res) {
                    items.push(item);
                }
            }
            return items.map((item) => {
                const { other_jid, message, outgoing, timestamp } = item;
                const sender = Utils.getNodeJid(other_jid);
                const from = outgoing === 'true' ? this.username : sender;
                const to = outgoing === 'true' ? sender : this.username;
                return { id: sender, message: processMessage(Object.assign({}, message, { to, from, time: Utils.iso8601toDate(timestamp).getTime() }), this.username) };
            });
        });
    }
    generateId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set' }).c('new-id', { xmlns: BOT_NS });
            const data = yield this.sendIQ(iq);
            if (data['new-id']) {
                if (data['new-id']['#text']) {
                    return data['new-id']['#text'];
                }
                else {
                    return data['new-id'];
                }
            }
            else {
                throw 'Cannot generate ID';
            }
        });
    }
    removeBot(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: this.host }).c('delete', { xmlns: BOT_NS, node: `bot/${id}` });
            yield this.sendIQ(iq);
        });
    }
    loadOwnBots(userId, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.host })
                .c('bot', { xmlns: BOT_NS, user: `${userId}@${this.host}` })
                .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
                .c('reverse')
                .up()
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('before')
                    .t(lastId)
                    .up();
            }
            else {
                iq.c('before').up();
            }
            const data = yield this.sendIQ(iq);
            let bots = data.bots.bot;
            if (!bots) {
                bots = [];
            }
            if (!utils_1.isArray(bots)) {
                bots = [bots];
            }
            return { list: bots.map((item) => (Object.assign({ id: item.id }, utils_1.processMap(item)))), count: parseInt(data.bots.set.count) };
        });
    }
    loadBotSubscribers(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.host })
                .c('subscribers', {
                xmlns: BOT_NS,
                node: `bot/${id}`
            })
                .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
                .up()
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('after')
                    .t(lastId)
                    .up();
            }
            const data = yield this.sendIQ(iq);
            console.log('subscribers', data);
            let arr = data.subscribers.subscriber || [];
            if (!utils_1.isArray(arr)) {
                arr = [arr];
            }
            const list = yield this.requestProfiles(arr.map((rec) => rec.jid.split('@')[0]));
            return { list, count: parseInt(data.subscribers.set.count) };
        });
    }
    loadBotGuests(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('loadBotGuests', id, lastId, max)
            const iq = $iq({ type: 'get', to: this.host }).c('guests', {
                xmlns: BOT_NS,
                node: `bot/${id}`
            });
            // TODO: RSM?
            // .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
            // .up()
            // .c('max')
            // .t(max.toString())
            // .up()
            // if (lastId) {
            //   iq
            //     .c('after')
            //     .t(lastId!)
            //     .up()
            // }
            const data = yield this.sendIQ(iq);
            let arr = data.guests.guest || [];
            if (!utils_1.isArray(arr)) {
                arr = [arr];
            }
            const list = yield this.requestProfiles(arr.map((rec) => rec.jid.split('@')[0]));
            // return {list, count: parseInt(data.guests.set.count)}
            return { list, count: parseInt(arr.length) };
        });
    }
    loadBotVisitors(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('loadBotGuests', id, lastId, max)
            const iq = $iq({ type: 'get', to: this.host }).c('visitors', {
                xmlns: BOT_NS,
                node: `bot/${id}`
            });
            // TODO: RSM?
            // .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
            // .up()
            // .c('max')
            // .t(max.toString())
            // .up()
            // if (lastId) {
            //   iq
            //     .c('after')
            //     .t(lastId!)
            //     .up()
            // }
            const data = yield this.sendIQ(iq);
            let arr = data.guests.guest || [];
            if (!utils_1.isArray(arr)) {
                arr = [arr];
            }
            const list = yield this.requestProfiles(arr.map((rec) => rec.jid.split('@')[0]));
            // return {list, count: parseInt(data.guests.set.count)}
            return { list, count: parseInt(arr.length) };
        });
    }
    loadBotPosts(id, before) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.host })
                .c('query', { xmlns: BOT_NS, node: `bot/${id}` })
                .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
                .up();
            if (before) {
                iq
                    .c('before')
                    .t(before)
                    .up();
            }
            else {
                iq.c('before').up();
            }
            const data = yield this.sendIQ(iq);
            let res = data.query.item;
            if (!res) {
                res = [];
            }
            if (!utils_1.isArray(res)) {
                res = [res];
            }
            return {
                count: parseInt(data.query.set.count),
                list: res.map((x) => {
                    const post = Object.assign({}, x, x.entry);
                    const profile = {
                        id: Utils.getNodeJid(x.author),
                        handle: post.author_handle,
                        firstName: post.author_first_name,
                        lastName: post.author_last_name,
                        avatar: post.author_avatar
                    };
                    return {
                        id: post.id,
                        content: post.content,
                        image: post.image,
                        time: Utils.iso8601toDate(post.updated).getTime(),
                        profile
                    };
                })
            };
        });
    }
    loadSubscribedBots(userId, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.host })
                .c('subscribed', { xmlns: BOT_NS, user: `${userId}@${this.host}` })
                .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
                .c('reverse')
                .up()
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('before')
                    .t(lastId)
                    .up();
            }
            else {
                iq.c('before').up();
            }
            const data = yield this.sendIQ(iq);
            let bots = data.bots.bot;
            if (!bots) {
                bots = [];
            }
            if (!utils_1.isArray(bots)) {
                bots = [bots];
            }
            return { list: bots.map((item) => (Object.assign({ id: item.id }, utils_1.processMap(item)))), count: parseInt(data.bots.set.count) };
        });
    }
    updateBot(bot) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { title, image, description, address, location, visibility, geofence, radius, id, addressData } = bot;
            const iq = bot.isNew
                ? $iq({ type: 'set' }).c('create', { xmlns: BOT_NS })
                : $iq({ type: 'set' }).c('fields', {
                    xmlns: BOT_NS,
                    node: `bot/${bot.id}`
                });
            addValues(iq, {
                id,
                title,
                address_data: JSON.stringify(addressData),
                description,
                geofence,
                radius: Math.round(radius),
                address,
                image,
                visibility
            });
            addField(iq, 'location', 'geoloc');
            location.addToIQ(iq);
            console.log('IQ:', iq.toString());
            yield this.sendIQ(iq);
        });
    }
    loadBot(id, server) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: server || this.host }).c('bot', { xmlns: BOT_NS, node: `bot/${id}` });
            const data = yield this.sendIQ(iq);
            return Object.assign({ id: data.bot.id }, utils_1.processMap(data.bot));
        });
    }
    removeBotPost(id, postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: this.host })
                .c('retract', { xmlns: BOT_NS, node: `bot/${id}` })
                .c('item', { id: postId });
            yield this.sendIQ(iq);
        });
    }
    shareBot(id, server, recepients, message, type) {
        const msg = $msg({
            from: this.username + '@' + this.host,
            type,
            to: this.host
        }).c('addresses', { xmlns: 'http://jabber.org/protocol/address' });
        recepients.forEach(user => {
            if (user === 'friends') {
                msg.c('address', { type: 'friends' }).up();
            }
            else if (user === 'followers') {
                msg.c('address', { type: 'followers' }).up();
            }
            else {
                msg.c('address', { type: 'to', jid: `${user}@${this.host}` }).up();
            }
        });
        msg.up();
        msg
            .c('body')
            .t(message)
            .up();
        msg
            .c('bot', { xmlns: BOT_NS })
            .c('jid')
            .t(`${server}/bot/${id}`)
            .up()
            .c('id')
            .t(id)
            .up()
            .c('server')
            .t(server)
            .up()
            .c('action')
            .t('share');
        this.sendStanza(msg);
    }
    publishBotPost(botId, post) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: this.host })
                .c('publish', { xmlns: BOT_NS, node: `bot/${botId}` })
                .c('item', { id: post.id, contentID: post.id })
                .c('entry', { xmlns: 'http://www.w3.org/2005/Atom' })
                .c('title')
                .t(post.title)
                .up();
            if (post.content) {
                iq
                    .c('content')
                    .t(post.content)
                    .up();
            }
            if (post.image) {
                iq
                    .c('image')
                    .t(post.image.id)
                    .up();
            }
            yield this.sendIQ(iq);
        });
    }
    subscribeBot(id, geofence = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: this.host })
                .c('subscribe', {
                xmlns: BOT_NS,
                node: `bot/${id}`
            })
                .c('geofence')
                .t(geofence.toString());
            const data = yield this.sendIQ(iq);
            console.log('after sending subscribeBot', data.subscriber_count);
            return parseInt(data['subscriber_count']);
        });
    }
    unsubscribeBot(id, geofence = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'set', to: this.host })
                .c('unsubscribe', {
                xmlns: BOT_NS,
                node: `bot/${id}`
            })
                .c('geofence')
                .t(geofence.toString());
            const data = yield this.sendIQ(iq);
            return parseInt(data['subscriber_count']);
        });
    }
    loadUpdates(ver) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.username + '@' + this.host });
            iq.c('catchup', { xmlns: EVENT_NS, node: 'home_stream', version: ver });
            const data = yield this.sendIQ(iq);
            const { list, version, count, bots } = processHomestreamResponse(data, this.username);
            return { list, version, bots: bots.map((bot) => (Object.assign({ id: bot.id }, utils_1.processMap(bot)))) };
        });
    }
    loadHomestream(lastId, max = 3) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const iq = $iq({ type: 'get', to: this.username + '@' + this.host });
            iq.c('items', { xmlns: EVENT_NS, node: 'home_stream' });
            iq.c('exclude-deleted').up();
            iq
                .c('set', { xmlns: RSM_NS })
                .c('reverse')
                .up()
                .c('max')
                .t(max.toString())
                .up();
            if (lastId) {
                iq
                    .c('before')
                    .t(lastId)
                    .up();
            }
            else {
                iq.c('before').up();
            }
            const data = yield this.sendIQ(iq);
            const { list, count, version, bots } = processHomestreamResponse(data, this.username);
            return { list, count, version, bots: bots.map((bot) => (Object.assign({ id: bot.id }, utils_1.processMap(bot)))) };
        });
    }
    subscribeToHomestream(version) {
        const iq = $pres({ to: `${this.username}@${this.host}/home_stream` }).c('query', {
            xmlns: EVENT_NS,
            version
        });
        this.sendStanza(iq);
    }
    geosearch({ latitude, longitude, latitudeDelta, longitudeDelta }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isGeoSearching) {
                try {
                    this.isGeoSearching = true;
                    const iq = $iq({ type: 'get', to: this.host })
                        .c('bots', {
                        xmlns: BOT_NS
                    })
                        .c('explore-nearby', { limit: 100, lat_delta: latitudeDelta, lon_delta: longitudeDelta, lat: latitude, lon: longitude });
                    yield this.sendIQ(iq);
                }
                catch (e) {
                    // TODO: how do we handle errors here?
                    console.error(e);
                }
                finally {
                    this.isGeoSearching = false;
                }
            }
        });
    }
}
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "connected", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "connecting", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "iq", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "rosterItem", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "message", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "presence", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "username", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "password", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "host", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "geoBot", void 0);
tslib_1.__decorate([
    mobx_1.observable
], XmppTransport.prototype, "notification", void 0);
exports.XmppTransport = XmppTransport;
function processMessage(stanza, ownUserId) {
    let id = stanza.id;
    let archiveId;
    let time = stanza.time || Date.now();
    let unread = stanza.unread;
    let isArchived = false;
    if (stanza.result && stanza.result.forwarded) {
        if (stanza.result.forwarded.delay) {
            time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
            unread = false;
        }
        isArchived = true;
        id = stanza.result.id;
        archiveId = id;
        stanza = stanza.result.forwarded.message;
        if (stanza.id) {
            id = stanza.id;
        }
    }
    if (stanza.archived) {
        archiveId = stanza.archived.id;
        isArchived = true;
        if (!id) {
            id = stanza.archived.id;
        }
    }
    const jid = stanza.from;
    const from = Utils.getNodeJid(jid);
    const body = stanza.body || '';
    const to = Utils.getNodeJid(stanza.to);
    if (stanza.delay) {
        let stamp = stanza.delay.stamp;
        if (stanza.x) {
            stamp = stanza.x.stamp;
        }
        if (stamp) {
            time = Utils.iso8601toDate(stamp).getTime();
        }
    }
    if (!id) {
        id = Utils.generateID();
    }
    const chatId = ownUserId === from ? to : from;
    const res = {
        from,
        chatId,
        body,
        archiveId,
        isArchived,
        to,
        id,
        time,
        unread,
        media: stanza.image && stanza.image.url ? stanza.image.url : null
    };
    return res;
}
exports.processMessage = processMessage;
function fromCamelCase(data = {}) {
    const { firstName, userID, phoneNumber, lastName, sessionID, uuid } = data, result = tslib_1.__rest(data, ["firstName", "userID", "phoneNumber", "lastName", "sessionID", "uuid"]);
    if (phoneNumber) {
        result.phone_number = phoneNumber;
        result.phoneNumber = phoneNumber;
    }
    if (userID) {
        result.auth_user = userID;
    }
    if (firstName) {
        result.first_name = firstName;
    }
    if (lastName) {
        result.last_name = lastName;
    }
    if (sessionID) {
        result.token = sessionID;
    }
    if (uuid) {
        result.user = uuid;
    }
    return result;
}
function addField(iq, name, type) {
    iq.c('field', { var: name, type });
}
function addValue(iq, name, value) {
    if (value !== undefined && value !== null) {
        const type = typeof value === 'number' ? 'int' : typeof value === 'boolean' ? 'bool' : 'string';
        addField(iq, name, type);
        iq
            .c('value')
            .t(name === 'image' ? value.id : value)
            .up()
            .up();
    }
}
function addValues(iq, values) {
    for (const key of Object.keys(values)) {
        addValue(iq, key, values[key]);
    }
}
function processHomestreamResponse(data, username) {
    let items = data.items && data.items.item ? data.items.item : [];
    let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : [];
    if (!utils_1.isArray(bots)) {
        bots = [bots];
    }
    if (!utils_1.isArray(items)) {
        items = [items];
    }
    const list = items.map((rec) => processItem(rec, null, username)).filter((x) => x);
    // process deletes
    if (data.items.delete) {
        let deletes = data.items.delete;
        if (!utils_1.isArray(deletes)) {
            deletes = [deletes];
        }
        deletes.forEach((rec) => list.push({ id: rec.id, time: Utils.iso8601toDate(rec.version).getTime(), delete: true }));
    }
    return {
        list,
        bots,
        version: data.items.version,
        count: parseInt((data.items && data.items.set && data.items.set.count) || 0)
    };
}
exports.processHomestreamResponse = processHomestreamResponse;
function processItem(item, delay, username) {
    try {
        const time = Utils.iso8601toDate(item.version).getTime();
        if (item.message) {
            const { message, id, from } = item;
            const { bot, event, body, media, image } = message;
            if (bot && bot.action === 'show') {
                return { id, bot: bot.id, time, created: true };
            }
            if (bot && (bot.action === 'exit' || bot.action === 'enter')) {
                const userId = Utils.getNodeJid(bot['user-jid']);
                return { id, bot: bot.id, time, profile: userId, isEnter: bot.action === 'enter' };
            }
            if (event && event.item && event.item.entry) {
                const { entry, author } = event.item;
                const eventId = event.node.split('/')[1];
                return { id, bot: eventId, time, post: { id: eventId + id, image: entry.image, content: entry.content, profile: Utils.getNodeJid(author) } };
            }
            if (message['bot-description-changed'] && message['bot-description-changed'].bot) {
                const noteBot = item.message['bot-description-changed'].bot;
                return { id: item.id, bot: noteBot.id, time: Utils.iso8601toDate(item.version).getTime(), note: noteBot.description };
            }
            if (event && event.retract) {
                return { id: event.retract.id, delete: true };
            }
            if (body || media || image || bot) {
                const msg = processMessage(Object.assign({}, message, { from, to: username }), username);
                if (!message.delay) {
                    if (delay && delay.stamp) {
                        msg.time = Utils.iso8601toDate(delay.stamp).getTime();
                    }
                    else {
                        msg.time = Utils.iso8601toDate(item.version).getTime();
                    }
                }
                return bot ? { id, bot: bot.id, time, message: msg } : null;
            }
        }
        else {
            console.log('& UNSUPPORTED ITEM!', item);
        }
    }
    catch (err) {
        console.log('EventStore.processItem ERROR:', err);
    }
    return null;
}
exports.processItem = processItem;
function processRosterItem(item = {}, host) {
    const { handle, roles, avatar, jid, group, subscription, ask, created_at } = item, props = tslib_1.__rest(item, ["handle", "roles", "avatar", "jid", "group", "subscription", "ask", "created_at"]);
    const firstName = props.first_name;
    const lastName = props.last_name;
    // ignore other domains
    if (Strophe.getDomainFromJid(jid) !== host) {
        return;
    }
    const id = Strophe.getNodeFromJid(jid);
    const createdTime = Utils.iso8601toDate(created_at).getTime();
    const days = Math.trunc((new Date().getTime() - createdTime) / (60 * 60 * 1000 * 24));
    const groups = group && group.indexOf(' ') > 0 ? group.split(' ') : [group];
    const rolesArr = roles && roles.role ? (utils_1.isArray(roles.role) ? roles.role : [roles.role]) : [];
    return {
        id,
        firstName,
        lastName,
        handle,
        avatar,
        roles: rolesArr,
        isNew: groups.includes(NEW_GROUP) && days <= 7,
        isBlocked: group === BLOCKED_GROUP,
        isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
        isFollower: subscription === 'from' || subscription === 'both'
    };
}
function timeout(promise, timeoutMillis) {
    let timeout;
    return Promise.race([
        promise,
        new Promise(function (resolve, reject) {
            timeout = setTimeout(function () {
                reject('Operation timed out');
            }, timeoutMillis);
        })
    ]).then(function (v) {
        clearTimeout(timeout);
        return v;
    }, function (err) {
        clearTimeout(timeout);
        throw err;
    });
}
//# sourceMappingURL=XmppTransport.js.map