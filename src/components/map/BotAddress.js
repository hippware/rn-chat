// @flow

import React from 'react';
import {View, Image, InteractionManager} from 'react-native';
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
import {width, height, k} from '../Global';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {
  onSave: Function,
  edit: ?boolean,
};

type RegionProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

@observer
class BotAddress extends React.Component<Props> {
  @observable mounted: boolean = false;
  @observable blurEnabled: boolean = false;
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
    setTimeout(() => (this.blurEnabled = true), 2000); // on slower phones map jumps around a bit while it loads
  }

  onLocationChange = async (location) => {
    const data = await geocodingStore.reverse(location);
    botStore.changeBotLocation({...data, location, isCurrent: false});
  };

  onRegionDidChange = async ({latitude, longitude}) => {
    this.onLocationChange({latitude, longitude});
  };

  render() {
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
            uberPanning
            autoZoom={false}
            onRegionChange={this.blurEnabled ? this.addressBar.blur : () => {}}
            onRegionChangeComplete={this.onRegionDidChange}
          />
        )}
        <View style={{position: 'absolute', width, height: height - (110 * k)}} pointerEvents='none'>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../images/newBotMarker.png')} />
          </View>
        </View>
        <AddressBar edit={this.props.edit} bot={botStore.bot} onSave={this.props.onSave} ref={r => (this.addressBar = r)} />
      </View>
    );
  }
}

export default BotAddress;
