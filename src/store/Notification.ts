import {computed, observable, when, action} from 'mobx'
import {colors} from '../constants'
import {IProfile} from 'src/wocky'

type NotificationObj = {
  message: string
  profile?: IProfile
  openLater?: boolean
  autoCloseTimeout?: number
  onClosed?: () => void
  color?: string
}

const WAITING = 0
const OPENING = 1
const OPEN = 2
const CLOSING = 3
const CLOSED = 4

export default class Notification {
  message: string = ''
  profile?: IProfile
  @observable lifeCycleIndex: number
  color: string

  constructor(n: NotificationObj) {
    this.message = n.message
    this.profile = n.profile
    this.color = n.color || colors.PINK
    this.lifeCycleIndex = n.openLater ? WAITING : OPENING
    if (n.autoCloseTimeout) {
      setTimeout(this.close, n.autoCloseTimeout)
    }

    when(
      () => this.isOpening,
      () =>
        setTimeout(
          action(() => (this.lifeCycleIndex = OPEN)),
          1000
        )
    )
    when(
      () => this.isClosing,
      () =>
        setTimeout(
          action(() => (this.lifeCycleIndex = CLOSED)),
          1000
        )
    )
    when(() => this.isClosed, n.onClosed || (() => {})) // tslint:disable-line
  }

  @computed
  get isWaiting(): boolean {
    return this.lifeCycleIndex === WAITING
  }

  @computed
  get isOpening(): boolean {
    return this.lifeCycleIndex === OPENING
  }

  @computed
  get isOpen(): boolean {
    return this.lifeCycleIndex === OPEN
  }

  @computed
  get isClosing(): boolean {
    return this.lifeCycleIndex === CLOSING
  }

  @computed
  get isClosed(): boolean {
    // console.log('& LIFECYCLE CLOSED');
    return this.lifeCycleIndex >= CLOSED
  }

  // next = () => (this.lifeCycleIndex += 1);
  @action
  close = () => {
    // console.log('NOTIFICATION CLOSE')
    this.lifeCycleIndex = CLOSING
  }
}
