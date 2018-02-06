// @flow

import React from 'react';
import {View, Image} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable, reaction} from 'mobx';
import AddressBar from './AddressBar';
import MapView from 'react-native-maps';
import {k} from '../Global';
import CurrentLocationIndicator from './CurrentLocationIndicator';

type Props = {
  edit?: boolean,
  bot: Bot,
};

@inject('locationStore', 'geocodingStore')
@observer
class BotAddress extends React.Component<Props> {
  @observable mounted: boolean = false;
  @observable blurEnabled: boolean = false;
  @observable location: any;
  mapReady: boolean = false;
  map: any;

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 500); // temporary workaround for slow react-navigation transition with Mapbox view!
    setTimeout(() => (this.blurEnabled = true), 2000); // on slower phones map jumps around a bit while it loads
    reaction(
      () => this.location,
      async (location) => {
        const data = await this.props.geocodingStore.reverse(location);
        this.props.bot.load({...data, location, isCurrent: false});
      },
      {delay: 500},
    );
  }

  onLocationChange = async (location) => {
    if (this.mapReady) {
      this.location = location;
    }
  };

  onCurrent = async () => {
    this._map.animateToCoordinate(this.props.locationStore.location);
  };

  render() {
    const {locationStore, bot} = this.props;
    const currentLoc = locationStore ? locationStore.location : {};
    const {latitude, longitude} = bot.location || {};
    return (
      <View style={{flex: 1}}>
        {this.mounted && (
          <MapView
            ref={(map) => {
              this._map = map;
            }}
            onMapReady={() => (this.mapReady = true)}
            autoZoom={false}
            style={{position: 'absolute', top: 44 * k, bottom: 0, left: 0, right: 0}}
            onPress={({nativeEvent}) => {
              this._map.animateToCoordinate(nativeEvent.coordinate);
              this.blurEnabled && this.addressBar.blur();
            }}
            onRegionChange={this.blurEnabled ? this.addressBar.blur : () => {}}
            onRegionChangeComplete={this.onLocationChange}
            initialRegion={{latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04}}
          >
            {currentLoc && (
              <MapView.Marker pointerEvents='none' style={{zIndex: 1}} coordinate={currentLoc}>
                <View style={{transform: currentLoc.heading ? [{rotate: `${360 + currentLoc.heading} deg`}] : []}}>
                  <Image source={require('../../../images/location-indicator.png')} />
                </View>
              </MapView.Marker>
            )}
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../../images/newBotMarker.png')} />
            </View>
          </MapView>
        )}
        <AddressBar edit={this.props.edit} bot={this.props.bot} ref={r => (this.addressBar = r && r.wrappedInstance)} />
        <CurrentLocationIndicator onPress={this.onCurrent} />
      </View>
    );
  }
}

export default BotAddress;
