import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import Conversations from './Conversations';
import Screen from './Screen';
export default class extends Component {
    scrollTo(params){
        this.refs.list.scrollTo(params);
    }


    render(){
        return <Screen>
            <Conversations ref="list"/>
        </Screen>;
    }
}

//import React from 'react-native';
//const {View, TouchableOpacity, ScrollView, ListView, Text, InteractionManager} = React;
//import { connect } from 'react-redux/native';
//import {processLogin, messageSent, messageReceived} from '../actions/xmpp/xmpp';
//import {removeConversation} from '../actions/conversations';
//import {Actions} from 'react-native-router-flux';
//var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
//var styles = require('./styles');
//import Cell from './Cell';
//import Swipeout from 'react-native-swipeout';
//
//class Conversations extends React.Component {
//    constructor(props){
//        super(props);
//        this.state = this.getData(props);
//    }
//
//    getData({list, conversations}){
//        console.log("LIST:",list);
//        console.log("CONVERSATIONS:",conversations);
//        return list ?  {datasource: ds.cloneWithRows(list.map((username)=>conversations[username]))} : {};
//    }
//
//    componentDidMount(props){
//        // generate stress data
//        //for (let i=0;i<100;i++){
//        //    for (let j=0;j<100;j++){
//        //        console.log("I:"+i+" J:"+j);
//        //        this.props.dispatch(messageSent({to:"user"+i, body:'Hello world!'+j, time:new Date()}));
//        //        this.props.dispatch(messageReceived({from:"user"+i, body:'Really!'+j, time:new Date()}));
//        //    }
//        //}
//    }
//
//    componentWillReceiveProps(props){
//        this.setState(this.getData(props));
//    }
//
//    removeConversation(username){
//        InteractionManager.runAfterInteractions(()=>
//            this.props.dispatch(removeConversation(username)));
//    }
//
//    render(){
//        return (
//                <View style={styles.container}>
//                    {this.state.datasource && <ListView
//                        contentContainerStyle={{paddingBottom:50}}
//                        initialListSize={0}
//                        dataSource={this.state.datasource}
//                        renderRow={(el) =>
//                            <Swipeout backgroundColor='white' autoClose={true} right={[{text:'Delete', backgroundColor:'red', color:'white', onPress:()=>this.removeConversation(el.username)}]}>
//                                <TouchableOpacity onPress={()=>Actions.conversation({title: el.username, username: el.username})}>
//                                <Cell key={el.username} label={el.lastMsg+"\nContact:"+el.username+"\n"+new Date(el.time).toString()} rowTextStyle={{fontWeight: el.unread ? 'bold' : 'normal'}}></Cell>
//                                   </TouchableOpacity>
//                            </Swipeout>
//                            }
//                    />}
//
//                </View>
//        );
//    }
//}
//
//export default connect(state=>state.conversation)(Conversations)