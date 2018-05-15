"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
exports.SERVICE_NAME = 'WockyClient';
// Base class for entities that want access to parent wocky service
exports.Base = mobx_state_tree_1.types
    .model('Base', { id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string) })
    .named('Base')
    .views(self => ({
    get service() {
        let target = self;
        const { wocky } = mobx_state_tree_1.getEnv(self);
        if (wocky) {
            return wocky;
        }
        while (mobx_state_tree_1.getParent(target) && mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name !== exports.SERVICE_NAME) {
            target = mobx_state_tree_1.getParent(target);
            if (!mobx_state_tree_1.hasParent(target)) {
                return null;
            }
        }
        return mobx_state_tree_1.getType(mobx_state_tree_1.getParent(target)).name === exports.SERVICE_NAME ? mobx_state_tree_1.getParent(target) : null;
    },
}));
//# sourceMappingURL=Base.js.map