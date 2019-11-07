process.env.NODE_ENV = 'test'
global.__DEV__ = true
global.WebSocket = require('websocket').w3cwebsocket
