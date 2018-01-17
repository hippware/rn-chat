global.DOMParser = require('xmldom').DOMParser; // eslint-disable-line
// import {DOMParser} from 'xmldom';

global.document = new DOMParser().parseFromString('<html><head></head><body></body></html>', 'html');
global.document.documentElement = {};
global.document.documentElement.style = [];
// global.document.body = {};

global.window = global;

require('../../../thirdparty/strophejs');
