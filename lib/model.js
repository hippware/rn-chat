"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    width: mobx_state_tree_1.types.number,
    height: mobx_state_tree_1.types.number,
    error: mobx_state_tree_1.types.string,
    loaded: false,
    loading: false,
    isNew: false
});
exports.Status = mobx_state_tree_1.types.enumeration('status', ['available', 'unavailable']);
exports.Profile = mobx_state_tree_1.types.model('Profile', {
    user: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    avatar: mobx_state_tree_1.types.maybe(exports.File),
    email: '',
    handle: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    loaded: false,
    isFollower: false,
    isFollowed: false,
    isNew: false,
    isBlocked: false,
    hidePosts: false,
    status: mobx_state_tree_1.types.optional(exports.Status, 'unavailable'),
    followersSize: 0,
    botsSize: 0,
    roles: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), [])
});
exports.ProfileList = mobx_state_tree_1.types
    .model('ProfileList', {
    list: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(exports.Profile), []),
    lastId: '',
    finished: false,
    loading: false
})
    .views(function (self) {
    return {
        get length() {
            return self.list.length;
        }
    };
})
    .actions(function (self) {
    return {
        startLoading: function () { return (self.loading = true); },
        stopLoading: function () { return (self.loading = false); },
        complete: function () { return (self.finished = true); },
        add: function (profile) { return self.list.push(profile); },
        setLastId: function (id) { return (self.lastId = id); }
    };
});
//# sourceMappingURL=model.js.map