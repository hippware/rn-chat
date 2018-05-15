"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventBot_1 = require("./EventBot");
exports.EventBotCreate = mobx_state_tree_1.types
    .compose(EventBot_1.EventBot, mobx_state_tree_1.types.model('EventBotCreate', {
    created: mobx_state_tree_1.types.boolean,
}))
    .named('EventBotCreate');
//# sourceMappingURL=EventBotCreate.js.map