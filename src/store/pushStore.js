// @flow

import autobind from 'autobind-decorator';
import push from './xmpp/pushService';
import model from '../model/model';
import {settings} from '../globals';
import {when} from 'mobx';
import * as log from '../utils/log';
import analyticsStore from './analyticsStore';

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
      analyticsStore.track('push_notification_received', {notification});
      if (notification.data && notification.data.uri) {
        try {
          const Linking = require('react-native').Linking;
          analyticsStore.track('push_notification_try', {notification});
          Linking.openURL(notification.data.uri);
          analyticsStore.track('push_notification_success', {notification});
        } catch (err) {
          analyticsStore.track('push_notification_fail', {notification, error: err});
        }
      }
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
    if (PushNotification) {
      PushNotification.setApplicationIconBadgeNumber(0);
      if (!this.requestedPermissions && !PushNotification.isPermissionsRequestPending) {
        await PushNotification.requestPermissions();
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
