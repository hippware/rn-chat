"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
exports.FileSource = mobx_state_tree_1.types.model('FileSource', {
    uri: mobx_state_tree_1.types.string,
    contentType: mobx_state_tree_1.types.string,
    cached: false
});
exports.File = mobx_state_tree_1.types.model('File', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    item: mobx_state_tree_1.types.string,
    source: exports.FileSource,
    width: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    height: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    error: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    loaded: false,
    loading: false,
    isNew: false
});
exports.Status = mobx_state_tree_1.types.enumeration('status', ['available', 'unavailable']);
exports.ProfileList = mobx_state_tree_1.types
    .model('ProfileList', {
    relation: mobx_state_tree_1.types.string,
    user: mobx_state_tree_1.types.string
})
    .extend(function (self) {
    var service = mobx_state_tree_1.getEnv(self).service;
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
                            return [4 /*yield*/, service.loadRelations(self.user, self.relation, lastId(), max)];
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
                            return [4 /*yield*/, service.loadRelations(self.user, self.relation, lastId())];
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
exports.Profile = mobx_state_tree_1.types
    .model('Profile', {
    user: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    // avatar: types.maybe(File),
    avatar: '',
    handle: '',
    firstName: '',
    lastName: '',
    status: mobx_state_tree_1.types.optional(exports.Status, 'unavailable'),
    followersSize: 0,
    botsSize: 0,
    roles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), [])
})
    .views(function (self) {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    var followers, following;
    return {
        get followers() {
            if (!followers) {
                followers = exports.ProfileList.create({ relation: 'follower', user: self.user }, { service: mobx_state_tree_1.getRoot(self) });
            }
            return followers;
        },
        get following() {
            if (!following) {
                following = exports.ProfileList.create({ relation: 'following', user: self.user }, { service: mobx_state_tree_1.getRoot(self) });
            }
            return following;
        }
    };
});
exports.OwnProfile = mobx_state_tree_1.types.compose(exports.Profile, mobx_state_tree_1.types.model('OwnProfile', {
    email: '',
    phoneNumber: ''
}));
//# sourceMappingURL=model.js.map