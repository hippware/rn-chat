"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function create(target, requestName, ...params) {
    return exports.PaginableList.create({}, { request: mobx_state_tree_1.getRoot(target)[requestName].bind(mobx_state_tree_1.getRoot(target), ...params) });
}
exports.create = create;
exports.PaginableList = mobx_state_tree_1.types.model('PaginableList', {}).extend(self => {
    const { request } = mobx_state_tree_1.getEnv(self);
    let loading = false;
    let finished = false;
    const result = [];
    function lastId() {
        return result.length ? result[result.length - 1].user : null;
    }
    return {
        views: {
            get loading() {
                return loading;
            },
            get finished() {
                return finished;
            },
            get length() {
                return result.length;
            },
            get list() {
                return result;
            }
        },
        actions: {
            // TODO fix code duplicate here, was not able to pass optional param because of generics
            loadPage: mobx_state_tree_1.flow(function* (max) {
                if (loading || finished) {
                    return result;
                }
                loading = true;
                try {
                    const { list, count } = yield request(lastId(), max);
                    result.push.apply(result, list);
                    finished = result.length === count;
                }
                catch (e) {
                    console.log('ERROR:', e);
                }
                finally {
                    loading = false;
                }
                return result;
            }),
            load: mobx_state_tree_1.flow(function* load() {
                if (loading || finished) {
                    return result;
                }
                loading = true;
                try {
                    const { list, count } = yield request(lastId());
                    result.push.apply(result, list);
                    finished = result.length === count;
                }
                catch (e) {
                    console.log('ERROR:', e);
                }
                finally {
                    loading = false;
                }
                return result;
            })
        }
    };
});
//# sourceMappingURL=paging.js.map