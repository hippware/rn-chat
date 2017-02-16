import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/bot';
import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import GradientHeader from './GradientHeader';
import {k, width, height} from './Global';
import BotAvatar from './BotAvatar';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import botStore from '../store/bot';
import location from '../store/location';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import ActionButton from './ActionButton';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import BotNavBar from './BotNavBar';

@autobind
@observer
export default class extends React.Component {
  componentWillMount(){
    if (!this.props.item && !botStore.bot){
      botStore.bot = botFactory.create({id: '789daa44-e9a6-11e6-b22b-0e2ac49618c7', server:'staging.dev.tinyrobot.com'});
    }
    if (this.props.item){
      botStore.bot = botFactory.create({id: this.props.item});
    }
  }
  
  onBoundsDidChange(bounds, zoomLevel) {
    const bot = botStore.bot;
    if (!(location.location.latitude>=bounds[0] && location.location.latitude<=bounds[2] &&
      location.location.longitude>=bounds[1] && location.location.longitude<=bounds[3])){
      const deltaLat = bot.location.latitude - location.location.latitude;
      const deltaLong = bot.location.longitude - location.location.longitude;
      
      const latMin = Math.min(location.location.latitude-deltaLat, location.location.latitude+deltaLat);
      const latMax = Math.max(location.location.latitude-deltaLat, location.location.latitude+deltaLat);
      const longMin = Math.min(location.location.longitude-deltaLong, location.location.longitude+deltaLong);
      const longMax = Math.max(location.location.longitude-deltaLong, location.location.longitude+deltaLong);
      console.log("OUT OF BOUNDS!", bounds, JSON.stringify(location.location), location.location.latitude>=bounds[0],
        location.location.latitude<=bounds[2],
        location.location.longitude>=bounds[1],
        location.location.longitude<=bounds[3], deltaLat, deltaLong, latMin, longMin, latMax, longMax);
      this._map.setVisibleCoordinateBounds(latMin, longMin, latMax, longMax, 0, 0, 0, 0, true);
    }
  }
  
  render(){
    const bot = botStore.bot;
    if (!location.location || !bot.location){
      console.log("NULL LOCATION!");
      return <Screen/>;
    }
    return <Screen>
      <Map ref={map => { this._map = map; }} bot={bot} showOnlyBot followUser={false} location={bot.location} fullMap={true} showUser={true} />
      <BotNavBar bot={bot} fullMap/>
    </Screen>
  }
  
  
}