"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
exports.Address = mobx_state_tree_1.types
    .model('Address', {
    city: '',
    country: '',
    state: '',
    county: ''
})
    .views(self => ({
    get locationShort() {
        const { city, state, country, county } = self;
        if (country) {
            return country === 'US' || country === 'United States' ? `${city || county}, ${state}` : city || county || state ? `${city || county || state}, ${country}` : country;
        }
        else {
            if (mobx_state_tree_1.getParent(self) && mobx_state_tree_1.getParent(self).address) {
                const arr = mobx_state_tree_1.getParent(self).address.split(', ');
                const parsedCity = arr.length > 2 ? `${arr[arr.length - 3].replace(/\d+/g, '').trim()}, ` : '';
                const parsedState = arr.length > 1 ? arr[arr.length - 2].replace(/\d+/g, '').trim() : '';
                const parsedCountry = arr[arr.length - 1];
                if (parsedCountry === 'USA') {
                    return parsedCity + parsedState;
                }
                else {
                    if (parsedState && parsedState !== '-') {
                        return `${parsedState}, ${parsedCountry}`;
                    }
                    return parsedCountry;
                }
            }
            return '';
        }
    }
}));
//# sourceMappingURL=Address.js.map