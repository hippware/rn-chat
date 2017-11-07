// @flow

import {observable, computed, when} from 'mobx';
import {colors} from '../constants';

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

export default class Notification {
  message: string = '';
  @observable lifeCycleIndex: number;
  color: string;

  constructor(n: NotificationObj) {
    this.message = n.message;
    this.color = n.color || colors.PINK;
    this.lifeCycleIndex = n.openLater ? WAITING : OPENING;
    if (n.autoCloseTimeout) {
      setTimeout(() => (this.lifeCycleIndex = CLOSING), n.autoCloseTimeout);
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

  next = () => (this.lifeCycleIndex += 1);
}
