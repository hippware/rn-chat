import React, {Component} from "react";
import {AppRegistry, View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';

class MenuItem extends React.Component {
  render(){
    return <TouchableOpacity style={{paddingTop:25}} onPress={this.props.onPress || (()=>{
      Actions.get('drawer').ref.close({side:'right', animated:false});
      this.props.action && this.props.action()
    })
    } testID={this.props.testID}>
      <Image source={this.props.image} />
      <Text style={{fontSize:12, fontFamily:'Roboto-Medium',letterSpacing:0.5, textAlign:'center', color: 'white'}}>
        {this.props.title}
        </Text>
  </TouchableOpacity>;
  }
}

export default class RightSideMenu extends Component {
  render(){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgb(254,92,108)', paddingTop:36*k, padding:25*k, width:120*k}}>
      <Text style={{top:36*k, position:'absolute', fontFamily:'Roboto-Bold', fontSize:15, color: 'white', textAlign: 'center'}}>CREATE NEW</Text>
      <MenuItem image={require('../../images/newMessage.png')} testID="newMessage" action={()=>statem.logged.createMessageContainer()} title="MESSAGE"/>
      <MenuItem image={require('../../images/newBot.png')} testID="newBot" title="BOT" onPress={()=>Actions.get('botMenu').ref.toggle({side:'right', animated:true})}/>
    </View>;
  }
}
