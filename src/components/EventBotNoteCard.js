import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from './Global';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-native';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import EventBot from '../model/EventBot';
import Bot from '../model/Bot';
import {observer} from "mobx-react/native";
import location from '../store/location';
import statem from '../../gen/state';
import event from '../store/event';
import BotCardInner from './BotCardInner';
import BotAvatar from './BotAvatar';
import EventBotNote from '../model/EventBotNote';

@observer
export default class EventBotCard extends React.Component {
  onPress(){
    statem.home.botDetails({item: this.props.item.bot.id});
  }
  
  render(){
    const isDay = location.isDay;
    const eventBot: EventBotNote = this.props.item;
    const bot = eventBot.bot || {};
    
    return <View style={{paddingTop:15, paddingBottom:10}}>
      <View style={{paddingLeft:19*k, paddingRight:23*k, paddingBottom:12, flexDirection:'row' }}>
        <CardText isDay={isDay}>{`@${eventBot.target.handle}`} added a note to </CardText>
        <Text style={{fontFamily:'Roboto-Regular', fontSize:15, color:'rgb(112,176,225)'}}>{bot.title}</Text>
      </View>
      <View style={{height:1, backgroundColor:'rgb(228, 228, 228)'}}/>
      <View style={{flexDirection:'row', flex:1,paddingTop:14*k}}>
        <View style={{paddingLeft:15*k,paddingRight:10*k}}><BotAvatar size={50} bot={bot} tappable={false}/></View>
        <View style={{flex:1, paddingRight:20*k}}>
          <Text style={{fontFamily:'Roboto-Regular',color:isDay ? 'rgb(63,50,77)' : 'white',fontSize:15}}>{eventBot.note.content}</Text>
        </View>
      </View>
    </View>;
  }
}

