process.env.NODE_ENV = 'test';
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.WebSocket = require('websocket').w3cwebsocket;
global.fetch = require('node-fetch');
global.Promise = require('promise');