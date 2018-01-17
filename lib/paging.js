"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
var mobx_state_tree_1 = require("mobx-state-tree");
function create(target, requestName) {
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    return exports.PaginableList.create({}, { request: (_a = mobx_state_tree_1.getRoot(target)[requestName]).bind.apply(_a, [mobx_state_tree_1.getRoot(target)].concat(params)) });
    var _a;
}
exports.create = create;
exports.PaginableList = mobx_state_tree_1.types.model('PaginableList', {}).extend(function (self) {
    var request = mobx_state_tree_1.getEnv(self).request;
    var loading = false;
    var finished = false;
    var result = [];
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
            loadPage: mobx_state_tree_1.flow(function (max) {
                var _a, list, count, e_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (loading || finished) {
                                return [2 /*return*/, result];
                            }
                            loading = true;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, request(lastId(), max)];
                        case 2:
                            _a = _b.sent(), list = _a.list, count = _a.count;
                            result.push.apply(result, list);
                            finished = result.length === count;
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            console.log('ERROR:', e_1);
                            return [3 /*break*/, 5];
                        case 4:
                            loading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/, result];
                    }
                });
            }),
            load: mobx_state_tree_1.flow(function load() {
                var _a, list, count, e_2;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (loading || finished) {
                                return [2 /*return*/, result];
                            }
                            loading = true;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, request(lastId())];
                        case 2:
                            _a = _b.sent(), list = _a.list, count = _a.count;
                            result.push.apply(result, list);
                            finished = result.length === count;
                            return [3 /*break*/, 5];
                        case 3:
                            e_2 = _b.sent();
                            console.log('ERROR:', e_2);
                            return [3 /*break*/, 5];
                        case 4:
                            loading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/, result];
                    }
                });
            })
        }
    };
});
//# sourceMappingURL=paging.js.map