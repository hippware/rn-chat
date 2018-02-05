"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Bot_1 = require("./Bot");
const Event_1 = require("./Event");
exports.EventBot = mobx_state_tree_1.types
    .compose(Event_1.Event, mobx_state_tree_1.types.model('EventBot', {
    bot: mobx_state_tree_1.types.reference(Bot_1.Bot)
}))
    .views(self => ({
    get target() {
        return self.bot.owner;
    }
}))
    .named('EventBot');
//# sourceMappingURL=EventBot.js.map