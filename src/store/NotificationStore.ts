import autobind from 'autobind-decorator'
import {computed, observable, reaction, autorun} from 'mobx'
import {IObservableArray} from 'mobx'
import {colors} from '../constants'
import {isAlive} from 'mobx-state-tree'
// import { ObservableArray } from 'mobx/lib/types/observablearray';
import {IWocky} from 'wocky-client'
import Notification from './Notification'

@autobind
class NotificationStore {
  @observable stack: IObservableArray<Notification> = observable([])
  disposer?: () => void
  started: boolean = false
  wocky: IWocky

  constructor(wocky, connectivityStore) {
    this.wocky = wocky
    autorun('NotificationStore toggler', () => {
      if (connectivityStore && isAlive(connectivityStore) && connectivityStore.isActive)
        this.start()
      else this.finish()
    })
  }

  start() {
    // console.log('NOTIFICATION STORE START')
    if (this.started) return
    this.started = true

    let offlineNotification

    this.disposer = reaction(
      () => {
        const {connected, connecting, profile} = this.wocky
        return {isOffline: !!profile && !connected, connecting}
      },
      ({isOffline, connecting}) => {
        if (isOffline) {
          offlineNotification = this.show(connecting ? 'Connecting...' : "You're offline 😰", {
            color: colors.DARK_GREY,
          })
        } else {
          if (offlineNotification) offlineNotification.close()
        }
      },
      {
        delay: 5000,
        name: 'offline notification check',
      }
    )
  }

  finish() {
    if (this.disposer) this.disposer()
    this.stack.clear()
    this.started = false
  }

  @computed
  get current(): Notification | null {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null
  }

  dismiss(notification: Notification) {
    const index = this.stack.findIndex(n => n.message === notification.message)
    if (index !== -1) {
      this.stack.splice(index, 1)
    }
  }

  show(message: string, options: object = {}): Notification {
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
