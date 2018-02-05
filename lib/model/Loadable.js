"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function createLoadable(load) {
    return mobx_state_tree_1.types
        .model('Loadable', { loaded: false })
        .volatile(self => ({
        loading: false,
        loadError: ''
    }))
        .actions(self => ({
        load: (data) => {
            Object.assign(self, data);
            self.loaded = true;
        }
    }))
        .actions(self => ({
        request: mobx_state_tree_1.flow(function* () {
            if (!self.loading) {
                try {
                    self.loading = true;
                    const res = yield load(self);
                    if (res) {
                        self.load(res);
                    }
                }
                catch (e) {
                    console.error(e);
                    self.loadError = e;
                }
                finally {
                    self.loading = false;
                }
            }
        })
    }));
}
exports.createLoadable = createLoadable;
//# sourceMappingURL=Loadable.js.map