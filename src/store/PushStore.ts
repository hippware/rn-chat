import {when, observable} from 'mobx'
import * as log from '../utils/log'
import PushNotification from 'react-native-push-notification'
import {Linking} from 'react-native'

class PushStore {
  wocky: any
  analytics: any
  @observable pushNotificationToken?: string

  constructor(wocky, analytics) {
    this.wocky = wocky
    this.analytics = analytics
    PushNotification.configure({
      onRegister({token}) {
        this.pushNotificationToken = token
        when(
          () => wocky.connected,
          () => {
            try {
              wocky.enablePush(this.pushNotificationToken)
            } catch (err) {
              log.warn('Push Notification enable error', err)
            }
          }
        )
      },
      onNotification(notification) {
        log.log('Push Notification:', notification)
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
}

export default PushStore
