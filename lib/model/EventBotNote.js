"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventBot_1 = require("./EventBot");
exports.EventBotNote = mobx_state_tree_1.types
    .compose(EventBot_1.EventBot, mobx_state_tree_1.types.model('EventBotNote', {
    note: mobx_state_tree_1.types.string,
}))
    .named('EventBotNote');
//# sourceMappingURL=EventBotNote.js.map