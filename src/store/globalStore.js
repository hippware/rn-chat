import autobind from 'autobind-decorator';
import profile from './profileStore';
import location from './locationStore';
import bot from './botStore';
import friend from './friendStore';
import message from './messageStore';
import push from './pushStore';
import model from '../model/model';
import event from './eventStore';
import {observable, autorunAsync} from 'mobx';
import codepush from '../store/codePushStore';

@autobind class GlobalStore {
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
  start() {
    this.started = true;
    model.sessionCount += 1;
    codepush.start();
    event.start();
    bot.start();
    location.start();
    friend.start();
    message.start();
    push.start();
  }
  logout() {
    push.disable();
    this.finish();
  }
  finish() {
    this.started = false;
    event.finish();
    bot.finish();
    location.finish();
    friend.finish();
    message.finish();
    push.finish();
  }
}

export default new GlobalStore();
