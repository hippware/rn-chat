import React from 'react-native';
const {View, ScrollView, ListView, TouchableOpacity, Text, Navigator} = React;
import { connect } from 'react-redux/native';
import {processLogin, subscribe, removeRosterItem} from '../actions/xmpp/roster';
import {addConversation} from '../actions/conversations';
import {Actions} from 'react-native-router-flux';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
var styles = require('./styles');
import Cell from './Cell';
import Swipeout from 'react-native-swipeout';

class ContactList extends React.Component {
    constructor({roster, ...props}){
        super(props);
        this.state = {datasource: ds.cloneWithRows(roster)};
    }

    componentWillReceiveProps({roster}){
        if (roster) {
            this.setState({datasource: ds.cloneWithRows(roster)})
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {this.state.datasource && <ListView
                        initialListSize={0}
                        dataSource={this.state.datasource}
                        renderRow={(el) =>
                            <Swipeout backgroundColor='white' autoClose={true}
                                right={[{text:'Delete', backgroundColor:'red', color:'white',
                                    onPress:()=>this.props.dispatch(removeRosterItem(el.username))}]}>
                                <TouchableOpacity onPress={()=>{this.props.dispatch(addConversation(el.username, Math.floor(Date.now() / 1000)));Actions.conversation({title: el.username, username: el.username})}}>
                                    <Cell key={el.username} label={el.username}><Text>{el.status==='online' ? 'online' : 'offline'}</Text></Cell>
                                </TouchableOpacity>
                            </Swipeout>
                            }
                    />}

                </ScrollView>
            </View>
        );
    }
}

export default connect(state=>state.roster)(ContactList)