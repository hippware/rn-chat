import React from 'react-native';
const {View, ScrollView, ListView, TouchableOpacity, Text, InteractionManager} = React;
import { connect } from 'react-redux/native';
import {processLogin, subscribe, removeRosterItem} from '../actions/xmpp/roster';
import {addConversation} from '../actions/conversations';
import {Actions} from 'react-native-router-flux';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1.username!==r2.username || r1.status!==r2.status)});
var styles = require('./styles');
import Cell from './Cell';
import Swipeout from 'react-native-swipeout';


class ContactItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        const res = (this.props.item.username !== nextProps.item.username) || (this.props.item.status !== nextProps.item.status);
        //console.log("shouldComponentUpdate: ",this.props.item.username,nextProps.item.username,this.props.item.status,nextProps.item.status,res);
        return res;

    }
    render(){
        const el = this.props.item;
        //console.log("CONTACT RENDER "+el.username);
        return (<Swipeout backgroundColor='white' autoClose={true}
                          right={[{text:'Delete', backgroundColor:'red', color:'white',
                                    onPress:()=>this.removeContact(el.username)}]}>
            <TouchableOpacity onPress={()=>{this.props.dispatch(addConversation(el.username, Math.floor(Date.now() / 1000)));Actions.conversation({title: el.username, username: el.username})}}>
                <Cell key={el.username} label={el.username}><Text>{el.status==='online' ? 'online' : 'offline'}</Text></Cell>
            </TouchableOpacity>
        </Swipeout>);
    }
}
class ContactList extends React.Component {
    constructor({roster, ...props}){
        super(props);
        this.state = {datasource: ds.cloneWithRows(roster)};
    }

    componentWillReceiveProps({roster}){
        InteractionManager.runAfterInteractions(()=>
            this.setState({datasource: ds.cloneWithRows(roster)})
        );
    }

    removeContact(username){
        InteractionManager.runAfterInteractions(()=>
        this.props.dispatch(removeRosterItem(username)));
    }

    render(){
        return (
                <View style={styles.container}>
                    {this.state.datasource && <ListView
                        initialListSize={0}
                        contentContainerStyle={{paddingBottom:50}}
                        dataSource={this.state.datasource}
                        renderRow={(el)=><ContactItem item={el}/>}
                    />}

                </View>
        );
    }
}

export default connect(state=>state.roster)(ContactList)