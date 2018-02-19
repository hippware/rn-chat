/* tslint:disable */
import * as Utils from './utils'

import './strophe'

export default class XmppStropheV2 {
  host: any
  onDisconnected: any
  onConnected: any
  onAuthFail: any
  onPresence: any
  onMessage: any
  onIQ: any
  username: any
  _connection: any
  handlers: any = []
  log: any

  /**
   * Creates class instance
   * @param host xmpp host
   * @param log optional log function
   */
  constructor(log: any = (param: any): any => null) {
    this.log = log
    Strophe.log = function(level: any, msg: any) {
      log(msg)
    }

    Strophe.Connection.prototype.rawInput = function(data: any) {
      log(`rawInput: ${data}`)
    }

    Strophe.Connection.prototype.rawOutput = function(data: any) {
      log(`rawOutput: ${data}`)
    }
  }

  login = async (username: string, password: string, host: string, resource: string) => {
    this.host = host!
    const self = this
    return new Promise((resolve, reject) => {
      self._connection = new Strophe.Connection(`ws://${this.host}:5280/ws-xmpp`)
      self._connection.connect(Utils.getJid(username!, this.host, resource), password, (status: any, condition: any) => {
        switch (status) {
          case Strophe.Status.CONNECTED:
            self.log(`${username} CONNECTED to ${self.host}`)
            if (self._connection) {
              const handler = self._connection.addHandler(self._onMessage, null, 'message', null, null)
              self.handlers.push(handler)
              self.handlers.push(self._connection.addHandler(self._onPresence, null, 'presence', null, null))
              self.handlers.push(self._connection.addHandler(self._onIQ, null, 'iq', null, null))
            }
            self.sendPresence()
            self.username = `${username}@${self.host}`
            self.onConnected && self.onConnected(username, password, self.host)
            resolve({username, password, host: self.host})
            return
          case Strophe.Status.DISCONNECTED:
            self.log(`${username} DISCONNECTED`)
            self.username = undefined
            self.onDisconnected && self.onDisconnected()
            reject()
            return
          case Strophe.Status.AUTHFAIL:
            self.log(`${username} AUTHFAIL: ${condition}`)
            self.onAuthFail && self.onAuthFail(condition)
            reject(condition)
        }
      })
    })
  }

  _onPresence = (stanza: any) => {
    const data = Utils.parseXml(stanza)
    this.onPresence && this.onPresence(data.presence)
    return true
  }

  _onMessage = (stanza: any) => {
    const data = Utils.parseXml(stanza).message
    this.onMessage && this.onMessage(data)
    return true
  }

  _onIQ = (stanza: any) => {
    const data = Utils.parseXml(stanza)
    this.onIQ && this.onIQ(data.iq)
    return true
  }

  sendIQ = (data: any, callback: any) => {
    this._connection.sendIQ(data, callback)
  }

  sendStanza = (stanza: any) => {
    this._connection.send(stanza)
  }

  /**
   * Send presence with given data
   * @param data presence data
   */
  sendPresence = (data?: any) => {
    // send presence
    this._connection.send($pres(data))
  }

  disconnect = () => {
    this.handlers.forEach(this._connection.deleteHandler.bind(this._connection))
    this._connection.flush()
    this._connection.disconnect()
  }

  disconnectAfterSending = () => {
    this.disconnect()
  }
}
