"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable */
var utils_1 = require("./utils");
require("./strophe");
var XmppStropheV2 = /** @class */ (function () {
    /**
     * Creates class instance
     * @param host xmpp host
     * @param log optional log function
     */
    function XmppStropheV2(log) {
        if (log === void 0) { log = function (param) { return null; }; }
        var _this = this;
        this.handlers = [];
        this.login = function (username, password, host, resource) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var self;
            return tslib_1.__generator(this, function (_a) {
                this.host = host;
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        self._connection = new Strophe.Connection("ws://" + _this.host + ":5280/ws-xmpp");
                        self._connection.connect(utils_1.default.getJid(username, _this.host, resource), password, function (status, condition) {
                            switch (status) {
                                case Strophe.Status.CONNECTED:
                                    self.log(username + " CONNECTED to " + self.host);
                                    if (self._connection) {
                                        var handler = self._connection.addHandler(self._onMessage, null, 'message', null, null);
                                        self.handlers.push(handler);
                                        self.handlers.push(self._connection.addHandler(self._onPresence, null, 'presence', null, null));
                                        self.handlers.push(self._connection.addHandler(self._onIQ, null, 'iq', null, null));
                                    }
                                    self.sendPresence();
                                    self.username = username + "@" + self.host;
                                    self.onConnected && self.onConnected(username, password, self.host);
                                    resolve({ username: username, password: password, host: self.host });
                                    return;
                                case Strophe.Status.DISCONNECTED:
                                    self.log(username + " DISCONNECTED");
                                    self.username = undefined;
                                    self.onDisconnected && self.onDisconnected();
                                    reject();
                                    return;
                                case Strophe.Status.AUTHFAIL:
                                    self.log(username + " AUTHFAIL: " + condition);
                                    self.onAuthFail && self.onAuthFail(condition);
                                    reject(condition);
                            }
                        });
                    })];
            });
        }); };
        this._onPresence = function (stanza) {
            var data = utils_1.default.parseXml(stanza);
            _this.onPresence && _this.onPresence(data.presence);
            return true;
        };
        this._onMessage = function (stanza) {
            var data = utils_1.default.parseXml(stanza).message;
            _this.onMessage && _this.onMessage(data);
            return true;
        };
        this._onIQ = function (stanza) {
            var data = utils_1.default.parseXml(stanza);
            _this.onIQ && _this.onIQ(data.iq);
            return true;
        };
        this.sendIQ = function (data, callback) {
            _this._connection.sendIQ(data, callback);
        };
        this.sendStanza = function (stanza) {
            _this._connection.send(stanza);
        };
        /**
         * Send presence with given data
         * @param data presence data
         */
        this.sendPresence = function (data) {
            // send presence
            _this._connection.send($pres(data));
        };
        this.disconnect = function () {
            _this.handlers.forEach(_this._connection.deleteHandler.bind(_this._connection));
            _this._connection.flush();
            _this._connection.disconnect();
        };
        this.disconnectAfterSending = function () {
            _this.disconnect();
        };
        this.log = log;
        Strophe.log = function (level, msg) {
            log(msg);
        };
        Strophe.Connection.prototype.rawInput = function (data) {
            log("rawInput: " + data);
        };
        Strophe.Connection.prototype.rawOutput = function (data) {
            log("rawOutput: " + data);
        };
    }
    return XmppStropheV2;
}());
exports.default = XmppStropheV2;
//# sourceMappingURL=XmppStropheV2.js.map