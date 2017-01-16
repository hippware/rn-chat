import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Card from './Card';
import CardText from './CardText';
import BotAvatar from './BotAvatar';
import {k} from './Global';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-native';
import Profile from '../model/Profile';
import Bot from '../model/Bot';
import {observer} from "mobx-react/native";
import location from '../store/location';
import BotCardInner from './BotCardInner';

@observer
export default class BotCard extends React.Component {
  render(){
    const isDay = location.isDay;
    const bot: Bot = this.props.item;
    return (
      <Card style={[this.props.style]}
            isDay={isDay}
            onPress={()=>this.props.onPress(bot)}
            innerStyle={{paddingTop:10*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}>
        <BotCardInner {...this.props}/>
      </Card>
    );
  }
}

