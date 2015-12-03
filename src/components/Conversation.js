import React from 'react-native';
const {View, Text, InteractionManager, ScrollView, TextInput, ListView, DeviceEventEmitter} = React;
import styles from './styles';
import Button from 'react-native-button';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import {sendMessage} from '../actions/xmpp/xmpp';
import { connect } from 'react-redux/native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _loadState({username, conversations, disconnected}){
        if (disconnected){
            alert("DISCONNECTED");
            return {};
        }
        if (conversations){
            return {
                dataSource: ds.cloneWithRows(conversations[username].history||[]),
            };
        } else {
            return {};
        }
    }

    componentDidMount() {
        var self = this;
        DeviceEventEmitter.addListener('keyboardDidShow', function (e) {
            self.setState({keyboardHeight: e.endCoordinates.height});
        });

        DeviceEventEmitter.addListener('keyboardWillHide', function (e) {
            self.setState({keyboardHeight: 0});
        });
        InteractionManager.runAfterInteractions(() => {
            self.setState(self._loadState(this.props));
        });
    }
    componentWillUnmount(){
        DeviceEventEmitter.removeAllListeners();
    }
    componentWillReceiveProps(props){
        InteractionManager.runAfterInteractions(() => {
            this.setState(this._loadState(props));
            // scroll to show new message
            if (this.refs.messages && this.refs.messages.refs.listviewscroll) {
                this.refs.messages.refs.listviewscroll.scrollTo(0);
            }
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    {this.state.dataSource && <ListView
                        ref="messages"
                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        dataSource={this.state.dataSource}
                        renderRow={(row) =>
                            <Text style={[styles.messageItem, {textAlign:!row.from ? 'right':'left' }]}>{row.body}</Text>}
                        /> }
                </View>
                <View style={styles.messageBar}>
                    <View style={{flex:1}}>
                        <TextInput ref='message'
                                   value={this.state.message}
                                   autoFocus={true}
                                   onChangeText={(message)=>this.setState({message})}
                                   style={styles.message} placeholder="Enter message..."/>
                    </View>
                    <View style={styles.sendButton}>
                        <Button style={{flex:1}} onPress={()=>{this.props.dispatch(sendMessage({body: this.state.message, to:this.props.username, time:Date.now()}));this.setState({message:""});}} disabled={!this.state.message || !this.state.message.trim()}>Send</Button>
                    </View>
                </View>
                <View style={{height: this.state.keyboardHeight}}></View>
            </View>
        )
    }
}

export default connect(state=>state.conversation)(Conversation)