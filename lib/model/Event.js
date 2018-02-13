"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Timeable_1 = require("./Timeable");
const Base_1 = require("./Base");
const Loadable_1 = require("./Loadable");
exports.Event = mobx_state_tree_1.types
    .compose(Base_1.Base, Timeable_1.Timeable, Loadable_1.Loadable)
    .named('Event')
    .views(self => ({
    get target() {
        throw 'Abstract method!';
    }
}))
    .named('Event');
//# sourceMappingURL=Event.js.map