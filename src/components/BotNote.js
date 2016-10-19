import React from "react";
import {View, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/bot';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';

@autobind
@observer
export default class BotNote extends React.Component {
  @observable bot: Bot;
  
  componentWillMount(){
    this.bot = bot.bot ? new Bot({...bot.bot}) : botFactory.createNote();
  }
  
  
  render(){
    return <Screen>
      <TextInput style={{position:'absolute', top:72*k, left:15*k, right: 15*k, bottom:258*k, paddingTop:15*k, paddingLeft:20*k, paddingRight:20*k,
      backgroundColor:'white', color:'rgb(63,50,77)', fontFamily:'Roboto-Regular', fontSize:15*k}} multiline={true} autoFocus={true}
                 placeholder="Enter a note" placeholderTextColor='rgb(211,211,211)' maxLength={1000}
      value={this.bot.description} onChangeText={value=>this.bot.description = value.trim()}/>
      <NavTitle>{this.props.title  || 'Note'}</NavTitle>
      <SaveButton active={this.bot.description.trim().length > 0} onSave={()=>this.props.onSave(this.bot)}/>
    </Screen>;
    
  }
}