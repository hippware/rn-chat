import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, TouchableOpacity, Image, View} from "react-native";
import statem from '../../gen/state';
import assert from 'assert';
import location from '../store/location';
import model from '../model/model';
export default class NavBarMessageButton extends Component {
  render(){
    const number = model.chats.unread;
    const source = number ? require('../../images/newMessages.png') : location.isDay ? require('../../images/iconMessage.png') : require('../../images/iconMessageNight.png');
    return <TouchableOpacity testID="rightNavButton"
                             onPress={statem.cubeBar.chatsContainer}
                             style={[this.props.style, {width:60,justifyContent:'center',alignItems:'center'}]}>
      <Image source={source}/>
      {!!number && <View style={{position:'absolute', top:8, right:16, width:13, height:13, justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontFamily:'Roboto-Regular', color:'white', backgroundColor:'transparent', fontSize:number>9 ? 11 : 12, lineHeight: 13}} numberOfLines={1}>{number}</Text></View>}
    </TouchableOpacity>
  }
}
