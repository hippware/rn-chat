import autobind from 'autobind-decorator';
import assert from 'assert';
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
    // (optional) Called when Token is generated (iOS and Android)
    onRegister({token}) {
      settings.token = token;
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification(notification) {},

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

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: false,
  });
}
@autobind class PushService {
  start = () => {
    if (model.sessionCount >= 2 && !settings.token) {
      if (PushNotification) {
        if (!PushNotification.isPermissionsRequestPending) {
          PushNotification.requestPermissions();
        }
      }
    }
    when(
      () => model.connected && settings.token,
      () => {
        push.enable(settings.token);
      }
    );
  };
  disable() {
    push.disable();
  }

  finish() {}
}

export default new PushService();
