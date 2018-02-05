"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Event_1 = require("./Event");
exports.EventDelete = mobx_state_tree_1.types
    .compose(Event_1.Event, mobx_state_tree_1.types.model('EventDelete', {
    delete: mobx_state_tree_1.types.boolean
}))
    .named('EventDelete');
//# sourceMappingURL=EventDelete.js.map