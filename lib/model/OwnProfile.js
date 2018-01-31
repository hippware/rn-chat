"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const Updatable_1 = require("./Updatable");
exports.OwnProfile = mobx_state_tree_1.types.compose(Profile_1.Profile, Updatable_1.createUpdatable(self => self.service._updateProfile(self)), mobx_state_tree_1.types
    .model('OwnProfile', {
    email: '',
    phoneNumber: ''
})
    .volatile(self => ({
    updated: false,
    updating: false,
    updateError: ''
}))
    .named('OwnProfile')
    .actions((self) => ({
    update: (data) => {
        self.updated = false;
        self.updatedError = '';
        Object.assign(self, data);
    },
    _onChanged: mobx_state_tree_1.flow(function* (snapshot) {
        if (!self.updating) {
            try {
                self.updating = true;
                self.updated = false;
                yield self.service._updateProfile(snapshot);
                self.updated = true;
            }
            catch (e) {
                self.updateError = e;
            }
            finally {
                self.updating = false;
            }
        }
    }),
    afterCreate: () => {
        // listen to new snapshots
        mobx_state_tree_1.onSnapshot(self, (snapshot) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield self._onChanged(snapshot);
        }));
    }
})));
//# sourceMappingURL=OwnProfile.js.map