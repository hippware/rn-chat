import React, {Component, StyleSheet} from 'react-native';
import {processLogout} from '../actions/profile';
import { DigitsLoginButton, DigitsLogoutButton } from 'react-native-fabric-digits';
import Button from 'apsl-react-native-button';
import {settings, k} from '../globals';
import { connect } from 'react-redux';

class LogoutButton extends Component {
    render(){
        if (settings.isTesting) {
            return <Button onPress={()=>this.props.dispatch(processLogout(this.props.profile))}
                           style={styles.button} textStyle={styles.text}>Logout</Button> ;
        } else {
            return <DigitsLogoutButton
                completion={()=>{GiftedFormManager.resetValues("signIn");this.props.dispatch(processLogout())}}
                text="Logout"
                buttonStyle={styles.button}
                textStyle={styles.text} />;
        }

    }
}

const styles = StyleSheet.create({
    text:{fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'},
    button:{position:'absolute',bottom:40*k, left:15*k, right:15*k, height:50*k, borderWidth: 0,borderRadius:2*k,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'}
});

export default connect(state=>({profile:state.profile}))(LogoutButton)