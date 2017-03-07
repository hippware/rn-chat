import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, ListView, View, Text} from "react-native";
import BackgroundGradient from './BackgroundGradient';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';

@observer
export default class Screen extends Component {
  render(){
    return <View style={[{position:'absolute',top:0,left:0,right:0, bottom:0}, this.props.style]}>
      <BackgroundGradient isDay={location.isDay}/>
      <View style={[{flex:1}]}>
        {this.props.children}
      </View>
    
    </View>
    
  }
}

