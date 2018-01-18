"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roster_1 = require("./roster");
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
require("./XmppStropheV2");
const model_1 = require("./model");
const paging_1 = require("./paging");
exports.Wocky = roster_1.default;
exports.Profile = model_1.Profile;
exports.PaginableList = paging_1.PaginableList;
//# sourceMappingURL=index.js.map