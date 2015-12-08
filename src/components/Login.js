import React from 'react-native';
const {View, Text, TextInput} = React;
import styles from './styles';
import Button from 'react-native-button';
import ActivityIndicator from './ActivityIndicator';
import {processLogin} from '../actions/xmpp/xmpp';
import { connect } from '../../node_modules/react-redux/native';
import {Actions} from 'react-native-router-flux';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state =  {username:'user2', password:'user2'};
    }

    componentWillReceiveProps({connecting, connected, authfail}){
        this.setState({loading: connecting});
        if (connected){
            console.log("REDIRECT TO MAIN");
            Actions.main();
        } else if (authfail){
            alert("Auth failure!");
        }
    }
    render(){
        return (
            <View style={[styles.container,{paddingTop: 0}]}>
                <Text style={styles.categoryLabel}>Please enter username/password</Text>
                <View style={styles.row}>
                    <TextInput style={styles.rowInput}
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
                               autoCorrect={false}
                               secureTextEntry={true}
                               autoCapitalize="none"
                               placeholder="Password"
                               value={this.state.password}
                               onChangeText={(password)=>this.setState({password})}
                        />
                </View>
                <View style={styles.button}>
                    <Button onPress={()=>this.props.dispatch(processLogin(this.state.username, this.state.password))}>Login</Button>
                </View>
                <ActivityIndicator active={this.state.loading}/>

            </View>
        )
    }
}

export default connect(state=>state.xmpp)(Login)