// @flow

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
import {settings} from '../globals';

@autobind
class GlobalStore {
  @observable started = false;
  @observable loaded = false;
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
    this.checkAppUpdated();
    this.handler = when(
      () => model.connected,
      () => {
        if (model.profile && model.profile.handle) {
          model.sessionCount += 1;
        }
        location.start();
      },
    );
    when(() => model.connected, () => this.loaded = true);
    await friend.start();
    await event.start();
    await bot.start();
    push.start();
    notificationStore.start();
  }

  logout = async (): Promise<void> => {
    this.loaded = false;
    this.finish();
    await Promise.all([push.disable(), firebaseStore.logout()]);
  };

  finish() {
    this.loaded = false;
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

  checkAppUpdated = (): void => {
    let appVersion = [0, 0, 0];
    try {
      appVersion = settings.version.split('.').map(str => parseInt(str));
      const {bundleVersion} = model;
      // compare major, minor, and micro versions to detect version change
      if (bundleVersion.some((b, ind) => appVersion[ind] !== b)) {
        model.resetCache();
      }
    } catch (err) {
      log.warn('Error checking app version', appVersion, err);
    }
    model.bundleVersion = appVersion;
  };
}

export default new GlobalStore();
