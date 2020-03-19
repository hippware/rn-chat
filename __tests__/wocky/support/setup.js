process.env.NODE_ENV = 'test'
global.__DEV__ = true
global.WebSocket = require('websocket').w3cwebsocket

jest.mock('../../../src/utils/logger', () => ({
  log: console.log,
  warn: console.warn,
  error: console.error,
  assert: console.assert,
  persistLog: () => null,
  notifyBugsnag: () => null,
}))
