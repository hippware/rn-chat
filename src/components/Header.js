import React from "react";
import {StyleSheet,View,TouchableHighlight,Text} from 'react-native';
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';

export default class Header extends React.Component {
  render(){
    return <View style={{padding: 15*k, flex:1}}>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:16,color:this.props.isDay ? navBarTextColorDay : navBarTextColorNight }}>{this.props.children}</Text>
    </View>
  }
}
