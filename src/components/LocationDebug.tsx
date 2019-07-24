import React from 'react'
import {TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react'
import moment from 'moment'

import {
  ILocationStore,
  LocationAccuracyChoices,
  ActivityTypeChoices,
  LogLevelChoices,
  BG_STATE_PROPS,
} from '../store/LocationStore'
import Screen from './Screen'
import _ from 'lodash'
import {IWocky} from 'wocky-client'
import {RText} from './common'
import {colors} from '../constants'

const Form = t.form.Form

const debuggerSettings = t.struct({
  debug: t.Boolean,
  debugSounds: t.Boolean,
  stopTimeout: t.Number,
  elasticityMultiplier: t.Number,
  desiredAccuracy: t.enums(LocationAccuracyChoices),
  distanceFilter: t.Number,
  stationaryRadius: t.Number,
  activityType: t.enums(ActivityTypeChoices),
  activityRecognitionInterval: t.Number,
  logLevel: t.enums(LogLevelChoices),
})

const options = {
  fields: {
    debug: {
      label: 'Background location debug mode',
    },
    stopTimeout: {
      label: 'stopTimeout (in minutes)',
    },
    elasticityMultiplier: {
      label: 'elasticityMultiplier',
    },
    desiredAccuracy: {
      label: 'desiredAccuracy',
    },
    distanceFilter: {
      label: 'distanceFilter (in meters)',
    },
    stationaryRadius: {
      label: 'stationaryRadius (in meters, min 25)',
    },
    activityType: {
      label: 'activityType',
    },
    activityRecognitionInterval: {
      label: 'activityRecognitionInterval (in ms)',
    },
    logLevel: {
      label: 'logLevel',
    },
  },
}

type Props = {
  locationStore?: ILocationStore
  wocky?: IWocky
}

@inject('locationStore', 'wocky')
@observer
export default class LocationDebug extends React.Component<Props> {
  renderLocation = (l, index) => (
    <RText size={13} key={l.createdAt}>
      {`${index + 1}. ${moment(l.createdAt).calendar()}: ${l.lat}, ${l.lon}`}
    </RText>
  )

  render() {
    const {backgroundOptions, debugSounds} = this.props.locationStore!
    if (!backgroundOptions) return null
    let value = _.pick(backgroundOptions, BG_STATE_PROPS)
    value = _.assign(value, {debugSounds})

    return (
      <Screen style={{flex: 1, paddingVertical: 20}}>
        <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
          <Form
            type={debuggerSettings}
            options={options}
            onChange={this.props.locationStore!.setBackgroundConfig}
            value={value}
          />
          <TouchableOpacity
            // Calling emailLog with empty string seems to work
            onPress={() => {
              this.props.locationStore!.emailLog('')
            }}
            style={{
              backgroundColor: colors.PINK,
              padding: 5,
              borderRadius: 2,
              marginTop: 20,
              width: 120,
              alignItems: 'center',
            }}
          >
            <RText size={20} color={colors.WHITE}>
              Email log
            </RText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}
