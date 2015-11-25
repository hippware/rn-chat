var React = require('react-native');
var {View, Text, TextInput} = React;
var styles = require('./styles');
import {requestRoster, disconnect} from '../actions/xmpp/xmpp';
import { connect } from 'react-redux/native';

class Main extends React.Component {
    componentDidMount(){
        this.props.dispatch(requestRoster());
    }
    componentWillReceiveProps(props){
        console.log("RECEIVE PROPS");
    }
    componentWillUnmount(){
        console.log("UNMOUNT");
        this.props.dispatch(disconnect());
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.categoryLabel}>Success</Text>
            </View>
        )
    }
}


export default connect(state=>state.xmpp)(Main)