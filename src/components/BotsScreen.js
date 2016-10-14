import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text, StyleSheet} from "react-native";
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import ActionButton from './ActionButton';
import Bots from './Bots';
import location from '../store/location';
import model from '../model/model';
import {observer} from "mobx-react/native";

@observer
export default class extends Component {
  
  render(){
    const bots = model.ownBots.list;
    const isDay = location.isDay;
    return <Screen isDay={isDay}>
      <Bots ref="list" bots={bots} />
      <ActionButton/>
    </Screen>;
  }
}


