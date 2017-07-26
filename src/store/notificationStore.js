// @flow

import autobind from 'autobind-decorator';
import Notification from '../model/Notification';
import {autorun, autorunAsync, computed, observable} from 'mobx';
import model from '../model/model';
import * as log from '../utils/log';

const CONNECTION_DELAY_MS = 5000;

@autobind
export class NotificationStore {
  @observable offlineNotification: Notification = null;
  @observable connectingNotification: Notification = null;

  @observable stack: Notification[] = [];

  @computed
  get current(): Notification {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  constructor() {
    this.offlineNotification = new Notification('Offline', 'Please connect to the internet');
    this.connectingNotification = new Notification('Connecting...');
    autorunAsync(() => {
      if (model.connected) {
        this.dismiss(this.offlineNotification);
      } else {
        this.show(this.offlineNotification);
      }
    }, CONNECTION_DELAY_MS);
    autorunAsync(() => {
      if (!model.connecting) {
        log.log('DISMISS CONNECTING');
        this.dismiss(this.connectingNotification);
      } else {
        this.show(this.connectingNotification);
      }
    }, CONNECTION_DELAY_MS);
  }

  show(notification: Notification) {
    const index = this.stack.indexOf(notification);
    if (index === -1) {
      this.stack.push(notification);
    }
  }

  dismiss(notification: Notification) {
    const index = this.stack.indexOf(notification);
    if (index !== -1) {
      this.stack.splice(index, 1);
    }
  }

  showAndDismiss(notification: Notification, time: number = 2000) {
    this.show(notification);
    setTimeout(() => {
      this.dismiss(notification);
    }, time);
  }
}

export default new NotificationStore();
