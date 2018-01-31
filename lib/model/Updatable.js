"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
        .actions((self) => ({
        update: (data) => {
            self.updated = false;
            self.updatedError = '';
            Object.assign(self, data);
        },
        _onChanged: mobx_state_tree_1.flow(function* () {
            if (!self.updating) {
                try {
                    self.updating = true;
                    self.updated = false;
                    const data = yield update(self);
                    // allow to update some props after successful execution of update script
                    if (data) {
                        Object.assign(self, data);
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
        }),
        afterCreate: () => {
            // listen to new snapshots
            mobx_state_tree_1.onSnapshot(self, (snapshot) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield self._onChanged(snapshot);
            }));
        }
    }));
}
exports.createUpdatable = createUpdatable;
//# sourceMappingURL=Updatable.js.map