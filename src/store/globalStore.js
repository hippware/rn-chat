import autobind from 'autobind-decorator';
import location from './locationStore';
import bot from './botStore';
import friend from './friendStore';
import message from './messageStore';
import push from './pushStore';
import model from '../model/model';
import event from './eventStore';
import {observable, autorunAsync, when} from 'mobx';
import codepush from '../store/codePushStore';

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
    await friend.start();
    await event.start();
    await bot.start();
    codepush.start();
    push.start();
  }
  logout() {
    push.disable();
    this.finish();
  }
  finish() {
    this.handler && this.handler();
    this.started = false;
    event.finish();
    bot.finish();
    location.finish();
    friend.finish();
    message.finish();
    push.finish();
    // breaking the app on reload from Messages screen
    // model.clear();
  }
}

export default new GlobalStore();
