import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Screen from './Screen';
import ActionButton from './ActionButton';
import Chats from './Chats';
import location from '../store/location';
import model from '../model/model';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  scrollTo(params){
    this.refs.list.scrollTo(params);
  }

  render(){
    const isDay = location.isDay;
    const chats = model.chats.list;
    return <Screen isDay={isDay}>
      <Chats ref="list" chats={chats} {...this.props} style={{top:-10*k}}/>
      <ActionButton/>
    </Screen>;
  }
}
