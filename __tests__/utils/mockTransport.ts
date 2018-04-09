import {createWocky, XmppTransport} from './mockWocky'
import {sleep} from '../../utils/timeouts'

export default class MockTransport extends XmppTransport {
  loginCount = 0

  async login(user?: string, password?: string, host?: string) {
    console.log('LOGIN', this.loginCount)
    this.loginCount += 1
    if (this.loginCount !== 2) {
      await super.login(user, password, host)
    } else {
      sleep(1)
      this.connected = false
      this.connecting = false
      throw new Error('mock failed login')
    }
  }
}
