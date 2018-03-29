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
    get _snapshot() {
        const data = mobx_state_tree_1.getSnapshot(self);
        const res = {};
        Object.keys(data).forEach((key) => {
            if (typeof data[key] !== 'object') {
                res[key] = data[key];
            }
            else if (self[key] && self[key].snapshot) {
                res[key] = self[key].snapshot;
            }
            else {
                res[key] = data[key];
            }
        });
        return res;
    },
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
    }
}))
    .views(self => ({
    get snapshot() {
        return self._snapshot;
    }
}));
//# sourceMappingURL=Base.js.map