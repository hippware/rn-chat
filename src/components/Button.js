import React, {Component} from "react";
import {StyleSheet, NativeModules} from "react-native";
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {settings, k} from '../globals';
const CarrierInfo = NativeModules.RNCarrierInfo;
import DeviceInfo from 'react-native-device-info';
import Button from 'apsl-react-native-button';

const styles = StyleSheet.create({
  buttonStyle:{position:'absolute',bottom:40*k, left:30*k, right:30*k, height:50*k, borderWidth: 0,borderRadius:2*k,
    backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'},
  textStyle:{fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'}
});

export default class extends React.Component {
  render() {
    return <Button style={[styles.buttonStyle, this.props.buttonStyle]} onPress={this.props.onPress}
                   textStyle={[styles.textStyle, this.props.textStyle]}>{this.props.children}</Button>
    
  }
  
}
