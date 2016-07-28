import React, {Component} from "react";
import {View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class RightSideBotMenu extends Component {
  render(){
    return <View style={{flex:1, backgroundColor:'rgb(235,85,100)'}}>
      <Text style={{fontFamily:'Roboto-Bold', fontSize:15*k, color: 'white', textAlign: 'center'}}>CREATE NEW</Text>
      <Button onPress={()=>{alert('Pressed');Actions.refresh({key: 'rightBotMenu', open: value=>!value})}}>Text</Button>
    </View>;
  }
}