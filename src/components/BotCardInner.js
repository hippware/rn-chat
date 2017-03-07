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
import location from '../store/locationStore';

@observer
export default class BotCardInner extends React.Component {
  render(){
    const isDay = location.isDay;
    const bot: Bot = this.props.item;
    return (
        <View style={[{flexDirection:'row', flex:1}, this.props.style]}>
          <View style={{paddingLeft:15*k,paddingRight:10*k}}><BotAvatar size={this.props.avatarSize || 40 } bot={bot} tappable={false}/></View>
          <View style={{flex:1, paddingRight:20*k}}>
            <Text numberOfLines={1} style={{flex:1, borderWidth:1, borderColor:'transparent',fontFamily:'Roboto-Regular',color:isDay ? 'rgb(63,50,77)' : 'white',fontSize:15}}>{bot.title}</Text>
            <Text numberOfLines={1} style={styles.smallText}>{bot.address}</Text>
            <View style={{flexDirection:'row', paddingTop:10*k, alignItems:'center'}}>
              <Image style={{width:16*k, height:16*k}}source={require('../../images/iconMembers.png')}/>
              <Text style={{paddingLeft:5*k, paddingRight:10*k, fontSize:12,color:'rgb(155,155,155)',fontFamily:'Roboto-Regular'}}>{bot.followersSize}</Text>
              <View style={{width:1*k, height:10*k, backgroundColor:'rgb(155,155,155)'}}></View>
              <View style={{paddingLeft:10*k}}><Image style={{width:18*k, height:16*k}}source={require('../../images/iconImg.png')}/></View>
              <Text style={{paddingLeft:10*k, paddingRight:10*k, fontSize:12,color:'rgb(155,155,155)',fontFamily:'Roboto-Regular'}}>{bot.imagesCount}</Text>
            </View>
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  smallText: {
    flex:1,
    fontFamily:'Roboto-Regular',
    fontSize:12,
    color:'rgb(155,155,155)'
  }
  
});

