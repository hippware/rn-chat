// @flow

import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {observable, autorun, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import botStore from '../../store/botStore';
import AddressHelper from '../../model/AddressHelper';
import {colors} from '../../constants/index';
import * as log from '../../utils/log';
import AddressBar from './AddressBar';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

@observer
class BotAddress extends React.Component<{}> {
  @observable mounted: boolean = false;
  handler: ?Function;
  zoom: number = 0;
  nextZoom: number = 0;
  lat1: number;
  long1: number;
  lat2: number;
  long2: number;
  input: any;
  map: any;

  componentWillMount() {
    botStore.addressSearchEnabled = true;
    when(
      () => botStore.bot && botStore.bot.location,
      () => {
        botStore.addressHelper = new AddressHelper(botStore.bot.location);
      },
    );

    this.handler = autorun(() => {
      if (botStore.bot && botStore.bot.location && this.map) {
        const {latitude, longitude} = botStore.bot.location;
        this.map.setCenterCoordinate(latitude, longitude);
        botStore.reverseGeoCode({latitude, longitude});
      }
    });
  }
  componentWillUnmount() {
    this.handler && this.handler();
  }
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

  render() {
    if (!botStore.addressHelper) {
      return null;
    }
    const {location} = botStore.addressHelper;
    return (
      <View style={{flex: 1}}>
        {this.mounted && (
          <Map
            ref={r => (this.map = r)}
            showOnlyBot
            bot={botStore.bot}
            fullMap
            followUser={false}
            showUser
            location={location}
            onBoundsDidChange={this.onBoundsDidChange}
            onPress={({nativeEvent}) => botStore.redirectToLocation(nativeEvent.coordinate)}
          />
        )}
        <AddressBar />
      </View>
    );
  }
}

export default BotAddress;
