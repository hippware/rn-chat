import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BackgroundGradient from './BackgroundGradient';
import CardListView from './CardListView';
import {k} from '../globals';
import Conversations from './Conversations';

export default class extends Component {
    constructor(props) {
        super(props);
        this.list = [
            {
                id:1,
                avatar: require("../../images/iconAvatar.png"),
                created: '10:12 AM',
                from: 'Sarah',
                channel: 'ThursdayPickupSoccer',
                desc: 'I just added you to her channel Thursday Pickup Soccer'
            },
            {
                id:2,
                avatar: require("../../images/iconAvatar2@2x.png"),
                created: '10:32 AM',
                from: 'Billy',
                priority: 1,
                location: 'Dog Haus Biergarten, 93 E Green St, Pasadena, CA 91',
                desc: 'Craig: Ok - I’ll see you there around 8!'
            },
            {
                id:3,
                avatar: require("../../images/iconAvatar.png"),
                created: '11:12 AM',
                from: 'Craig',
//                image: {uri:'http://madebysofa.com/static/archive/img/blog/sofa_icon/final_zowieso.png'},
                //image: {uri: 'https://cdn0.iconfinder.com/data/icons/furnitures-icons-rounded/110/Sofa-3-512.png'},
                desc: 'I just woke up wearing a top hat and simpsons boxers. Also found more money t…'
            },
        ];

        this.state = {
            hideNavBar: false
        };
    }

    render(){
        return <View style={{flex:1, top:70*k}}>
            <BackgroundGradient/>
            <Conversations ref="list"/>
        </View>;
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