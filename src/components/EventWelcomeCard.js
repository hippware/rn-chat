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
import EventMessage from '../model/EventMessage';
import Message from '../model/Message';
import {observer} from "mobx-react/native";
import location from '../store/location';
import statem from '../../gen/state';
import message from '../store/message';
import friend from '../store/friend';
import autobind from 'autobind-decorator';

@observer
@autobind
export default class EventWelcomeCard extends React.Component {
  render(){
    const isDay = location.isDay;
    return <View style={{paddingTop:10}}>
      <View style={{paddingLeft:19*k, paddingBottom: 10, paddingRight:23*k,flexDirection:'row' }}>
        <CardText style={{fontFamily: 'Roboto-Medium'}} isDay={isDay}>@tinyrobot</CardText>
        <CardText isDay={isDay}> Welcome to TinyRobot!</CardText>
      </View>
      <View style={{height:1, backgroundColor:'rgb(228, 228, 228)'}}/>
      <View style={{paddingTop:10, paddingBottom: 10, paddingLeft:19*k, paddingRight:23*k,flexDirection:'row' }}>
        <View style={{flex:1,justifyContent:'center'}}>
        <CardText isDay={isDay}>Here you'll find everything you need to know about your friends' bots and bots you'll subscribe to!</CardText>
          <CardText style={{paddingTop:10}} isDay={isDay}>Tap <View style={{ paddingTop:15,width:28, height:30}}><Image style={{width:28, height:30}} source={require('../../images/actionMenu.png')}/></View> to create your first bot</CardText>
          <CardText style={{paddingTop:10}} isDay={isDay}>Tap <View style={{ paddingTop:15,width:24, height:22}}><Image style={{width:24, height:22}} source={require('../../images/iconMessage.png')}/></View> to send messages to friends</CardText>
          <CardText style={{paddingTop:10}} isDay={isDay}>Have fun! :)</CardText>
        </View>
      </View>
      <View style={{position:'absolute',right:0,bottom:0,height:15,width:15}}><Image source={require("../../images/iconNewPriority.png")}/></View>
    </View>;
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontFamily:'Roboto-Regular',
    fontSize:12,
    color:'rgb(155,155,155)'
  }
  
});

