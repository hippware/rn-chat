import React, {Component} from "react";
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';

export default class AddFriendByUsername extends Component {
  static onRight({friend, text}){
    friend.addByHandle(text).then(()=>{Actions.pop();Actions.pop()}).catch(e=>alert(e));
  }
  render(){
    return <Screen isDay={this.props.model.isDay}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:53*k, backgroundColor:'white'}}>
        <View style={{paddingLeft:22.6*k, paddingRight:14.8*k}}><Image source={require('../../images/iconSearchHome.png')}/></View>
        <TextInput autoFocus autoCorrect={false} autoCapitalize='none' onChangeText={(text) => Actions.refresh({text})}
                   value={this.props.text} placeholder='Enter username' placeholderColor='rgb(211,211,211)'
                   style={{fontSize:15*k, fontFamily:'Roboto-Light', height:53*k, flex:1}}/>
        <TouchableOpacity onPress={()=>Actions.refresh({text:''})}>
          <View style={{paddingRight:22.6*k, paddingLeft:14.8*k}}>
            <Image source={require('../../images/iconClose.png')}/>
          </View>
        </TouchableOpacity>
      </View>

    </Screen>;
  }
}

AddFriendByUsername.propTypes = {
  model: React.PropTypes.any.isRequired,
};