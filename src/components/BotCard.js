import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
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
    console.log("BOTCARD", JSON.stringify(bot));
    return (
      <Card style={[this.props.style]}
            isDay={isDay}
            onPress={()=>this.props.onPress(chat)}
            innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}>
        <Text style={{padding:15*k}}>
          <Text style={{fontFamily:'Roboto-Light',color:isDay ? 'rgb(81,67,96)' : 'white',fontSize:15}}>{bot.title}
          </Text>
        </Text>
        <View style={{flexDirection:'row', alignItems:'center', paddingLeft:15*k, paddingRight:15*k, paddingTop: 10}} >
          <Image source={require("../../images/iconLocation.png")}/>
          <Text style={styles.smallText}> {this.props.item.address}</Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontFamily:'Roboto-Regular',
    fontSize:12,
    color:'rgb(155,155,155)'
  }
  
});

