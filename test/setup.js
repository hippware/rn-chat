import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView;

global.navigator = global.window.navigator;
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.WebSocket = require('websocket').w3cwebsocket;

