"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function createPaginable(type) {
    return mobx_state_tree_1.types
        .model('PaginableList', {
        result: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(type), []),
        cursor: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
        count: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number)
    })
        .named('PaginableList')
        .volatile(self => ({
        loading: false,
        finished: false
    }))
        .actions(self => ({
        add: (item) => {
            if (!self.result.find((el) => el.id === item.id)) {
                self.result.push(item);
            }
        },
        addToTop: (item) => {
            if (!self.result.find((el) => el.id === item.id)) {
                self.result.unshift(item);
            }
        }
    }))
        .extend(self => {
        let request;
        return {
            views: {
                get length() {
                    return self.result.length;
                },
                get list() {
                    return self.result.filter((x) => mobx_state_tree_1.isAlive(x));
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
                    return self.result.find((el) => mobx_state_tree_1.isAlive(el) && el.id === id) !== undefined;
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
                        const _a = yield request(self.cursor, max), { list, count, cursor } = _a, data = tslib_1.__rest(_a, ["list", "count", "cursor"]);
                        self.count = count;
                        self.cursor = cursor || (list.length ? list[list.length - 1].id : null);
                        Object.assign(self, data);
                        list.forEach((el) => self.add(el));
                        self.finished = list.length === 0;
                    }
                    finally {
                        self.loading = false;
                    }
                    return self.result;
                }),
                refresh: () => {
                    self.result.clear();
                    self.cursor = null;
                    self.finished = false;
                },
                load: mobx_state_tree_1.flow(function* load({ force } = {}) {
                    if (self.loading || (self.finished && !force)) {
                        return self.result;
                    }
                    if (force) {
                        self.cursor = null;
                        self.finished = false;
                    }
                    self.loading = true;
                    try {
                        const _a = yield request(self.cursor), { list, count, cursor } = _a, data = tslib_1.__rest(_a, ["list", "count", "cursor"]);
                        self.count = count;
                        self.cursor = cursor || (list.length ? list[list.length - 1].id : null);
                        Object.assign(self, data);
                        if (force) {
                            self.result.clear();
                        }
                        list.forEach((el) => self.add(el));
                        self.finished = list.length === 0 || count === self.result.length;
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