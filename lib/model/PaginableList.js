"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
function createPaginable(type) {
    return mobx_state_tree_1.types
        .model('PaginableList', {
        result: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(type), [])
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
                }
            },
            actions: {
                setRequest: (req) => (request = req),
                add: (item) => {
                    if (!self.result.find((el) => el.id === item.id)) {
                        self.result.push(item);
                    }
                },
                // TODO fix code duplicate here, was not able to pass optional param because of generics
                loadPage: mobx_state_tree_1.flow(function* (max) {
                    if (self.loading || self.finished) {
                        return self.result;
                    }
                    self.loading = true;
                    try {
                        const { list, count } = yield request(lastId(), max);
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
                load: mobx_state_tree_1.flow(function* load() {
                    if (self.loading || self.finished) {
                        return self.result;
                    }
                    self.loading = true;
                    try {
                        const { list, count } = yield request(lastId());
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