// @flow

import autobind from 'autobind-decorator';
import {computed, observable, reaction, when} from 'mobx';
import type {IObservableArray} from 'mobx';
import {colors} from '../constants';

@autobind
class NotificationStore {
  @observable stack: IObservableArray<Notification> = [];
  disposer: ?Function = null;
  started: boolean = false;
  wocky: any;

  constructor(wocky) {
    this.wocky = wocky;
    this.start();
  }

  start() {
    if (this.started) return;
    this.started = true;

    let offlineNotification;

    this.disposer = reaction(
      () => {
        const {connected, connecting, profile} = this.wocky;
        return {isOffline: !!profile && !connected, connecting};
      },
      ({isOffline, connecting}) => {
        if (isOffline) {
          offlineNotification = this.show(connecting ? 'Connecting...' : "You're offline 😰", {color: colors.DARK_GREY});
        } else {
          offlineNotification && offlineNotification.close();
        }
      },
      {
        delay: 5000,
        name: 'offline notification check',
      },
    );
  }

  finish() {
    if (this.disposer) this.disposer();
    this.stack.clear();
    this.started = false;
  }

  @computed
  get current(): ?Notification {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  dismiss(notification: Notification) {
    const index = this.stack.findIndex(n => (n.message = notification.message));
    if (index !== -1) {
      this.stack.splice(index, 1);
    }
  }

  show(message: string, options?: Object = {}): Notification {
    const notification = new Notification({
      message,
      onClosed: () => this.dismiss(notification),
      ...options,
    });
    const index = this.stack.findIndex(n => (n.message = notification.message));
    if (index === -1) {
      this.stack.push(notification);
    }
    return notification;
  }

  flash(message: string): Notification {
    return this.show(message, {autoCloseTimeout: 2000});
  }
}

type NotificationObj = {
  message: string,
  openLater?: boolean,
  autoCloseTimeout?: number,
  onClosed?: Function,
  color?: string,
};

const WAITING = 0;
const OPENING = 1;
const OPEN = 2;
const CLOSING = 3;
const CLOSED = 4;

class Notification {
  message: string = '';
  @observable lifeCycleIndex: number;
  color: string;

  constructor(n: NotificationObj) {
    this.message = n.message;
    this.color = n.color || colors.PINK;
    this.lifeCycleIndex = n.openLater ? WAITING : OPENING;
    if (n.autoCloseTimeout) {
      setTimeout(this.close, n.autoCloseTimeout);
    }

    when(() => this.isOpening, () => setTimeout(() => (this.lifeCycleIndex = OPEN), 1000));
    when(() => this.isClosing, () => setTimeout(() => (this.lifeCycleIndex = CLOSED), 1000));
    when(() => this.isClosed, n.onClosed || (() => {}));
  }

  @computed
  get isWaiting(): boolean {
    return this.lifeCycleIndex === WAITING;
  }

  @computed
  get isOpening(): boolean {
    return this.lifeCycleIndex === OPENING;
  }

  @computed
  get isOpen(): boolean {
    return this.lifeCycleIndex === OPEN;
  }

  @computed
  get isClosing(): boolean {
    return this.lifeCycleIndex === CLOSING;
  }

  @computed
  get isClosed(): boolean {
    // console.log('& LIFECYCLE CLOSED');
    return this.lifeCycleIndex >= CLOSED;
  }

  // next = () => (this.lifeCycleIndex += 1);

  close = () => (this.lifeCycleIndex = CLOSING);
}

export default NotificationStore;
