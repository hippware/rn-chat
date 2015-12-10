import React from 'react-native';
const {View, Text, TextInput} = React;
import styles from './styles';
import Button from 'react-native-button';
import {disconnect} from '../actions/xmpp/xmpp';
import { connect } from '../../node_modules/react-redux/native';
import {Actions} from 'react-native-router-flux';

class Settings extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={()=>{Actions.pop();this.props.dispatch(disconnect())}}>Logout</Button>
                </View>
            </View>
        )
    }
}

export default connect(state=>state)(Settings)