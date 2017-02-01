import React from "react";
import {StyleSheet,View,TouchableHighlight,Text} from 'react-native';
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';
import location from '../store/location';

export default class Header extends React.Component {
  render(){
    return <View style={{padding: 15*k, flex:1}}>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:16,color:location.isDay ? navBarTextColorDay : navBarTextColorNight }}>{this.props.children}</Text>
    </View>
  }
}
