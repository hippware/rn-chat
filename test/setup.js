process.env.NODE_ENV = 'test'
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.WebSocket = require('websocket').w3cwebsocket;

