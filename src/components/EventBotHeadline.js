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

@observer
export default class EventBotHeadline extends React.Component {
  onPress(){
    statem.home.botDetails({item: this.props.item.bot.id});
  }
  
  render(){
    const isDay = location.isDay;
    const eventBot: EventBot = this.props.item;
    const bot = eventBot.bot || {};
    
    return <View style={{paddingTop:10}}>
      <View style={{height:1, backgroundColor:'rgb(228, 228, 228)'}}/>
      <View style={{flexDirection:'row', flex:1,paddingTop:14*k}}>
        <View style={{paddingLeft:15*k,paddingRight:10*k}}><BotAvatar size={50} bot={bot} tappable={false}/></View>
        <View style={{flex:1, paddingRight:20*k}}>
          <Text numberOfLines={1} style={{fontFamily:'Roboto-Medium',color:isDay ? 'rgb(63,50,77)' : 'white',fontSize:15}}>{bot.title}</Text>
          <Text numberOfLines={1} style={{fontFamily:'Roboto-Regular',fontSize:13, color:isDay ? 'rgb(63,50,77)' : 'white'}}>{bot.address}</Text>
          {bot.owner && bot.owner.handle && <View style={{flexDirection:'row'}}><Text numberOfLines={1} style={{fontFamily:'Roboto-Regular',fontSize:13, color:isDay ? 'rgb(63,50,77)' : 'white'}}>Bot created by </Text>
            <TouchableOpacity onPress={()=>statem.logged.profileDetailsContainer({parent:'_home', item: bot.owner.user})}><Text style={{fontFamily:'Roboto-Regular', fontSize:13, color:'rgb(112,176,225)'}}>@{bot.owner.handle}</Text></TouchableOpacity>
        </View>}
        </View>
      </View>
    </View>;
  }
}

