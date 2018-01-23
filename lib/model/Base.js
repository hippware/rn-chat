"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
exports.SERVICE_NAME = 'WockyClient';
// Base class for entities that want access to parent wocky service
exports.Base = mobx_state_tree_1.types
    .model('Base', {})
    .named('Base')
    .views(self => ({
    get service() {
        let target = self;
        while (mobx_state_tree_1.getParent(target) && mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name !== exports.SERVICE_NAME) {
            target = mobx_state_tree_1.getParent(target);
        }
        return mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name === exports.SERVICE_NAME ? mobx_state_tree_1.getParent(target) : null;
    }
}));
//# sourceMappingURL=Base.js.map