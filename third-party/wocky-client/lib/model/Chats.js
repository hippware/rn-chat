"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Chat_1 = require("./Chat");
exports.Chats = mobx_state_tree_1.types
    .model('Chats', {
    _list: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(Chat_1.Chat), []),
})
    .named('Chats')
    .views(self => ({
    get _filteredList() {
        return self._list.filter(chat => chat.last && chat.followedParticipants.length);
    },
}))
    .views(self => ({
    get list() {
        return self._filteredList.sort((a, b) => b.last.time - a.last.time);
    },
    get unread() {
        return self._filteredList.reduce((prev, current) => prev + current.unread, 0);
    },
    get(id) {
        return self._list.find(el => el.id === id);
    },
}))
    .actions(self => ({
    clear: () => self._list.splice(0),
    remove: (id) => self._list.replace(self._list.filter(el => el.id !== id)),
    add: (chat) => self.get(chat.id) || (self._list.push(chat) && chat),
}));
//# sourceMappingURL=Chats.js.map