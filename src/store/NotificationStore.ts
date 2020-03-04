import {computed, observable, reaction, action} from 'mobx'
import {IObservableArray} from 'mobx'
import {colors} from '../constants'
import {getType} from 'mobx-state-tree'
import {IWocky, EventLocationShare} from 'wocky-client'
import Notification from './Notification'
import {IEventLocationShare} from 'third-party/wocky-client/src/model/EventLocationShare'

export class NotificationStore {
  @observable stack: IObservableArray<Notification> = observable([])
  disposer?: () => void
  disposer2?: () => void
  started: boolean = false
  wocky: IWocky
  offlineNotification?: Notification
  timeout?: any

  constructor(wocky: IWocky) {
    this.wocky = wocky
  }

  @action
  start = () => {
    if (this.started) return
    this.finish()
    this.started = true
    const self = this

    // observer & show 'friendship' notification
    this.disposer2 = reaction(
      () => this.wocky.notification,
      () => {
        if (getType(self.wocky.notification!).name === EventLocationShare.name) {
          const profile = (self.wocky.notification as IEventLocationShare)!.sharedWith
          self.flash(`${profile.handle} is sharing their location with you`, {
            autoCloseTimeout: 3000,
            profile,
          })
        }
      }
    )
    // initial check after timeout. Delay = debounce.
    this.timeout = setTimeout(() => {
      this.disposer = reaction(
        () => {
          const {connected, connecting, profile} = this.wocky
          return {isOffline: !!profile && !connected, connecting}
        },
        ({isOffline, connecting}) => {
          if (isOffline) {
            if (this.offlineNotification) this.dismiss(this.offlineNotification)
            this.offlineNotification = this.show(
              connecting ? `Connecting...` : `You're offline 😰`,
              {
                color: colors.DARK_GREY,
              }
            )
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
    }, 5000)
  }

  @action
  finish = () => {
    if (this.disposer) this.disposer()
    if (this.disposer2) this.disposer2()
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
  dismiss = (notification: Notification) => {
    const index = this.stack.findIndex(n => n.message === notification.message)
    if (index !== -1) {
      this.stack.splice(index, 1)
    }
  }

  @action
  show = (message: string, options: object = {}): Notification => {
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

  flash = (message: string, options = {}): Notification => {
    return this.show(message, {autoCloseTimeout: 2000, ...options})
  }
}

export default NotificationStore
