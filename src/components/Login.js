import React from 'react-native';
const {View, Text, TextInput} = React;
import styles from './styles';
import Button from 'react-native-button';
import ActivityIndicator from './ActivityIndicator';
import {processLogin} from '../actions/xmpp/roster';
import { connect } from '../../node_modules/react-redux/native';
import {Actions} from 'react-native-router-flux';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.logged = false;
        this.state =  {...props.login};
    }

    checkProps({login, xmpp, dispatch}){
        if (xmpp.connecting || xmpp.disconnecting){
            this.logged = false;
            return;
        }
        // try to login
        if (login.username && login.password && !xmpp.connected && !xmpp.authfail){
            dispatch(processLogin(login.username, login.password));
            this.setState({tryToLogin: true});
        }
        if (xmpp.connected && !this.logged){
            this.logged = true;
            this.setState({tryToLogin: false});
            console.log("REDIRECT TO MAIN");
            Actions.main();
        } else if (xmpp.authfail){
            alert("Auth failure!" + xmpp.error);
            this.setState({tryToLogin: false, password:''});
        } else if (xmpp.disconnected){
            alert("Disconnected");
            this.setState({tryToLogin: false});
        }
    }

    componentDidMount(){
        this.checkProps(this.props);
    }

    componentWillReceiveProps(props){
        this.setState({loading:props.xmpp.connecting, ...props.login});
        this.checkProps(props);
    }

    render(){
        if (this.state.connecting || this.state.tryToLogin){
            return (
                <View style={styles.container}>
                    <ActivityIndicator active={this.state.loading}/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
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

export default connect(state=>state)(Login)