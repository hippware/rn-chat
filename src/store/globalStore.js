import autobind from 'autobind-decorator';
import location from './locationStore';
import bot from './botStore';
import friend from './friendStore';
import message from './messageStore';
import push from './pushStore';
import model from '../model/model';
import event from './eventStore';
import {observable, autorunAsync, when} from 'mobx';
import firebaseStore from './firebaseStore';
import notificationStore from './notificationStore';
import * as log from '../utils/log';

@autobind
class GlobalStore {
  @observable started = false;
  constructor() {
    autorunAsync(() => {
      try {
        if (!this.started && model.connected && model.registered && model.user) {
          this.start();
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  async start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.handler = when(
      () => model.connected,
      () => {
        if (model.profile && model.profile.handle) {
          model.sessionCount += 1;
        }
        location.start();
      },
    );
    // await friend.start();
    // await event.start();
    await bot.start();
    push.start();
    notificationStore.start();
  }
  logout = async () => {
    this.finish();
    await Promise.all([push.disable(), firebaseStore.logout()]);
  };
  finish() {
    this.handler && this.handler();
    event.finish();
    bot.finish();
    location.finish();
    friend.finish();
    message.finish();
    push.finish();
    notificationStore.finish();
    this.started = false;
  }
}

export default new GlobalStore();
