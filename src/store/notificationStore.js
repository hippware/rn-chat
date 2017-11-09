// @flow

import autobind from 'autobind-decorator';
import Notification from '../model/Notification';
import {computed, observable, reaction} from 'mobx';
import type {IObservableArray} from 'mobx';
import model from '../model/model';
import {colors} from '../constants';

@autobind
export class NotificationStore {
  @observable stack: IObservableArray<Notification> = [];
  disposer: ?Function = null;
  started: boolean = false;

  start() {
    if (this.started) return;
    this.started = true;

    let offlineNotification;

    this.disposer = reaction(
      () => {
        const {connected, connecting, profile} = model;
        return (connected || connecting) && !!profile;
      },
      (isOnline) => {
        if (isOnline) {
          offlineNotification && offlineNotification.close();
        } else {
          offlineNotification = this.show("You're offline 😰", {color: colors.DARK_GREY});
        }
      },
      {
        fireImmediately: true,
        delay: 2000,
        // compareStructural: true,
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

export default new NotificationStore();
