import React from 'react-native';
const {View, ScrollView, ListView, Text, Navigator} = React;
import { connect } from 'react-redux/native';
import {processLogin, subscribe, removeRosterItem} from '../actions/xmpp/roster';
import {Actions} from 'react-native-redux-router';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
var styles = require('./styles');
import Cell from './Cell';
import NavBar from './NavBar';
import Swipeout from 'react-native-swipeout';

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.props.dispatch(processLogin("user2", "user2"));
    }

    componentWillReceiveProps({roster}){
        if (roster) {
            this.setState({datasource: ds.cloneWithRows(roster)})
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <NavBar {...this.props} nextTitle="Add" onNext={Actions.addContact}/>
                <ScrollView style={styles.container}>
                    {this.state.datasource && <ListView
                        initialListSize={0}
                        dataSource={this.state.datasource}
                        renderRow={(el) =>
                            <Swipeout backgroundColor='white' autoClose={true}
                                right={[{text:'Delete', backgroundColor:'red', color:'white',
                                    onPress:()=>this.props.dispatch(removeRosterItem(el.username))}]}>
                                <Cell key={el.username} label={el.username}><Text>{el.status==='online' ? 'online' : 'offline'}</Text></Cell>
                            </Swipeout>
                            }
                    />}

                </ScrollView>
            </View>
        );
    }
}

export default connect(state=>state.roster)(ContactList)