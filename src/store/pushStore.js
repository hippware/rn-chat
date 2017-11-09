// @flow

import autobind from 'autobind-decorator';
import push from './xmpp/pushService';
import model from '../model/model';
import {settings} from '../globals';
import {when} from 'mobx';
import * as log from '../utils/log';

let PushNotification;
try {
  PushNotification = require('react-native-push-notification');
} catch (e) {
  log.log(`No push module is registered ${e}`);
}

if (PushNotification) {
  PushNotification.configure({
    onRegister({token}) {
      settings.pushNotificationToken = token;
    },
    onNotification(notification) {
      log.log('Push Notification:', notification);
    },
    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: 'YOUR GCM SENDER ID',
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    requestPermissions: false,
  });
}

@autobind
class PushStore {
  requestedPermissions = false;

  start = async () => {
    if (model.sessionCount >= 2 && !settings.pushNotificationToken && PushNotification) {
      PushNotification.setApplicationIconBadgeNumber(0);
      if (!this.requestedPermissions && !PushNotification.isPermissionsRequestPending) {
        const perm = await PushNotification.requestPermissions();
        this.requestedPermissions = true;
      }
    }
    when(
      () => model.connected && settings.pushNotificationToken,
      async () => {
        try {
          await push.enable(settings.pushNotificationToken);
        } catch (err) {
          log.warn('Push Notification enable error', err);
          // TODO: bugsnag?
        }
      },
    );
  };
  disable = async () => {
    try {
      await push.disable();
    } catch (err) {
      log.warn('Push Notification disable error', err);
      // TODO: bugsnag?
    }
  };

  finish() {}
}

export default new PushStore();
