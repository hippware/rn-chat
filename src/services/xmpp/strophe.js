global.DOMParser = require("xmldom").DOMParser;
global.document = new DOMParser().parseFromString("<html><head></head><body></body></html>","html");
global.window = global;

require("strophe.js");