import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Screen from './Screen';
import ActionButton from './ActionButton';
export default class extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  scrollTo(params){
    this.refs.list.scrollTo(params);
  }


  render(){
    const isDay = this.props.model.isDay;
    const chats = this.props.model.chats.list;
    const Chats = this.props.Chats;
    const ChatCard = this.props.ChatCard;

    return <Screen isDay={this.props.model.isDay}
                   onLayout={event=>this.setState({height: event.nativeEvent.layout.height})}>
      <Chats ref="list" chats={chats} {...this.props} />
      {this.state.height && <ActionButton style={{right:22*k, bottom:-this.state.height+4*22*k}}/>}
    </Screen>;
  }
}
