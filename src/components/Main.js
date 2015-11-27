var React = require('react-native');
var {View, Text, TextInput} = React;
var styles = require('./styles');
import {requestRoster, disconnect} from '../actions/xmpp/xmpp';
import { connect } from 'react-redux/native';
import ContactList from './ContactList';

class Main extends React.Component {
    componentWillReceiveProps(props){
        console.log("RECEIVE PROPS");
    }
    componentWillUnmount(){
        this.props.dispatch(disconnect());
    }
    render(){
        return (
            <View style={styles.container}>
                <ContactList/>
            </View>
        )
    }
}


export default connect(state=>state.xmpp)(Main)