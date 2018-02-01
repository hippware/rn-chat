// @flow

import React from 'react';
import {View, Image, InteractionManager} from 'react-native';
import Map from './Map';
import {observer, inject} from 'mobx-react/native';
import {observable, reaction} from 'mobx';
import * as log from '../../utils/log';
import AddressBar from './AddressBar';
import MapView from 'react-native-maps';
import {k, width, height} from '../Global';
import CurrentLocationIndicator from './CurrentLocationIndicator';

type Props = {
  onSave: Function,
  edit: ?boolean,
  bot: any,
};

@inject('wocky', 'locationStore')
@observer
class BotAddress extends React.Component<Props> {
  @observable mounted: boolean = false;
  @observable blurEnabled: boolean = false;
  @observable location;
  mapReady: boolean = false;
  map: any;

  componentWillMount() {
    console.log('cwm', this.props);
  }

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 500); // temporary workaround for slow react-navigation transition with Mapbox view!
    setTimeout(() => (this.blurEnabled = true), 2000); // on slower phones map jumps around a bit while it loads
    // reaction(
    //   () => this.location,
    //   async (location) => {
    //     const data = await geocodingStore.reverse(location);
    //     botStore.changeBotLocation({...data, location, isCurrent: false});
    //   },
    //   {delay: 500},
    // );
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
    const {locationStore, wocky, bot} = this.props;
    console.log('props', bot.toJSON());
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
        <AddressBar edit={this.props.edit} bot={wocky.bot} onSave={this.props.onSave} ref={r => (this.addressBar = r)} />
        <CurrentLocationIndicator onPress={this.onCurrent} />
      </View>
    );
  }
}

export default BotAddress;
