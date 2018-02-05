"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventBot_1 = require("./EventBot");
const Message_1 = require("./Message");
exports.EventBotShare = mobx_state_tree_1.types
    .compose(EventBot_1.EventBot, mobx_state_tree_1.types.model('EventBotShare', {
    message: Message_1.Message
}))
    .views(self => ({
    get target() {
        return self.message.from;
    }
}))
    .named('EventBotShare');
//# sourceMappingURL=EventBotShare.js.map