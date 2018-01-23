"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
function waitFor(condition) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            mobx_1.when(() => {
                let res = false;
                try {
                    res = condition();
                }
                catch (e) {
                    reject(e);
                }
                return res;
            }, () => {
                resolve();
            });
        });
    });
}
exports.waitFor = waitFor;
//# sourceMappingURL=utils.js.map