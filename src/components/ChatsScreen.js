import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Chats from './Chats';
import Screen from './Screen';
export default class extends Component {
    scrollTo(params){
        this.refs.list.scrollTo(params);
    }


    render(){
        const isDay = this.props.model.isDay;
        const chats = this.props.model.chats.list;

        return <Screen isDay={this.props.model.isDay}>
            <Chats ref="list" chats={chats} isDay={isDay}/>
        </Screen>;
    }
}
