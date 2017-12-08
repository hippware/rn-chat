// @flow

import React from 'react';
import {View, Image} from 'react-native';
import Map from './Map';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import NativeEnv from 'react-native-native-env';
import botStore from '../../store/botStore';
import * as log from '../../utils/log';
import AddressBar from './AddressBar';
import MapView from 'react-native-maps';
import geocodingStore from '../../store/geocodingStore';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {
  onSave: Function,
  edit: ?boolean,
};

@observer
class BotAddress extends React.Component<Props> {
  @observable mounted: boolean = false;
  zoom: number = 0;
  nextZoom: number = 0;
  lat1: number;
  long1: number;
  lat2: number;
  long2: number;
  input: any;
  map: any;

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 500); // temporary workaround for slow react-navigation transition with Mapbox view!
  }

  onBoundsDidChange = (bounds, zoom) => {
    if (this.lat1 === bounds[0] && this.long1 === bounds[1] && this.lat2 === bounds[2] && this.long2 === bounds[3] && this.zoom === zoom) {
      return;
    }
    if (zoom < 10) {
      return;
    }
    log.log('bounds:', bounds, zoom, {level: log.levels.VERBOSE});
    this.lat1 = bounds[0];
    this.long1 = bounds[1];
    this.lat2 = bounds[2];
    this.long2 = bounds[3];
    this.zoom = zoom;
  };

  onLocationChange = async (location) => {
    const data = await geocodingStore.reverse(location);
    botStore.changeBotLocation({...data, location, isCurrent: false});
  };

  render() {
    const {latitude, longitude} = botStore.bot.location;
    return (
      <View style={{flex: 1}}>
        {this.mounted && (
          <Map
            ref={r => (this.map = r)}
            showOnlyBot
            bot={botStore.bot}
            location={botStore.bot.location}
            fullMap
            followUser={false}
            showUser
            onBoundsDidChange={this.onBoundsDidChange}
            onPress={({nativeEvent}) => this.onLocationChange(nativeEvent.coordinate)}
            autoZoom={false}
            marker={
              <MapView.Marker.Animated centerOffset={{x: 0, y: -27}} coordinate={{latitude, longitude}}>
                <Image source={require('../../../images/newBotMarker.png')} />
              </MapView.Marker.Animated>
            }
            onRegionChange={this.addressBar.blur}
          />
        )}
        <AddressBar edit={this.props.edit} bot={botStore.bot} onSave={this.props.onSave} ref={r => (this.addressBar = r)} />
      </View>
    );
  }
}

export default BotAddress;
