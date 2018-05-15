"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
exports.Loadable = mobx_state_tree_1.types.model({ loaded: false }).actions((self) => ({
    load: (data) => {
        if (data && Object.keys(data).length) {
            Object.assign(self, data);
            self.loaded = true;
        }
    },
}));
function createLoadable(load) {
    return mobx_state_tree_1.types
        .compose(exports.Loadable, mobx_state_tree_1.types.model({}).volatile(() => ({
        loading: false,
        loadError: '',
    })))
        .named('Loadable')
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
                    // console.error(e) TODO
                    self.loadError = e;
                }
                finally {
                    self.loading = false;
                }
            }
        }),
    }));
}
exports.createLoadable = createLoadable;
//# sourceMappingURL=Loadable.js.map