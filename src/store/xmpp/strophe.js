global.DOMParser = require('xmldom').DOMParser; // eslint-disable-line

global.document = new DOMParser().parseFromString('<html><head></head><body></body></html>', 'html');
global.document.documentElement = {};
global.document.documentElement.style = [];

global.window = global;

require('../../../thirdparty/strophejs');
