"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function createUpdatable(update) {
    return mobx_state_tree_1.types
        .model('Updatable', {})
        .volatile(self => ({
        updated: false,
        updating: false,
        updateError: ''
    }))
        .actions(self => ({
        update: mobx_state_tree_1.flow(function* (data) {
            self.updated = false;
            self.updateError = '';
            Object.assign(self, data);
            if (!self.updating) {
                try {
                    self.updating = true;
                    const res = yield update(self);
                    // allow to update some props after successful execution of update script
                    if (res) {
                        Object.assign(self, res);
                    }
                    self.updated = true;
                }
                catch (e) {
                    console.error(e);
                    self.updateError = e;
                }
                finally {
                    self.updating = false;
                }
            }
        })
    }));
}
exports.createUpdatable = createUpdatable;
//# sourceMappingURL=Updatable.js.map