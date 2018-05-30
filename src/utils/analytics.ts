// mixpanel JS API docs: https://mixpanel.com/help/reference/javascript
import {settings} from '../globals'
import {when} from 'mobx'
import * as log from '../utils/log'
import {IWocky} from 'wocky-client'
import Mixpanel from 'react-native-mixpanel'
import AppCenter from 'appcenter-analytics'

export const analyticsGeoWidgetTap = 'geofence_widget_tap'

class Analytics {
  inSession: boolean = false

  constructor() {
    if (__DEV__ || !Mixpanel) return
    Mixpanel.sharedInstanceWithToken(
      settings.isStaging ? '5ee41c4ec134d9c7d769d9ddf41ed8eb' : '3f62ffcf7a8fc0100157f877af5668a6'
    )
  }

  identify = (wocky: IWocky) => {
    if (__DEV__) {
      log.log('IDENTIFY', wocky)
      return
    }
    when(
      () => wocky && wocky.connected && !!wocky.profile && !!wocky.profile.handle,
      () => {
        const {id, email, firstName, lastName, phoneNumber, handle} = wocky!.profile!
        Mixpanel.identify(id)
        Mixpanel.set({
          $email: email,
          $first_name: firstName,
          $last_name: lastName,
          phone: phoneNumber,
          username: handle,
        })
        this.sessionStart()
      }
    )
  }

  track = (name: string, properties?: object): void => {
    if (__DEV__) {
      log.log('TRACK', name, properties)
      return
    }
    try {
      AppCenter.trackEvent(name, properties)
      if (!properties) {
        Mixpanel.track(name)
      } else {
        Mixpanel.trackWithProperties(name, properties)
      }
    } catch (err) {
      log.log('Mixpanel tracking error', err)
    }
  }

  sessionStart = () => {
    if (__DEV__) {
      log.log('SESSION START')
      return
    }
    if (this.inSession) return
    this.inSession = true
    Mixpanel.timeEvent('session')
  }

  sessionEnd = () => {
    if (__DEV__) {
      log.log('SESSION END')
      return
    }
    Mixpanel.track('session')
    this.inSession = false
  }
}

export default new Analytics()
