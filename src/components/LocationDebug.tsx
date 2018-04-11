import React from 'react'
import Screen from './Screen'
import t from 'tcomb-form-native'
import stylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react/native'
import {ILocationStore, LocationAccuracyValues} from '../store/LocationStore'

t.form.Form.stylesheet = stylesheet
const Form = t.form.Form

const enumObj = {}
LocationAccuracyValues.forEach(v => {
  enumObj[v] = v
})

const debuggerSettings = t.struct({
  desiredAccuracy: t.enums(enumObj),
  distanceFilter: t.Number,
  stationaryRadius: t.Number,
})

const options = {
  fields: {
    desiredAccuracy: {
      label: 'desiredAccuracy',
    },
    distanceFilter: {
      label: 'distanceFilter',
    },
    stationaryRadius: {
      label: 'stationaryRadius',
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

  onChange = config => {
    this.props.locationStore!.setBackgroundConfig(config)
  }

  render() {
    const {backgroundOptions} = this.props.locationStore!
    if (!backgroundOptions) return null
    const {desiredAccuracy, distanceFilter, stationaryRadius} = backgroundOptions

    // TODO: add location debug mode toggle

    return (
      <Screen style={{flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1, padding: 20}}>
          <Form
            ref={f => (this.form = f)}
            type={debuggerSettings}
            options={options}
            onChange={this.onChange}
            value={{desiredAccuracy, distanceFilter, stationaryRadius}}
          />
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}
