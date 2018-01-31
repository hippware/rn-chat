"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const GEOLOC_NS = 'http://jabber.org/protocol/geoloc';
exports.Location = mobx_state_tree_1.types
    .model('Location', {
    latitude: mobx_state_tree_1.types.number,
    longitude: mobx_state_tree_1.types.number,
    accuracy: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number)
})
    .actions(self => ({
    addToIQ: (iq) => {
        iq
            .c('geoloc', { xmlns: GEOLOC_NS })
            .c('lat')
            .t(self.latitude)
            .up()
            .c('lon')
            .t(self.longitude)
            .up();
        if (self.accuracy) {
            iq.c('accuracy').t(self.accuracy);
        }
    }
}));
//# sourceMappingURL=Location.js.map