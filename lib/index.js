"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const roster_1 = require("./roster");
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
require("./XmppStropheV2");
const model_1 = require("./model");
const paging_1 = require("./paging");
exports.Wocky = roster_1.default.named(model_1.SERVICE_NAME).actions(self => {
    return {
        logout: mobx_state_tree_1.flow(function* () {
            yield self.disconnect();
            if (!self.profile) {
                mobx_state_tree_1.destroy(self.profile);
            }
            self.profile = null;
            self.profiles.clear();
            self.roster.clear();
            //      self.files.clear()
            self.username = null;
            self.password = null;
        })
    };
});
exports.Profile = model_1.Profile;
exports.PaginableList = paging_1.PaginableList;
//# sourceMappingURL=index.js.map