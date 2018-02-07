"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function createPaginable(type) {
    return mobx_state_tree_1.types
        .model('PaginableList', {
        result: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(type), []),
        count: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number)
    })
        .named('PaginableList')
        .volatile(self => ({
        loading: false,
        finished: false
    }))
        .extend(self => {
        let request;
        function lastId() {
            return self.result.length ? self.result[self.result.length - 1].pageId : null;
        }
        return {
            views: {
                get length() {
                    return self.result.length;
                },
                get list() {
                    return self.result;
                },
                get first() {
                    return self.result.length > 0 ? self.result[0] : null;
                },
                get last() {
                    return self.result.length > 0 ? self.result[self.result.length - 1] : null;
                }
            },
            actions: {
                setRequest: (req) => (request = req),
                exists: (id) => {
                    return self.result.find((el) => el.id === id) !== null;
                },
                add: (item) => {
                    if (!self.result.find((el) => el.id === item.id)) {
                        self.result.push(item);
                    }
                },
                addToTop: (item) => {
                    if (!self.result.find((el) => el.id === item.id)) {
                        self.result.unshift(item);
                    }
                },
                remove: (id) => {
                    const index = self.result.findIndex((el) => el.id === id);
                    if (index !== -1) {
                        self.result.splice(index, 1);
                    }
                },
                // TODO fix code duplicate here, was not able to pass optional param because of generics
                loadPage: mobx_state_tree_1.flow(function* (max) {
                    if (self.loading || self.finished) {
                        return self.result;
                    }
                    self.loading = true;
                    try {
                        const _a = yield request(lastId(), max), { list, count } = _a, data = tslib_1.__rest(_a, ["list", "count"]);
                        self.count = count;
                        Object.assign(self, data);
                        list.forEach((el) => self.result.push(el));
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
                refresh: () => {
                    self.result.clear();
                    self.finished = false;
                },
                load: mobx_state_tree_1.flow(function* load() {
                    if (self.loading || self.finished) {
                        return self.result;
                    }
                    self.loading = true;
                    try {
                        const _a = yield request(lastId()), { list, count } = _a, data = tslib_1.__rest(_a, ["list", "count"]);
                        self.count = count;
                        Object.assign(self, data);
                        list.forEach((el) => self.result.push(el));
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
}
exports.createPaginable = createPaginable;
//# sourceMappingURL=PaginableList.js.map