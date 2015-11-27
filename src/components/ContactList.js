import React from 'react-native';
const {View, ScrollView, ListView} = React;
import { connect } from 'react-redux/native';
import {processLogin, requestRoster, subscribe, disconnect} from '../actions/xmpp/xmpp';
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});
var styles = require('./styles');
import Cell from './Cell';

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.props.dispatch(processLogin("user2", "user2"));
    }

    componentWillReceiveProps({roster, connected}){
        if (connected){
            this.props.dispatch(subscribe('user4'));
            this.props.dispatch(requestRoster());
        }
        if (roster) {
            this.setState({datasource: ds.cloneWithRows(roster)})
        }
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                {this.state.datasource && <ListView
                    initialListSize={0}
                    dataSource={this.state.datasource}
                    renderRow={(el) => <Cell key={el.username} label={el.username} />} />}

            </ScrollView>
        );
    }
}

export default connect(state=>state.xmpp)(ContactList)