"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const moment = require('moment');
// http://momentjs.com/docs/#/customization/relative-time/
moment.updateLocale('en', {
    relativeTime: {
        s: '%ds',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        y: '1y',
        yy: '%dy'
    }
});
// http://momentjs.com/docs/#/customization/relative-time-threshold/
moment.relativeTimeThreshold('d', 365);
moment.relativeTimeThreshold('M', 0);
exports.Timeable = mobx_state_tree_1.types
    .model('Timeable', {
    time: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, () => Date.now())
})
    .views(self => ({
    get date() {
        return new Date(self.time);
    },
    get dateAsString() {
        return moment(self.time).calendar();
    },
    get relativeDateAsString() {
        return moment(self.time).fromNow(true);
    }
}));
//# sourceMappingURL=Timeable.js.map