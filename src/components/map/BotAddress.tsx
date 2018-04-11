// @flow

import React from 'react'
import {View, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, reaction} from 'mobx'
import AddressBar from './AddressBar'
import MapView from 'react-native-maps'
import {k} from '../Global'
import CurrentLocationIndicator from './CurrentLocationIndicator'
import Geofence from './Geofence'
import {isAlive} from 'mobx-state-tree'
import {DELTA_FULL_MAP, DELTA_GEOFENCE} from './Map'
import mapStyle from './mapStyle'
import CurrentLocationMarker from './CurrentLocationMarker'
import {IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'

type Props = {
  edit?: boolean
  bot: IBot
  locationStore?: ILocationStore
  geocodingStore?: any
}

@inject('locationStore', 'geocodingStore')
@observer
class BotAddress extends React.Component<Props> {
  @observable mounted: boolean = false
  @observable blurEnabled: boolean = false
  @observable location: any
  mapReady: boolean = false
  _map: any
  addressBar: any

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 500) // temporary workaround for slow react-navigation transition with Mapbox view!
    setTimeout(() => (this.blurEnabled = true), 2000) // on slower phones map jumps around a bit while it loads
    reaction(
      () => this.location,
      async location => {
        const data = await this.props.geocodingStore.reverse(location)
        const {bot} = this.props
        if (!bot.title && data && data.isPlace) {
          data.title = data.placeName
        }
        if (data) {
          bot.load({addressData: data.meta, address: data.address})
        }
        const {latitude, longitude} = location
        bot.location!.load({latitude, longitude, isCurrent: false})
      },
      {delay: 500}
    )
  }

  onLocationChange = async location => {
    if (this.mapReady) {
      this.location = location
    }
  }

  onCurrent = async () => {
    this._map.animateToCoordinate(this.props.locationStore!.location)
  }

  onRegionChange = () => {
    if (this.blurEnabled) this.addressBar.blur()
  }

  render() {
    const {bot} = this.props
    if (!bot || !isAlive(bot)) return null
    const {latitude, longitude} = bot.location!
    const coords = this.location || bot.location
    const delta = bot.geofence ? DELTA_GEOFENCE : DELTA_FULL_MAP
    return (
      <View style={{flex: 1}}>
        {this.mounted && (
          <MapView
            provider={'google'}
            customMapStyle={mapStyle}
            ref={map => {
              this._map = map
            }}
            onMapReady={() => (this.mapReady = true)}
            autoZoom={false}
            style={{position: 'absolute', top: 44 * k, bottom: 0, left: 0, right: 0}}
            onPress={({nativeEvent}) => {
              this._map.animateToCoordinate(nativeEvent.coordinate)
              if (this.blurEnabled) this.addressBar.blur()
            }}
            onRegionChange={this.onRegionChange} /*tslint:disable-line*/
            onRegionChangeComplete={this.onLocationChange}
            initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          >
            <CurrentLocationMarker />
            {bot.geofence &&
              coords && (
                <Geofence coords={{...coords}} key={`${coords.latitude}-${coords.longitude}`} />
              )}
            <View
              pointerEvents="none"
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Image source={require('../../../images/newBotMarker.png')} />
            </View>
          </MapView>
        )}
        <AddressBar
          edit={this.props.edit}
          bot={this.props.bot}
          ref={r => (this.addressBar = r && r.wrappedInstance)}
        />
        <CurrentLocationIndicator onPress={this.onCurrent} />
      </View>
    )
  }
}

export default BotAddress
