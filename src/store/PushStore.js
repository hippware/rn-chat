// @flow

import {when, observable} from 'mobx';
import * as log from '../utils/log';
import PushNotification from 'react-native-push-notification';
import {Linking} from 'react-native';

class PushStore {
  requestedPermissions = false;
  wocky: any;
  analytics: any;
  @observable pushNotificationToken: string;

  constructor(wocky, analytics) {
    this.wocky = wocky;
    this.analytics = analytics;
    this.start();
  }

  start = () => {
    PushNotification.configure({
      onRegister({token}) {
        this.pushNotificationToken = token;
        try {
          // TODO await this.wocky.enablePush(this.pushNotificationToken);
        } catch (err) {
          log.warn('Push Notification enable error', err);
        }
      },
      onNotification(notification) {
        log.log('Push Notification:', notification);
        this.analytics.track('push_notification_received', {notification});
        if (notification.data && notification.data.uri) {
          try {
            this.analytics.track('push_notification_try', {notification});
            Linking.openURL(notification.data.uri);
            this.analytics.track('push_notification_success', {notification});
          } catch (err) {
            this.analytics.track('push_notification_fail', {notification, error: err});
          }
        }
      },
      senderID: 'YOUR GCM SENDER ID',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
    PushNotification.setApplicationIconBadgeNumber(0);
    when(() => this.wocky.connected, this.requestPushPermissions);
  };

  requestPushPermissions = async () => {
    if (!this.requestedPermissions && !PushNotification.isPermissionsRequestPending) {
      const res = await PushNotification.requestPermissions();
      this.requestedPermissions = true;
    }
  };

  disable = async () => {
    try {
      // TODO: await this.wocky.disablePush();
    } catch (err) {
      log.warn('Push Notification disable error', err);
    }
  };
}

export default PushStore;
