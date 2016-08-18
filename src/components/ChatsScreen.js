import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text, StyleSheet} from "react-native";
import {Actions} from 'react-native-router-native';
import {k} from './Global';
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
    const number = model.chats.unread;
    return <Screen isDay={isDay}>
      <Chats ref="list" chats={chats} {...this.props} contentContainerStyle={{marginTop:number? 47 : 0}}/>
      <ActionButton/>
      {!! number && <View style={styles.button}><Text style={{fontFamily:'Roboto-Italic', color:'white'}}>{number} New Message{number > 1 ? 's' :''}</Text></View>}
    </Screen>;
  }
}


const styles = StyleSheet.create({
  button: {
    position:'absolute',
    right: 0, left: 0, alignItems: 'center', justifyContent: 'center',
    top: 70, height: 47, backgroundColor: 'rgba(254,92,108, 0.9)',
  }
});
