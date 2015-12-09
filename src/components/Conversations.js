import React from 'react-native';
const {View, TouchableOpacity, ScrollView, ListView, Text, Navigator} = React;
import { connect } from 'react-redux/native';
import {processLogin} from '../actions/xmpp/xmpp';
import {removeConversation} from '../actions/conversations';
import {Actions} from 'react-native-router-flux';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
var styles = require('./styles');
import Cell from './Cell';
import Swipeout from 'react-native-swipeout';

class Conversations extends React.Component {
    constructor(props){
        super(props);
        this.state = this.getData(props);
    }

    getData({list, conversations}){
        return list ?  {datasource: ds.cloneWithRows(list.map((username)=>conversations[username]))} : {};
    }

    componentWillReceiveProps(props){
        this.setState(this.getData(props));
    }

    render(){
        return (
                <View style={styles.container}>
                    {this.state.datasource && <ListView
                        initialListSize={0}
                        dataSource={this.state.datasource}
                        renderRow={(el) =>
                            <Swipeout backgroundColor='white' autoClose={true} right={[{text:'Delete', backgroundColor:'red', color:'white', onPress:()=>this.props.dispatch(removeConversation(el.username))}]}>
                                <TouchableOpacity onPress={()=>Actions.conversation({title: el.username, username: el.username})}>
                                <Cell key={el.username} label={el.lastMsg+"\nContact:"+el.username+"\n"+new Date(el.time).toString()} rowTextStyle={{fontWeight: el.unread ? 'bold' : 'normal'}}></Cell>
                                   </TouchableOpacity>
                            </Swipeout>
                            }
                    />}

                </View>
        );
    }
}

export default connect(state=>state.conversation)(Conversations)