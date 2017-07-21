import React from 'react';
import {View, Text, Clipboard, StyleSheet} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Map from './Map';
import {k, width, height} from './Global';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import location from '../store/locationStore';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import autobind from 'autobind-decorator';
import {colors} from '../constants';
import * as log from '../utils/log';
import {Actions} from 'react-native-router-flux';
import ButtonWithPopover from './ButtonWithPopover';
import BotNavBarMixin from './BotNavBarMixin';

@autobind
@observer
export default class extends BotNavBarMixin(React.Component) {
  @observable mounted = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 300); // temporary workaround for slow react-navigation transition with Mapbox view!
  }

  onBoundsDidChange(bounds, zoomLevel) {
    const bot = botFactory.create({id: this.props.item});
    if (
      !(location.location.latitude >= bounds[0] && location.location.latitude <= bounds[2] && location.location.longitude >= bounds[1] && location.location.longitude <= bounds[3])
    ) {
      const deltaLat = bot.location.latitude - location.location.latitude;
      const deltaLong = bot.location.longitude - location.location.longitude;

      const latMin = Math.min(location.location.latitude - deltaLat, location.location.latitude + deltaLat);
      const latMax = Math.max(location.location.latitude - deltaLat, location.location.latitude + deltaLat);
      const longMin = Math.min(location.location.longitude - deltaLong, location.location.longitude + deltaLong);
      const longMax = Math.max(location.location.longitude - deltaLong, location.location.longitude + deltaLong);
      log.log(
        'OUT OF BOUNDS!',
        bounds,
        JSON.stringify(location.location),
        location.location.latitude >= bounds[0],
        location.location.latitude <= bounds[2],
        location.location.longitude >= bounds[1],
        location.location.longitude <= bounds[3],
        deltaLat,
        deltaLong,
        latMin,
        longMin,
        latMax,
        longMax,
        {level: log.levels.ERROR},
      );
      // prettier-ignore
      this._map.setVisibleCoordinateBounds(latMin, longMin, latMax, longMax, 0, 0, 0, 0, true);
    }
  }

  render() {
    const bot = botFactory.create({id: this.props.item});
    if (!location.location || !bot.location) {
      log.log('NULL LOCATION!', {level: log.levels.ERROR});
      return <Screen />;
    }
    return (
      <Screen>
        {this.mounted &&
          <Map
            ref={(map) => {
              this._map = map;
            }}
            bot={bot}
            showOnlyBot
            followUser={false}
            location={bot.location}
            fullMap
            showUser
          />}
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  address: {textAlign: 'center', fontFamily: 'Roboto-Light', fontSize: 14, color: colors.DARK_PURPLE},
});