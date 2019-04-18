import {log} from './logger'
import PushNotification from 'react-native-push-notification'
import {Linking, Platform} from 'react-native'
import analytics from './analytics'

export default (onRegistered: (token: string, platform: 'FCM' | 'APNS') => void) => {
  PushNotification.configure({
    onRegister({token}) {
      onRegistered(token, Platform.OS === 'android' ? 'FCM' : 'APNS')
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
    requestPermissions: Platform.OS === 'android',
  })

  PushNotification.getApplicationIconBadgeNumber((badgeCount: number) => {
    if (badgeCount > 0) {
      PushNotification.setApplicationIconBadgeNumber(0)
    }
  })
}
