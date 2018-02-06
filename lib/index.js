"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const EventStore_1 = require("./store/EventStore");
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
require("./store/XmppStropheV2");
const Profile_1 = require("./model/Profile");
const Base_1 = require("./model/Base");
exports.Wocky = mobx_state_tree_1.types
    .compose(EventStore_1.EventStore, mobx_state_tree_1.types.model({
    id: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string), 'wocky')
}))
    .named(Base_1.SERVICE_NAME)
    .actions(self => {
    return {
        logout: mobx_state_tree_1.flow(function* () {
            yield self.disconnect();
            if (!self.profile) {
                mobx_state_tree_1.destroy(self.profile);
            }
            self.profile = null;
            self.profiles.clear();
            self.roster.clear();
            self.chats.clear();
            self.bots.clear();
            self.version = '';
            self.events.refresh();
            self.updates.clear();
            self.username = null;
            self.password = null;
        })
    };
});
exports.Profile = Profile_1.Profile;
//# sourceMappingURL=index.js.map