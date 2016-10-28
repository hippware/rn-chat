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

@autobind
@observer
export default class extends React.Component {
  componentWillMount(){
    if (!this.props.item && !botStore.bot){
      console.error("Bot ID is not defined");
    }
    if (this.props.item){
      botStore.bot = botFactory.create({id: this.props.item});
    }
  }
  
  render(){
    const bot = botStore.bot;
    return <Screen>
      <Map followUser={false} location={bot.location} fullMap={true}>
        <Annotation id="bot"  style={{alignItems:'center', justifyContent:'center'}} coordinate={{latitude: bot.location.latitude,  longitude: bot.location.longitude}}>
          <Image source={require('../../images/location-indicator.png')}/>
        </Annotation>
      </Map>
    </Screen>
  }
  
  
}