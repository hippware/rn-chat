// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Map from './Map';
import location from '../store/locationStore';
import * as log from '../utils/log';
import BotNavBarMixin from './BotNavBarMixin';

// temporary workaround for https://github.com/hippware/rn-chat/issues/1024
// class BotMap extends BotNavBarMixin(React.Component) {
class BotMap extends React.Component {
  @observable mounted = false;
  _map: ?Object;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => (this.mounted = true), 300); // temporary workaround for slow react-navigation transition with Mapbox view!
  }

  onBoundsDidChange = (bounds) => {
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
      this._map.setVisibleCoordinateBounds(latMin, longMin, latMax, longMax, 0, 0, 0, 0, true);
    }
  };

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

export default observer(BotMap);
