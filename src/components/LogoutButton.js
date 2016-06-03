import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import { DigitsLoginButton, DigitsLogoutButton } from 'react-native-fabric-digits';
import Button from 'apsl-react-native-button';
import {settings, k} from '../globals';
import ProfileStore from '../store/ProfileStore';

export default class LogoutButton extends Component {
    render(){
        const profileStore: ProfileStore = this.props.profile;
        if (settings.isTesting) {
            return <Button testID="logout" onPress={profileStore.remove}
                           style={styles.button} textStyle={styles.text}>Logout</Button> ;
        } else {
            return <DigitsLogoutButton
                completion={()=>{GiftedFormManager.resetValues("signIn");profileStore.logout()}}
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

LogoutButton.propTypes = {
    profile: React.PropTypes.any.isRequired
};