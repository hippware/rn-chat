global.DOMParser = require("xmldom").DOMParser;
global.document = new DOMParser().parseFromString("<html><head></head><body></body></html>","html");
global.document.documentElement = {};
global.document.documentElement.style = [];

global.window = global;

require("strophejs");