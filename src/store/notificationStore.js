// @flow

import autobind from 'autobind-decorator';
import Notification from '../model/Notification';
import {autorun, autorunAsync, computed, observable} from 'mobx';
import model from '../model/model';
import * as log from '../utils/log';
import {colors} from '../constants';

@autobind
export class NotificationStore {
  @observable stack: Notification[] = [];

  constructor() {
    const offlineNotification = new Notification({message: "You're offline 😰", color: colors.DARK_GREY});
    autorun(() => {
      if (model.connected) {
        this.stack.push(offlineNotification);
      } else {
        this.dismiss(offlineNotification);
      }
    });
  }

  @computed
  get current(): ?Notification {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  dismiss(notification: Notification) {
    const index = this.stack.findIndex(n => (n.message = notification.message));
    console.log('& dismiss index', index, notification);
    if (index !== -1) {
      this.stack.splice(index, 1);
    }
  }

  show(message: string) {
    const notification = new Notification({
      message,
      onClosed: () => this.dismiss(notification),
    });
    this.stack.push(notification);
  }

  flash(message: string) {
    const notification = new Notification({
      message,
      onClosed: () => this.dismiss(notification),
      autoCloseTimeout: 2000,
    });
    this.stack.push(notification);
  }
}

export default new NotificationStore();
