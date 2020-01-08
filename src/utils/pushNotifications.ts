import {log} from './logger'
import PushNotification from 'react-native-push-notification'
import {Linking, Platform} from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import analytics from './analytics'
import BackgroundGeolocation from 'react-native-background-geolocation-android'
import {RemoteMessage} from 'react-native-firebase/messaging'

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

      let newData = false
      if (!notification.foreground) {
        newData = newData || (await tryDeeplinkNotification(notification))
      }
      newData = newData || (await tryLocationRequestNotification(notification))

      if (Platform.OS === 'ios' && notification.finish) {
        notification.finish(
          newData ? PushNotificationIOS.FetchResult.NewData : PushNotificationIOS.FetchResult.NoData
        )
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

async function tryLocationRequestNotification(notification): Promise<boolean> {
  const locationRequest = Platform.select({
    ios: notification.data && notification.data['location-request'],
    android: notification['location-request'],
  })

  if (locationRequest) {
    await BackgroundGeolocation.ready({reset: false})
    await BackgroundGeolocation.getCurrentPosition({
      timeout: 20,
      maximumAge: 1000,
      // ToDo: set accuracy?
      extras: {
        is_location_request: true,
      },
    })

    return true
  }
  return false
}

async function tryDeeplinkNotification(notification): Promise<boolean> {
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
      return true
    } catch (err) {
      analytics.track('push_notification_fail', {notification, error: err})
    }
  }
  return false
}

export async function handleFirebaseBackgroundMessage(message: RemoteMessage) {
  await tryLocationRequestNotification(message.data)
}
