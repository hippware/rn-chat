"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventBot_1 = require("./EventBot");
const BotPost_1 = require("./BotPost");
exports.EventBotPost = mobx_state_tree_1.types
    .compose(EventBot_1.EventBot, mobx_state_tree_1.types.model('EventBotPost', {
    post: BotPost_1.BotPost
}))
    .named('EventBotPost');
//# sourceMappingURL=EventBotPost.js.map