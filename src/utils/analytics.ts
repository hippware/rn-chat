// @flow

// mixpanel JS API docs: https://mixpanel.com/help/reference/javascript

import {settings} from '../globals'
import {when} from 'mobx'
import * as log from '../utils/log'

let Mixpanel
try {
  Mixpanel = require('react-native-mixpanel')
} catch (e) {
  log.log(`No mixpanel ${e}`)
}

class Analytics {
  inSession: boolean = false

  constructor() {
    if (__DEV__ || !Mixpanel) return
    Mixpanel.sharedInstanceWithToken(
      settings.isStaging ? '5ee41c4ec134d9c7d769d9ddf41ed8eb' : '3f62ffcf7a8fc0100157f877af5668a6'
    )

    // TODO: analytics based on wocky triggers
    // when(
    //   () => model.profile,
    //   () => {
    //     Mixpanel.identify(model.profile.user);
    //     Mixpanel.set({
    //       $email: model.profile.email,
    //       $first_name: model.profile.firstName,
    //       $last_name: model.profile.lastName,
    //       phone: model.profile.phoneNumber,
    //       username: model.profile.handle,
    //     });
    //     this.sessionStart();
    //   },
    // );
  }

  track = (name: string, properties?: object): void => {
    if (__DEV__) {
      log.log('TRACK', name, properties)
      return
    }
    try {
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
