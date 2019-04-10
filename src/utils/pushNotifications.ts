import {log} from './log'
import PushNotification from 'react-native-push-notification'
import {Linking} from 'react-native'
import analytics from './analytics'

export default wocky => {
  let pushNotificationToken

  PushNotification.configure({
    onRegister({token}) {
      pushNotificationToken = token
      wocky.enablePush(pushNotificationToken)
    },
    onNotification(notification) {
      log('Push Notification:', notification)
      analytics.track('push_notification_received', {notification})
      if (!notification.foreground && notification.data && notification.data.uri) {
        try {
          analytics.track('push_notification_try', {notification})
          Linking.openURL(notification.data.uri)
          analytics.track('push_notification_success', {notification})
        } catch (err) {
          analytics.track('push_notification_fail', {notification, error: err})
        }
      }
    },
    senderID: '548019610697',
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: false,
  })

  PushNotification.getApplicationIconBadgeNumber((badgeCount: number) => {
    if (badgeCount > 0) {
      PushNotification.setApplicationIconBadgeNumber(0)
    }
  })
}
