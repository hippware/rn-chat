// import {expect} from 'chai';
// import ConnectivityStore from '../../src/store/ConnectivityStore';
import ConnectivityStore, {DELAY} from '../src/store/ConnectivityStore'
// import {Wocky} from 'wocky-client';
import {createWocky, XmppTransport} from './utils/mockWocky'
import {sleep} from '../utils/timeouts'
import MockTransport from './utils/mockTransport'

const AppState = {
  addEventListener: () => {
    console.log('add event listener')
  },
}

class NetInfo {
  listeners = {}

  addEventListener = (name, listener) => {
    this.listeners[name] = listener
  }

  getConnectionInfo = () => {
    return new Promise(resolve => {
      console.log('get connection info')
      resolve({type: 'connected'})
    })
  }
}

const notificationStore = {}
const logger = {
  log: console.log,
  warn: console.warn,
}

describe('ConnectivityStore', () => {
  it('sanity check', () => {
    const wocky = createWocky()
    const store = new ConnectivityStore({
      wocky,
      AppState,
      NetInfo: new NetInfo(),
      notificationStore,
      logger,
    })
  })

  it('retries after !connected', async () => {
    const wocky = createWocky({transport: new MockTransport()})
    await wocky.login()

    expect(wocky.connected).toBe(true)
    expect(wocky.connecting).toBe(false)
    const netInfo = new NetInfo()
    const store = new ConnectivityStore({
      wocky,
      AppState,
      NetInfo: netInfo,
      notificationStore,
      logger,
    })
    expect(store.netConnected).toBe(true)
    expect(store.retryCount).toBe(0)
    netInfo.listeners.connectionChange({type: 'none'})
    expect(store.netConnected).toBe(false)
    // expect(wocky.connected).toBe(true);
    // expect(wocky.username).toBe('user');
    await sleep(501)
    console.log('connected after disconnect?', wocky.connected, wocky.toJSON())
    expect(wocky.connected).toBe(false)
    await sleep(DELAY + 1000)
    expect(wocky.connected).toBe(true)
    // expect(store.retryCount).toBe(1);
    // jest.runAllTimers();
    // expect(store.tryReconnect.mock.calls.length).toBeGreaterThan(0);
  })
})
