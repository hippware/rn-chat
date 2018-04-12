"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class HybridTransport {
    constructor(xmpp, gql) {
        this._xmpp = xmpp;
        this._gql = gql;
    }
    get connected() {
        return this._xmpp.connected;
    }
    get connecting() {
        return this._xmpp.connecting;
    }
    get username() {
        return this._xmpp.username;
    }
    get password() {
        return this._xmpp.password;
    }
    get host() {
        return this._xmpp.host;
    }
    get geoBot() {
        return this._xmpp.geoBot;
    }
    get message() {
        return this._xmpp.message;
    }
    get botVisitor() {
        return this._gql.botVisitor;
    }
    get presence() {
        return this._xmpp.presence;
    }
    get rosterItem() {
        return this._xmpp.rosterItem;
    }
    get notification() {
        return this._xmpp.notification;
    }
    login(user, password, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._gql.login(user, password, host);
            yield this._xmpp.login(user, password, host);
            return true;
        });
    }
    register(data, host, providerName) {
        return this._xmpp.register(data, host, providerName);
    }
    testRegister({ phoneNumber }, host) {
        return this._xmpp.testRegister({ phoneNumber }, host);
    }
    setLocation(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._gql.setLocation(params);
        });
    }
    disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._gql.disconnect();
            yield this._xmpp.disconnect();
        });
    }
    loadProfile(user) {
        return this._xmpp.loadProfile(user);
    }
    requestProfiles(users) {
        return this._xmpp.requestProfiles(users);
    }
    updateProfile(d) {
        return this._xmpp.updateProfile(d);
    }
    lookup(handle) {
        return this._xmpp.lookup(handle);
    }
    remove() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._gql.remove();
            yield this._xmpp.remove();
        });
    }
    downloadURL(tros) {
        return this._xmpp.downloadURL(tros);
    }
    downloadFile(tros, name, sourceUrl) {
        return this._xmpp.downloadFile(tros, name, sourceUrl);
    }
    downloadThumbnail(url, tros) {
        return this._xmpp.downloadThumbnail(url, tros);
    }
    downloadTROS(tros) {
        return this._xmpp.downloadTROS(tros);
    }
    requestUpload(params) {
        return this._xmpp.requestUpload(params);
    }
    follow(username) {
        return this._xmpp.follow(username);
    }
    unfollow(username) {
        return this._xmpp.unfollow(username);
    }
    block(username) {
        return this._xmpp.block(username);
    }
    unblock(username) {
        return this._xmpp.unblock(username);
    }
    subscribeBot(id, geofence) {
        return this._xmpp.subscribeBot(id, geofence);
    }
    unsubscribeBot(id, geofence) {
        return this._xmpp.unsubscribeBot(id, geofence);
    }
    requestRoster() {
        return this._xmpp.requestRoster();
    }
    loadChats(max) {
        return this._xmpp.loadChats(max);
    }
    loadBot(id, server) {
        return this._gql.loadBot(id, server);
    }
    removeBot(id) {
        return this._xmpp.removeBot(id);
    }
    removeBotPost(id, postId) {
        return this._xmpp.removeBotPost(id, postId);
    }
    generateId() {
        return this._xmpp.generateId();
    }
    updateBot(bot) {
        return this._xmpp.updateBot(bot);
    }
    shareBot(id, server, recepients, message, action) {
        this._xmpp.shareBot(id, server, recepients, message, action);
    }
    loadRelations(userId, relation, lastId, max) {
        return this._xmpp.loadRelations(userId, relation, lastId, max);
    }
    publishBotPost(botId, post) {
        return this._xmpp.publishBotPost(botId, post);
    }
    geosearch(props) {
        return this._xmpp.geosearch(props);
    }
    sendMessage(msg) {
        this._xmpp.sendMessage(msg);
    }
    loadChat(userId, lastId, max) {
        return this._xmpp.loadChat(userId, lastId, max);
    }
    subscribeToHomestream(version) {
        this._xmpp.subscribeToHomestream(version);
    }
    enablePush(token) {
        return this._xmpp.enablePush(token);
    }
    disablePush() {
        return this._xmpp.disablePush();
    }
    loadUpdates(ver) {
        return this._xmpp.loadUpdates(ver);
    }
    loadHomestream(lastId, max) {
        return this._xmpp.loadHomestream(lastId, max);
    }
    loadOwnBots(userId, lastId, max) {
        return this._gql.loadOwnBots(userId, lastId, max);
    }
    loadBotSubscribers(id, lastId, max) {
        return this._xmpp.loadBotSubscribers(id, lastId, max);
    }
    loadBotGuests(id, lastId, max) {
        return this._xmpp.loadBotGuests(id, lastId, max);
    }
    loadBotVisitors(id, lastId, max) {
        return this._xmpp.loadBotVisitors(id, lastId, max);
    }
    loadBotPosts(id, lastId) {
        return this._xmpp.loadBotPosts(id, lastId);
    }
    loadSubscribedBots(userId, lastId, max) {
        return this._gql.loadSubscribedBots(userId, lastId, max);
    }
}
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "connected", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "connecting", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "username", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "password", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "host", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "geoBot", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "message", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "botVisitor", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "presence", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "rosterItem", null);
tslib_1.__decorate([
    mobx_1.computed
], HybridTransport.prototype, "notification", null);
exports.HybridTransport = HybridTransport;
//# sourceMappingURL=HybridTransport.js.map