import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} = React;
import styles from './styles';
import Button from 'react-native-button';
import ActivityIndicator from './ActivityIndicator';
import {requestLogin} from '../actions/xmpp/xmpp';
import { connect } from '../../node_modules/react-redux/native';
import {Actions} from 'react-native-router-flux';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state =  {...props.login};
    }
    componentWillReceiveProps(props){
        this.setState({...props.login});
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image
                        style={styles.icon}
                        source={require('../../images/test.png')}
                    />
                </View>
                <Text style={styles.categoryLabel}>Please enter username/password</Text>
                <View style={styles.row}>
                    <TextInput style={styles.rowInput}
                               accessibilityLabel="Username"
                               autoCorrect={false}
                               autoCapitalize="none"
                               autoFocus={true}
                               placeholder="Username"
                               value={this.state.username}
                               onChangeText={(username)=>this.setState({username})}
                        />
                </View>
                <View style={styles.lastRow}>
                    <TextInput style={styles.rowInput}
                               accessibilityLabel="Password"
                               autoCorrect={false}
                               secureTextEntry={true}
                               autoCapitalize="none"
                               placeholder="Password"
                               value={this.state.password}
                               onChangeText={(password)=>this.setState({password})}
                        />
                </View>
                <View style={styles.button}>
                    <Button onPress={()=>Actions.processLogin({username:this.state.username, password:this.state.password})}>Login!</Button>
                </View>
                <ActivityIndicator active={this.state.loading}/>

            </View>
        )
    }
}

export default connect(state=>state)(Login)
