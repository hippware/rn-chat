"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const Updatable_1 = require("./Updatable");
const Uploadable_1 = require("./Uploadable");
exports.OwnProfile = mobx_state_tree_1.types
    .compose(mobx_state_tree_1.types.compose(Profile_1.Profile, Uploadable_1.createUploadable('avatar', 'all'), Updatable_1.createUpdatable((self, data) => self.service._updateProfile(mobx_state_tree_1.getSnapshot(self)))), mobx_state_tree_1.types.model('OwnProfile', {
    email: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    phoneNumber: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string)
}))
    .named('OwnProfile');
//# sourceMappingURL=OwnProfile.js.map