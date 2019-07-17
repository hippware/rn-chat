// mixpanel JS API docs: https://mixpanel.com/help/reference/javascript
import {settings} from '../globals'
import {when} from 'mobx'
import {log} from './logger'
import {IWocky} from 'wocky-client'
import Mixpanel from 'react-native-mixpanel'
import bsClient from './bugsnagConfig'

export const analyticsGeoWidgetTap = 'geofence_widget_tap'

export class Analytics {
  inSession: boolean = false
  initialized: boolean = false

  constructor() {
    if (__DEV__ || !Mixpanel) return
    Mixpanel.sharedInstanceWithToken(settings.mixPanelApiToken).then(() => {
      this.initialized = true
    })
  }

  identify = (wocky: IWocky) => {
    if (__DEV__) {
      log('IDENTIFY', wocky)
      return
    }
    when(
      () =>
        wocky && wocky.connected && !!wocky.profile && !!wocky.profile.handle && this.initialized,
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

  track = (name: string, properties?: {[name: string]: any}): void => {
    if (__DEV__ || !this.initialized) {
      log('TRACK', name, properties)
      return
    }
    try {
      if (!properties) {
        properties = {}
      }
      Mixpanel.trackWithProperties(name, {...properties, occurredAt: new Date().toISOString()})
    } catch (err) {
      log('Mixpanel tracking error', err)
      bsClient.notify(err, report => {
        // metadata gets discarded like in https://github.com/bugsnag/bugsnag-react-native/issues/132
        report.metadata = err
      })
    }
  }

  private sessionStart = () => {
    if (__DEV__) {
      log('SESSION START')
      return
    }
    if (this.inSession) return
    this.inSession = true
    Mixpanel.timeEvent('session')
  }

  // todo: currently unused
  // sessionEnd = () => {
  //   if (__DEV__ || !this.initialized) {
  //     log('SESSION END')
  //     return
  //   }
  //   Mixpanel.track('session')
  //   this.inSession = false
  // }
}

export default new Analytics()
