process.env.NODE_ENV = 'test'

global.window = global
global.XMLHttpRequest = require('./xmlhttprequest').XMLHttpRequest
// global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('websocket').w3cwebsocket
global.fetch = require('node-fetch')
global.Promise = require('promise')
global.FormData = require('form-data')

global.__DEV__ = true
