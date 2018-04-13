import React from 'react'
import t from 'tcomb-form-native'
import stylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react/native'

import {ILocationStore, LocationAccuracyChoices, ActivityTypeChoices} from '../store/LocationStore'
import Screen from './Screen'
import {observable} from 'mobx'

t.form.Form.stylesheet = stylesheet
const Form = t.form.Form

const debuggerSettings = t.struct({
  debug: t.Boolean,
  debugSounds: t.Boolean,
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
  form: any
  @observable emailing: boolean = false

  onChange = config => {
    this.props.locationStore!.setBackgroundConfig(config)
  }

  render() {
    const {backgroundOptions, debugSounds} = this.props.locationStore!
    if (!backgroundOptions) return null
    const {
      debug,
      desiredAccuracy,
      distanceFilter,
      stationaryRadius,
      activityType,
      activityRecognitionInterval,
    } = backgroundOptions
    const value = {
      debug,
      desiredAccuracy,
      distanceFilter,
      stationaryRadius,
      activityType,
      activityRecognitionInterval,
      debugSounds,
    }

    return (
      <Screen style={{flex: 1, paddingVertical: 20}}>
        <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
          <Form
            ref={f => (this.form = f)}
            type={debuggerSettings}
            options={options}
            onChange={this.onChange}
            value={value}
          />
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}
