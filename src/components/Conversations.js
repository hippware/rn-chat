import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'
import {processProfileRequest} from '../actions/xmpp/profile';

class Conversations extends Component {
    constructor(props) {
        super(props);
        this.state = {list:[]};
    }

    componentWillReceiveProps(props){
        let list = [];
        for (let user of props.conversation.list) {
            let node = 'user/' + user;
            if (!props.data[node]) {
                if (props.xmpp.connected) {
                    props.dispatch(processProfileRequest(node));
                }
            } else {
                if (!props.data[node].pending){
                    let conv = {...props.data[node], ...props.conversation.conversations[user]};
                    list.push({id:conv.node, desc:conv.lastMsg, priority:conv.unread, from:conv.handle, created:moment(conv.time).calendar()});

                }
            }
        }
        if (list.length){
            this.setState({list});
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.list != nextState.list;
    }

    scrollTo(params){
        this.refs.list.scrollTo(params);
    }

    render(){
        console.log("RENDER CONV");
        return <CardListView ref="list" name="list"
                             list={this.state.list} {...this.props}/>
    }
}
export default connect(state=>{return {xmpp:state.xmpp, conversation:state.conversation, data:state.data}})(Conversations)