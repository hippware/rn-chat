import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'

class Conversations extends Component {
    render(){
        let list = this.props.list.map(conv=>{return {id:conv.username, ...conv, desc:conv.lastMsg,
            priority:conv.unread > 0, created:moment(conv.time).calendar(),
            profile: this.props.profiles[conv.username]}});
        return <CardListView ref="list" name="list" {...this.props} onItemPress={item=>{Actions.conversation({item, title:item.displayName})}}
                             list={list} />
    }
}
export default connect(state=>{return {list:state.conversation.list, profiles:state.profiles.data}})(Conversations)