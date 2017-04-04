import React from "react";
import {View, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/botStore';
import Bot from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/botFactory';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';

@autobind
@observer
export default class BotNote extends React.Component {
  @observable value;

  componentWillMount(){
      this.value = bot.bot.description;
  }


  render(){
    return <Screen>
      <TextInput style={{position:'absolute', top:72*k, left:15*k, right: 15*k, bottom:258*k, paddingTop:15*k, paddingLeft:20*k, paddingRight:20*k,
      backgroundColor:'white', color:'rgb(63,50,77)', fontFamily:'Roboto-Regular', fontSize:15*k}} multiline={true} autoFocus={true}
                 placeholder="Enter a note" placeholderTextColor='rgb(211,211,211)' maxLength={1000}
      value={this.value} onChangeText={value=>this.value = value }/>
      <NavTitle>{this.props.title  || 'Note'}</NavTitle>
      <SaveButton active={this.value.trim().length > 0} onSave={()=>this.props.onSave(this.value.trim())}/>
    </Screen>;
    
  }
}