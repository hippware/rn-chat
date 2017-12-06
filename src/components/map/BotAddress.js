// @flow

import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import NativeEnv from 'react-native-native-env';
import botStore from '../../store/botStore';
import * as log from '../../utils/log';
import AddressBar from './AddressBar';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {
  onChangeBotLocation?: Function,
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

  onLocationChange = (data) => {
    if (this.props.onChangeBotLocation) {
      botStore.bot.isCurrent = false;
      this.props.onChangeBotLocation(data);
    }
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
            onPress={({nativeEvent}) => this.onLocationChange(nativeEvent.coordinate)}
            autoZoom={false}
          />
        )}
        <AddressBar bot={botStore.bot} />
      </View>
    );
  }
}

export default BotAddress;
