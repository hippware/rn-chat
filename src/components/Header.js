import React from "react";
import {StyleSheet,View,TouchableHighlight,Text} from 'react-native';
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';
import location from '../store/locationStore';
import {observer} from "mobx-react/native";

@observer
export default class Header extends React.Component {
  render(){
    const isDay = location.isDay;
    console.log("HEADER LOCATION", isDay, navBarTextColorDay);
    return <View style={{padding: 15*k}}>
        <Text style={{fontFamily:'Roboto-Medium', flex:1, fontSize:16,color:isDay ? navBarTextColorDay : navBarTextColorNight }}>{this.props.children}</Text>
    </View>
  }
}
