import autobind from 'autobind-decorator'
import {computed, observable, reaction, autorun, action} from 'mobx'
import {IObservableArray} from 'mobx'
import {colors} from '../constants'
import {IWocky} from 'wocky-client'
import Notification from './Notification'

@autobind
class NotificationStore {
  @observable stack: IObservableArray<Notification> = observable([])
  disposer?: () => void
  started: boolean = false
  wocky: IWocky
  offlineNotification?: Notification
  timeout?: any

  constructor(wocky: IWocky, connectivityStore) {
    this.wocky = wocky
    autorun('NotificationStore toggler', () => {
      if (connectivityStore.isActive) this.start()
    })
  }

  @action
  start() {
    console.log('& NOTIFICATION STORE START', this.started)
    if (this.started) return
    this.started = true
    this.reset()

    // initial check after timeout. Delay = debounce.
    // this.timeout = setTimeout(() => {
    this.disposer = reaction(
      () => {
        if (!this.wocky) console.warn('No wocky!')
        const {connected, connecting, profile} = this.wocky
        // console.log('& disposer', connected, connecting, profile, this.stack.length)
        return {isOffline: !!profile && !connected, connecting}
      },
      ({isOffline, connecting}) => {
        // console.log('& disposer inside', isOffline, connecting)
        if (isOffline) {
          if (this.offlineNotification) this.dismiss(this.offlineNotification)
          this.offlineNotification = this.show(connecting ? 'Connecting...' : "You're offline 😰", {
            color: colors.DARK_GREY,
          })
        } else {
          if (this.offlineNotification) this.offlineNotification.close()
        }
      },
      {
        delay: 1000,
        fireImmediately: true,
        name: 'offline notification check',
      }
    )
    // }, 5000)
  }

  @action
  reset() {
    // console.log('& reset')
    if (this.disposer) this.disposer()
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    this.stack.clear()
    this.offlineNotification = undefined
    this.started = false
  }

  @computed
  get current(): Notification | null {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null
  }

  @action
  dismiss(notification: Notification) {
    const index = this.stack.findIndex(n => n.message === notification.message)
    if (index !== -1) {
      this.stack.splice(index, 1)
    }
  }

  @action
  show(message: string, options: object = {}): Notification {
    // console.log('& show', message)
    const notification = new Notification({
      message,
      onClosed: () => this.dismiss(notification),
      ...options,
    })
    const index = this.stack.findIndex(n => n.message === notification.message)
    if (index === -1) {
      this.stack.push(notification)
    }
    return notification
  }

  flash(message: string): Notification {
    return this.show(message, {autoCloseTimeout: 2000})
  }
}

export default NotificationStore
