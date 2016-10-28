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
        <View style={{flexDirection:'row', flex:1}}>
          <View style={{paddingLeft:15*k,paddingRight:10*k}}><BotAvatar bot={bot} tappable={false}/></View>
          <View style={{flex:1, paddingRight:20*k}}>
            <Text numberOfLines={1} style={{flex:1, fontFamily:'Roboto-Regular',color:isDay ? 'rgb(63,50,77)' : 'white',fontSize:15}}>{bot.title}</Text>
            <Text numberOfLines={1} style={styles.smallText}>{bot.address}</Text>
            <View style={{flexDirection:'row', paddingTop:15*k, alignItems:'center'}}>
              <Image style={{width:16*k, height:16*k}}source={require('../../images/iconMembers.png')}/>
              <Text style={{paddingLeft:5*k, paddingRight:10*k, fontSize:12,color:'rgb(155,155,155)',fontFamily:'Roboto-Regular'}}>{bot.followersSize}</Text>
              <View style={{width:1*k, height:10*k, backgroundColor:'rgb(155,155,155)'}}></View>
              <View style={{paddingLeft:10*k}}><Image style={{width:18*k, height:16*k}}source={require('../../images/iconImg.png')}/></View>
              <Text style={{paddingLeft:10*k, paddingRight:10*k, fontSize:12,color:'rgb(155,155,155)',fontFamily:'Roboto-Regular'}}>{bot.imagesCount}</Text>
            </View>
          </View>
        </View>
      </Card>
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

