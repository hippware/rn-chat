"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const Message_1 = require("./Message");
const Base_1 = require("./Base");
const moment = require('moment');
exports.Chat = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.model('Chat', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    active: false,
    loaded: false,
    requestedId: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    isPrivate: true,
    participants: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(Profile_1.Profile)), []),
    _messages: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(Message_1.Message), []),
    message: mobx_state_tree_1.types.optional(Message_1.Message, {}),
}))
    .volatile(() => ({
    loading: false,
}))
    .views(self => ({
    get messages() {
        return self._messages.sort((a, b) => a.time - b.time);
    },
    get unread() {
        return self._messages.reduce((prev, current) => prev + (current.unread ? 1 : 0), 0);
    },
    get followedParticipants() {
        return self.participants.filter(p => p.isFollowed);
    },
}))
    .views(self => ({
    get last() {
        return self.messages.length ? self.messages[self.messages.length - 1] : null;
    },
    get first() {
        return self.messages.length ? self.messages[0] : null;
    },
}))
    .views(self => ({
    get time() {
        return self.last ? self.last.time : Date.now();
    },
}))
    .views(self => ({
    get date() {
        return moment(self.time).calendar();
    },
}))
    .actions(self => {
    const { logger } = mobx_state_tree_1.getEnv(self);
    return {
        setActive: (active) => (self.active = active),
        readAll: () => self._messages.forEach((msg) => msg.read()),
        load: mobx_state_tree_1.flow(function* () {
            if (!self.loaded &&
                !self.loading &&
                (!self.first || self.requestedId !== self.first.archiveId)) {
                self.requestedId = self.first ? self.first.archiveId : null;
                self.loading = true;
                try {
                    const data = yield self.service.loadChat(self.id, self.requestedId);
                    if (data &&
                        data.fin &&
                        data.fin.set &&
                        data.fin.set.first &&
                        data.fin.set.first.index === '0') {
                        self.loaded = true;
                    }
                }
                catch (e) {
                    logger.log('error loading chat: ', e);
                }
                finally {
                    self.loading = false;
                }
            }
        }),
        addMessage: (msg) => {
            if (!self._messages.find(el => msg.id === el.id)) {
                self._messages.push(msg);
            }
        },
        addParticipant: (profile) => {
            if (!self.participants.find(el => el.id === profile.id)) {
                self.participants.push(profile);
            }
        },
    };
})
    .actions(self => ({
    afterAttach: () => {
        self.message = self.service.create(Message_1.Message, { to: self.id, from: self.service.username });
        self.addParticipant(self.service.profiles.get(self.id));
    },
}));
//# sourceMappingURL=Chat.js.map