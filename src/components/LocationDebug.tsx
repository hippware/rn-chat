import React from 'react'
import t from 'tcomb-form-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react/native'

import {
  ILocationStore,
  LocationAccuracyChoices,
  ActivityTypeChoices,
  BG_STATE_PROPS,
} from '../store/LocationStore'
import Screen from './Screen'
import _ from 'lodash'

const Form = t.form.Form

const debuggerSettings = t.struct({
  debug: t.Boolean,
  debugSounds: t.Boolean,
  heartbeatInterval: t.Number,
  elasticityMultiplier: t.Number,
  desiredAccuracy: t.enums(LocationAccuracyChoices),
  distanceFilter: t.Number,
  stationaryRadius: t.Number,
  activityType: t.enums(ActivityTypeChoices),
  activityRecognitionInterval: t.Number,
})

const options = {
  fields: {
    debug: {
      label: 'Background location debug mode',
    },
    heartbeatInterval: {
      label: 'heartbeatInterval',
    },
    elasticityMultiplier: {
      label: 'elasticityMultiplier',
    },
    desiredAccuracy: {
      label: 'desiredAccuracy',
    },
    distanceFilter: {
      label: 'distanceFilter',
    },
    stationaryRadius: {
      label: 'stationaryRadius (minimum 25)',
    },
    activityType: {
      label: 'activityType',
    },
    activityRecognitionInterval: {
      label: 'activityRecognitionInterval (in ms)',
    },
  },
}

type Props = {
  locationStore?: ILocationStore
}

@inject('locationStore')
@observer
export default class LocationDebug extends React.Component<Props> {
  render() {
    const {backgroundOptions, debugSounds} = this.props.locationStore!
    if (!backgroundOptions) return null
    let value = _.pick(backgroundOptions, BG_STATE_PROPS)
    value = Object.assign(value, {debugSounds})

    return (
      <Screen style={{flex: 1, paddingVertical: 20}}>
        <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
          <Form
            type={debuggerSettings}
            options={options}
            onChange={this.props.locationStore!.setBackgroundConfig}
            value={value}
          />
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}
