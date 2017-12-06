// @flow

import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {observable, autorun, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import botStore from '../../store/botStore';
import {colors} from '../../constants/index';
import * as log from '../../utils/log';
import AddressBar from './AddressBar';
import geocodingStore from '../../store/geocodingStore';
import {Actions} from 'react-native-router-flux';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

@observer
class BotAddress extends React.Component<{}> {
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

  changeLocation = ({isPlace, isCurrent, placeName, location, address, meta}) => {
    botStore.bot.location = location;
    botStore.bot.isCurrent = isCurrent;
    botStore.bot.address = address;
    botStore.bot.addressData.load(meta);
    botStore.bot.title = isPlace ? placeName : '';
    Actions.botCompose({isFirstScreen: false});
  };

  onMapPress = async (location) => {
    const data = await geocodingStore.reverse(location);
    this.changeLocation(data);
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
            onBoundsDidChange={this.onBoundsDidChange}
            onPress={({nativeEvent}) => this.onMapPress(nativeEvent.coordinate)}
          />
        )}
        <AddressBar bot={botStore.bot} onChangeLocation={this.changeLocation} />
      </View>
    );
  }
}

export default BotAddress;
