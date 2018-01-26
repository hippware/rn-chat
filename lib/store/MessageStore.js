"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const RosterStore_1 = require("./RosterStore");
const Chats_1 = require("../model/Chats");
const Chat_1 = require("../model/Chat");
const Message_1 = require("../model/Message");
const utils_1 = require("./utils");
const MEDIA = 'hippware.com/hxep/media';
const NS = 'hippware.com/hxep/conversations';
const RSM_NS = 'http://jabber.org/protocol/rsm';
const MAM_NS = 'urn:xmpp:mam:1';
const MAXINT = 1000;
exports.default = mobx_state_tree_1.types
    .compose(RosterStore_1.default, mobx_state_tree_1.types.model('XmppMessage', {
    chats: mobx_state_tree_1.types.optional(Chats_1.Chats, Chats_1.Chats.create()),
    message: mobx_state_tree_1.types.frozen
}))
    .named('MessageStore')
    .actions(self => ({
    createChat: (id) => self.chats.get(id) || self.chats.add(Chat_1.Chat.create({ id }))
}))
    .actions(self => {
    return {
        processMessage: (stanza) => {
            let id = stanza.id;
            let archiveId;
            let time = Date.now();
            let unread = stanza.unread;
            let isArchived = false;
            if (stanza.result && stanza.result.forwarded) {
                if (stanza.result.forwarded.delay) {
                    time = utils_1.default.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
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
            const user = utils_1.default.getNodeJid(jid);
            if (!self.profiles.get(user)) {
                throw `sender ${user} is unknown`;
            }
            const from = self.profiles.get(user);
            const body = stanza.body || '';
            const to = utils_1.default.getNodeJid(stanza.to);
            if (stanza.delay) {
                let stamp = stanza.delay.stamp;
                if (stanza.x) {
                    stamp = stanza.x.stamp;
                }
                if (stamp) {
                    time = utils_1.default.iso8601toDate(stamp).getTime();
                }
            }
            if (!id) {
                id = utils_1.default.generateID();
            }
            const msg = Message_1.Message.create({
                from,
                body,
                archiveId,
                isArchived,
                to,
                id,
                time,
                unread,
                media: stanza.image && stanza.image.url ? self.createFile(stanza.image.url) : null
            });
            return msg;
        },
        addMessage: (message) => {
            const profile = message.from.isOwn ? self.profiles.get(message.to) : message.from;
            const chatId = message.from.isOwn ? message.to : profile.id;
            const existingChat = self.chats.get(chatId);
            if (existingChat) {
                existingChat.addParticipant(profile);
                existingChat.addMessage(message);
                if (existingChat.active) {
                    message.unread = false;
                }
            }
            else {
                const chat = self.createChat(chatId);
                chat.addParticipant(profile);
                chat.addMessage(message);
            }
        }
    };
})
    .actions(self => ({
    onMessage: (msg) => {
        self.message = msg;
        if (msg.body || msg.media || msg.image || msg.result) {
            self.addMessage(self.processMessage(Object.assign({}, msg, { unread: true })));
        }
    }
}))
    .actions(self => {
    const { provider } = mobx_state_tree_1.getEnv(self);
    return {
        sendMessage: (msg) => {
            const message = Message_1.Message.create(Object.assign({}, msg, { from: self.profiles.get(self.username) }));
            let stanza = $msg({
                to: `${msg.to}@${self.host}`,
                type: 'chat',
                id: message.id
            })
                .c('body')
                .t(msg.body || '');
            if (msg.media) {
                stanza = stanza
                    .up()
                    .c('image', { xmlns: MEDIA })
                    .c('url')
                    .t(msg.media.id);
            }
            provider.sendStanza(stanza);
            self.addMessage(message);
        },
        loadChat: mobx_state_tree_1.flow(function* (userId, lastId, max = 20) {
            const iq = $iq({ type: 'set', to: `${self.username}@${self.host}` })
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
                .t(`${userId}@${self.host}`)
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
            return yield self.sendIQ(iq);
        }),
        loadChats: mobx_state_tree_1.flow(function* (max = 50) {
            const items = [];
            let count = MAXINT;
            let last;
            while (items.length < count) {
                const iq = $iq({ type: 'get', to: provider.username })
                    .c('query', { xmlns: NS })
                    .c('set', { xmlns: RSM_NS });
                if (last) {
                    iq
                        .c('after')
                        .t(last)
                        .up();
                }
                iq.c('max').t(max.toString());
                const data = yield self.sendIQ(iq);
                if (!data || !data.query || !data.query.item) {
                    return [];
                }
                let res = data.query.item;
                count = data.query.set.count;
                last = data.query.set.last;
                if (!Array.isArray(res)) {
                    res = [res];
                }
                for (const item of res) {
                    items.push(item);
                }
            }
            items.forEach((item) => {
                const { other_jid, message, outgoing, timestamp } = item;
                const sender = utils_1.default.getNodeJid(other_jid);
                const from = self.profiles.get(outgoing === 'true' ? self.username : sender);
                const msg = Message_1.Message.create(Object.assign({}, message, { from, time: utils_1.default.iso8601toDate(timestamp).getTime() }));
                const chat = self.createChat(sender);
                chat.addParticipant(self.profiles.get(sender));
                chat.addMessage(msg);
            });
        })
    };
})
    .actions(self => {
    const { provider, logger } = mobx_state_tree_1.getEnv(self);
    let handler;
    return {
        sendMedia: mobx_state_tree_1.flow(function* (msg) {
            const { file, size, width, height, to } = msg;
            const id = yield self.requestUpload({
                file,
                size,
                width,
                height,
                access: `user:${to}@${self.host}`
            });
            self.sendMessage({ to, media: self.createFile(id) });
        }),
        afterCreate: () => {
            self.message = {};
            provider.onMessage = self.onMessage;
            handler = mobx_1.autorun('MessageStore', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    if (self.connected && self.roster.length) {
                        yield self.loadChats();
                    }
                }
                catch (e) {
                    logger.log('error loadChats autorun:', e);
                }
            }));
        },
        beforeDestroy: () => {
            if (handler) {
                handler();
            }
        }
    };
});
//# sourceMappingURL=MessageStore.js.map