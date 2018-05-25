import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react/native'
import moment from 'moment'

import {
  ILocationStore,
  LocationAccuracyChoices,
  ActivityTypeChoices,
  BG_STATE_PROPS,
} from '../store/LocationStore'
import Screen from './Screen'
import _ from 'lodash'
import {observable, when} from 'mobx'
import {IWocky} from 'wocky-client'
import {RText} from './common'
import {colors} from '../constants'

const Form = t.form.Form

// https://github.com/transistorsoft/react-native-background-fetch#methods
export const FetchResultChoices = {
  '0': 'NEW DATA',
  '1': 'NO DATA',
  '2': 'FAILED',
}

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
  fetchResult: t.enums(FetchResultChoices),
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
    fetchResult: {
      label: 'fetchResult (background fetch)',
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
  // @observable locations?: ObservableArray<any> = new ObservableArray<any>([])
  readonly locations = observable.array<object>([])
  @observable syncing: boolean = false

  componentWillMount() {
    when(() => this.props.wocky!.connected, this.getLocations)
  }

  getLocations = async (): Promise<void> => {
    if (this.syncing) return
    this.syncing = true
    try {
      const locations: object[] = await this.props.wocky!.getLocationsVisited()
      this.locations.replace(locations)
    } finally {
      this.syncing = false
    }
  }

  renderLocation = (l, index) => (
    <RText size={13} key={l.createdAt}>
      {`${index + 1}. ${moment(l.createdAt).calendar()}: ${l.lat}, ${l.lon}`}
    </RText>
  )

  render() {
    const {backgroundOptions, debugSounds, fetchResult} = this.props.locationStore!
    if (!backgroundOptions) return null
    let value = _.pick(backgroundOptions, BG_STATE_PROPS)
    value = _.assign(value, {debugSounds, fetchResult})
    const syncing = this.syncing || !this.props.wocky!.connected

    return (
      <Screen style={{flex: 1, paddingVertical: 20}}>
        <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
          <Form
            type={debuggerSettings}
            options={options}
            onChange={this.props.locationStore!.setBackgroundConfig}
            value={value}
          />
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
              <RText size={20}>{'Latest Locations'}</RText>
              <TouchableOpacity
                onPress={this.getLocations}
                style={{
                  backgroundColor: syncing ? colors.DARK_GREY : colors.PINK,
                  padding: 5,
                  borderRadius: 2,
                  marginLeft: 10,
                  width: 100,
                  alignItems: 'center',
                }}
              >
                <RText size={20} color={colors.WHITE}>
                  {syncing ? 'SYNCING' : 'SYNC'}
                </RText>
              </TouchableOpacity>
            </View>
            {this.locations.length ? this.locations.map(this.renderLocation) : null}
          </View>
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}
