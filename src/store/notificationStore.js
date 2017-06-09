import autobind from 'autobind-decorator';
import Notification from '../model/Notification';
import {autorun, computed, observable} from 'mobx';
import model from '../model/model';

@autobind
export class NotificationStore {
  @observable offlineNotification: Notification = null;
  @observable connectingNotification: Notification = null;

  @observable stack: Notification = [];

  @computed get current(): Notification {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  constructor() {
    this.offlineNotification = new Notification('Offline', 'Please connect to the internet');
    this.connectingNotification = new Notification('Connecting...');
    autorun(() => {
      if (model.connected) {
        this.dismiss(this.offlineNotification);
      } else {
        this.show(this.offlineNotification);
      }
    });
    autorun(() => {
      if (!model.connecting) {
        console.log('DISMISS CONNECTING');
        this.dismiss(this.connectingNotification);
      } else {
        this.show(this.connectingNotification);
      }
    });
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

  showAndDismiss(notification: Notification, time: integer = 2000) {
    this.show(notification);
    setTimeout(() => {
      this.dismiss(notification);
    }, time);
  }
}

export default new NotificationStore();
