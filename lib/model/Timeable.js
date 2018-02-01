"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const moment = require('moment');
exports.Timeable = mobx_state_tree_1.types
    .model('Timeable', {
    time: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, () => Date.now())
})
    .views(self => ({
    get date() {
        return new Date(self.time);
    },
    get dateAsString() {
        return moment(self.time).calendar();
    },
    get relativeDateAsString() {
        return moment(self.time).fromNow(true);
    }
}));
//# sourceMappingURL=Timeable.js.map