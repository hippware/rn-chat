import {log} from './logger'
import PushNotification from 'react-native-push-notification'
import {Linking, Platform, Alert} from 'react-native'
import analytics from './analytics'
import BackgroundGeolocation from 'react-native-background-geolocation'

export default (
  onRegistered: (token: string, platform: 'FCM' | 'APNS') => void
): (() => Promise<any>) => {
  PushNotification.configure({
    onRegister({token}) {
      onRegistered(token, Platform.OS === 'android' ? 'FCM' : 'APNS')
    },
    onNotification: async notification => {
      log('Push Notification:', notification)
      analytics.track('push_notification_received', {notification})
      if (!notification.foreground) {
        const url = Platform.select({
          ios: notification.data && notification.data.uri,
          android: notification.url,
        })
        if (url) {
          try {
            analytics.track('push_notification_try', {notification})

            // NOTE: Linking.canOpenURL doesn't work well with Android staging/prod setup
            // if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url)
            analytics.track('push_notification_success', {notification})
          } catch (err) {
            analytics.track('push_notification_fail', {notification, error: err})
          }
        } else if (notification.data['location-request']) {
          try {
            await BackgroundGeolocation.ready({reset: false})
            await BackgroundGeolocation.getCurrentPosition({
              timeout: 20,
              maximumAge: 1000,
            })
            Alert.alert('success!')
          } catch (err) {
            Alert.alert('fail', JSON.stringify(err))
          }
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

  return () => PushNotification.requestPermissions()
}
