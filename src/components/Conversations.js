import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'
import {requestArchive} from '../actions/xmpp/message';

class Conversations extends Component {
    componentDidMount(){
        console.log("CONV PROPS",this.props.list);
        if (this.props.list.length == 0){
            // request message archive
            this.props.dispatch(requestArchive());
        }
    }

    scrollTo(params){
        this.refs.list.scrollTo(params);
    }

    render(){
        let list = this.props.list.map(conv=>{return {id:conv.username, desc:conv.lastMsg, priority:conv.unread, from:conv.handle, created:moment(conv.time).calendar()}});
        return <CardListView ref="list" name="list" {...this.props}
                             list={list} />
    }
}
export default connect(state=>{return {list:state.conversation.list}})(Conversations)