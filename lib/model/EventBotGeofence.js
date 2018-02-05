"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventBot_1 = require("./EventBot");
const Profile_1 = require("./Profile");
exports.EventBotGeofence = mobx_state_tree_1.types
    .compose(EventBot_1.EventBot, mobx_state_tree_1.types.model('EventBotGeofence', {
    isEnter: mobx_state_tree_1.types.boolean,
    profile: mobx_state_tree_1.types.reference(Profile_1.Profile)
}))
    .views(self => ({
    get target() {
        return self.profile;
    }
}))
    .named('EventBotGeofence');
//# sourceMappingURL=EventBotGeofence.js.map