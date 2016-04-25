import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'

class Conversations extends Component {
    render(){
        let list = this.props.list.map(conv=>{return {id:conv.username, displayName:conv.profile.displayName, desc:conv.lastMsg, priority:conv.unread > 0, from:conv.profile.handle, avatar:conv.profile.avatar, created:moment(conv.time).calendar()}});
        return <CardListView ref="list" name="list" {...this.props}
                             list={list} />
    }
}
export default connect(state=>{return {list:state.conversation.list}})(Conversations)