import React, {Component} from "react";
import {StyleSheet, NativeModules} from "react-native";
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {login} from '../actions';
import {settings, k} from '../globals';
import { connect, Provider } from 'react-redux';
const CarrierInfo = NativeModules.RNCarrierInfo;
import PhoneService from '../services/PhoneService';
import DeviceInfo from 'react-native-device-info';
let code = null;
import Button from 'apsl-react-native-button';
const testData  = {
    userID:'0000001',
    phoneNumber:'+15550000001',
    resource:DeviceInfo.getUniqueID(),
    authTokenSecret: '',
    authToken: '',
    emailAddressIsVerified: false,
    'X-Auth-Service-Provider': 'http://localhost:9999',
    emailAddress: '',
    'X-Verify-Credentials-Authorization': ''
};


CarrierInfo.isoCountryCode(
    (result) => code = PhoneService.getRegionCode(result)
);


class PhoneVerify extends React.Component {
    completion(error, response) {
        if (error && error.code !== 1) {
            alert(error.message);
        } else if (response) {
            this.props.dispatch(login({...response, resource:DeviceInfo.getUniqueID()}));
        }
    }

    render(){
        if (settings.isTesting){
            return <Button onPress={()=>this.props.dispatch(login(testData))}
                           style={styles.buttonStyle} textStyle={styles.textStyle}>Sign In</Button> ;
        }
        return (
            <DigitsLoginButton
                options={{
                              phoneNumber: code || "",
                              title: "TinyRobot",
                              appearance: {
                                backgroundColor: {
                                  hex: "#3F324D",
                                  alpha: 1
                                },
                                logoImageName: "logoMark",
                                accentColor: {
                                  hex: "#FE5C6C",
                                  alpha: 1.0
                                },
                                headerFont: {
                                  name: "Roboto-Regular",
                                  size: 15
                                },
                                labelFont: {
                                  name: "Roboto-Regular",
                                  size: 18
                                },
                                bodyFont: {
                                  name: "Roboto-Light",
                                  size: 15
                                }
                              }
                            }}
                completion={this.completion.bind(this)}
                text="Sign In"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.textStyle}
            />
        );

    }
}

const styles = StyleSheet.create({
    buttonStyle:{position:'absolute',bottom:40*k, left:30*k, right:30*k, height:50*k, borderWidth: 0,borderRadius:2*k,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'},
    textStyle:{fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'}
});
export default connect(state=>({profile:state.profile}))(PhoneVerify)


