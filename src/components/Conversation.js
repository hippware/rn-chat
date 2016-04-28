import React, {Component, View, Dimensions, StyleSheet} from 'react-native';
import Screen from './Screen';
import { connect } from 'react-redux';
import Avatar from './Avatar';
const GiftedMessenger = require ('react-native-gifted-messenger');
import * as actions from '../actions';

class Conversation extends Component {
    static renderTitle(state){
        return <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingTop:20}}>
            <Avatar size={40} source={state.item.profile.avatar} title={state.item.profile.displayName}/>
        </View>;
    }
    constructor(props){
        super(props);
        this.state = {};
    }
    onChangeText(){
        this.props.dispatch(actions.sendComposing(this.props.item.id));
    }
    handleSend({text}){
        const time = Date.now();
        this.props.dispatch(actions.sendMessage({id:`s${time}${Math.round(Math.random() * 1000)}`, to:this.props.item.id, body:text, time}));
    }
    onErrorButtonPress(){

    }
    onImagePress(){

    }
    render(){
        const profile = this.props.profile;
        const list = this.props.list.map(el=>({
            uniqueId: el.id,
            text: el.body,
            position: el.own ? 'right' : 'left',
            status: '',
            name: el.own ? '' : profile.displayName,
            image: el.own ? null : profile.avatar,
            avatarView: Avatar,
            date: new Date(el.time),

        })).reverse();
        console.log("MESSAGE LIST:", list);
        return <Screen>
            <GiftedMessenger
              ref={(c) => this._GiftedMessenger = c}
              styles={{
                container: {flex:1, backgroundColor:'transparent'},
              }}
              autoFocus={true}
              messages={list}
              handleSend={this.handleSend.bind(this)}
              onErrorButtonPress={this.onErrorButtonPress.bind(this)}
              onImagePress={this.onImagePress}
              displayNames={false}
              parseText={false} // enable handlePhonePress, handleUrlPress and handleEmailPress
              typingMessage={this.state.typingMessage}
              maxHeight={Dimensions.get('window').height - 70}
            />
        </Screen>;
    }
}


export default connect(state=>({list:state.conversation.conversations[state.conversation.current], profile:state.profiles.data[state.conversation.current]}))(Conversation)

//const {View, Text, InteractionManager, ScrollView, TextInput, ListView, DeviceEventEmitter} = React;
//import styles from './styles';
//import Button from 'react-native-button';
//import InvertibleScrollView from 'react-native-invertible-scroll-view';
//import {sendMessage, sendComposing} from '../actions';
//import {enterConversation, exitConversation} from '../actions/conversations';
//import { connect } from 'react-redux/native';
//const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//
//class Conversation extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {};
//    }
//    _loadState({username, conversations, disconnected}){
//        if (disconnected){
//            alert("DISCONNECTED");
//            return {};
//        }
//        if (conversations && conversations[username]){NavigationRootContainer
//            let history = [...conversations[username].history];
//            if (conversations[username].composing && history.length == conversations[username].history.length){
//                history.unshift({from:username, body:'Composing...'})
//            }
//            return {
//                dataSource: ds.cloneWithRows(history)
//            };
//        } else {
//            return {};
//        }
//    }
//
//    componentDidMount() {
//        var self = this;
//        // mark messages as read
//        this.props.dispatch(enterConversation(this.props.username));
//        this._keyboardDidShowSubscription = DeviceEventEmitter.addListener('keyboardDidShow', function (e) {
//            self.setState({keyboardHeight: e.endCoordinates.height});
//        });
//
//        this._keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', function (e) {
//            self.setState({keyboardHeight: 0});
//        });
//        InteractionManager.runAfterInteractions(() => {
//            self.setState(self._loadState(this.props));
//        });
//
//    }
//    componentWillUnmount(){
//        this._keyboardDidShowSubscription.remove();
//        this._keyboardWillHideSubscription.remove();
//        this.props.dispatch(exitConversation(this.props.username));
//    }
//    componentWillReceiveProps(props){
//        InteractionManager.runAfterInteractions(() => {
//            this.setState(this._loadState(props));
//            // scroll to show new message
//            if (this.refs.messages && this.refs.messages.refs.listviewscroll) {
//                this.refs.messages.refs.listviewscroll.scrollTo(0);
//            }
//
//        });
//    }
//
//    render(){
//        console.log("RE-RENDER");
//        return (
//            <View style={styles.container}>
//                <View style={{flex:1}}>
//                    {this.state.dataSource && <ListView
//                        ref="messages"
//                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
//                        dataSource={this.state.dataSource}
//                        renderRow={(row) =>
//                            <Text style={[styles.messageItem, {textAlign:!row.from ? 'right':'left' }]}>{row.body}</Text>}
//                        /> }
//                </View>
//                <View style={styles.messageBar}>
//                    <View style={{flex:1}}>
//                        <TextInput ref='message'
//                                   value={this.state.message}
//                                   autoFocus={true}
//                                   onChangeText={(message)=>{sendComposing(this.props.username);this.setState({message})}}
//                                   style={styles.message} placeholder="Enter message..."/>
//                    </View>
//                    <View style={styles.sendButton}>
//                        <Button style={{flex:1}} onPress={()=>{this.props.dispatch(sendMessage({body: this.state.message, to:this.props.username, time:Date.now()}));this.setState({message:""});}} disabled={!this.state.message || !this.state.message.trim()}>Send</Button>
//                    </View>
//                </View>
//                <View style={{height: this.state.keyboardHeight}}></View>
//            </View>
//        )
//    }
//}
//
//export default connect(state=>state.conversation)(Conversation)