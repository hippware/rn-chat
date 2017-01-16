import React from "react";
const {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} = React;
import ActivityIndicator from './ActivityIndicator';
import {processLogin} from '../actions/xmpp/roster';
import {authErrorShown} from '../actions/xmpp/xmpp';
import {Actions} from 'react-native-router-native';
import { connect } from '../../node_modules/react-redux/native';

class ProcessLogin extends React.Component {
    constructor(props){
        super(props);
        this.state =  {loading: false};
    }
    checkProps({username, password, login, xmpp, dispatch}) {
        if (xmpp.authfail){
            // don't show error for automatic login
            if (username){
                alert(xmpp.error);
            }
            dispatch(authErrorShown());
            return setTimeout(()=>{Actions.dismiss()});
        }
        if (!login || !xmpp){
            console.log("No login & xmpp state");
            return;
        }
        if (xmpp.connecting){
            return this.setState({loading:true});
        }
        if (xmpp.disconnecting){
            setTimeout(()=>{Actions.dismiss();Actions.login()});
            return this.setState({loading:false});
        }
        const user = username || login.username;
        const pass = password || login.password;
        // try to login automatically
        if (user && pass && !xmpp.connected){
            this.setState({loading: true});
            return dispatch(processLogin(user, pass));
        }
        if (xmpp.connected) {
            setTimeout(()=>{Actions.dismiss();Actions.main()});
        } else {
            setTimeout(()=>{Actions.dismiss();Actions.login()});
        }
    }

    componentDidMount(){
        this.checkProps(this.props);
    }

    componentWillReceiveProps(props){
        console.log("RECEIVE PROPS:");
        this.checkProps(props);
    }


    render(){
        return <View style={styles.container}>
            <ActivityIndicator active={this.state.loading}/>
        </View>
    }
}
export default connect(state=>state)(ProcessLogin)

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

