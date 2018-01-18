"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function create(target, requestName, ...params) {
    return exports.PaginableList.create({}, { request: mobx_state_tree_1.getParent(target)[requestName].bind(mobx_state_tree_1.getParent(target), ...params) });
}
exports.create = create;
exports.PaginableList = mobx_state_tree_1.types
    .model('PaginableList', {})
    .volatile(self => ({
    result: [],
    loading: false,
    finished: false
}))
    .extend(self => {
    const { request } = mobx_state_tree_1.getEnv(self);
    function lastId() {
        return self.result.length ? self.result[self.result.length - 1].id : null;
    }
    return {
        views: {
            get length() {
                return self.result.length;
            },
            get list() {
                return self.result;
            }
        },
        actions: {
            // TODO fix code duplicate here, was not able to pass optional param because of generics
            loadPage: mobx_state_tree_1.flow(function* (max) {
                if (self.loading || self.finished) {
                    return self.result;
                }
                self.loading = true;
                try {
                    const { list, count } = yield request(lastId(), max);
                    self.result.push.apply(self.result, list);
                    self.finished = self.result.length === count;
                }
                catch (e) {
                    console.log('ERROR:', e);
                }
                finally {
                    self.loading = false;
                }
                return self.result;
            }),
            load: mobx_state_tree_1.flow(function* load() {
                if (self.loading || self.finished) {
                    return self.result;
                }
                self.loading = true;
                try {
                    const { list, count } = yield request(lastId());
                    self.result.push.apply(self.result, list);
                    self.finished = self.result.length === count;
                }
                catch (e) {
                    console.log('ERROR:', e);
                }
                finally {
                    self.loading = false;
                }
                return self.result;
            })
        }
    };
});
//# sourceMappingURL=paging.js.map