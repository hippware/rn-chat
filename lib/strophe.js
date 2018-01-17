"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmldom_1 = require("xmldom");
global.DOMParser = xmldom_1.DOMParser;
global.document = new xmldom_1.DOMParser().parseFromString('<html><head></head><body></body></html>', 'html');
global.document.documentElement = {};
global.document.documentElement.style = [];
global.window = global;
require("strophejs");
//# sourceMappingURL=strophe.js.map