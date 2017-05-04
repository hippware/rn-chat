import React, {Component} from 'react';
import {StyleSheet, NativeModules} from 'react-native';
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {settings, k} from '../globals';
const CarrierInfo = NativeModules.RNCarrierInfo;
import DeviceInfo from 'react-native-device-info';
import ApslButton from 'apsl-react-native-button';

const styles = StyleSheet.create({
    style: {
        position: 'absolute',
        bottom: 40 * k,
        left: 30 * k,
        right: 30 * k,
        height: 50 * k,
        borderWidth: 0,
        borderRadius: 2 * k,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {backgroundColor: 'rgb(254,92,108)'},
    disabledStyle: {backgroundColor: 'rgb(247,166,175)'},
    textStyle: {
        fontSize: 15 * k,
        fontFamily: 'Roboto-Regular',
        color: 'white',
        letterSpacing: 0.8,
    },
});

export default class extends React.Component {
    render() {
        return (
            <ApslButton
                {...this.props}
                style={[styles.style, styles.buttonStyle, this.props.style, this.props.buttonStyle]}
                onPress={this.props.onPress}
                disabledStyle={[styles.style, styles.disabledStyle, this.props.style, this.props.disabledStyle]}
                textStyle={[styles.textStyle, this.props.textStyle]}
            >
                {this.props.children}
            </ApslButton>
        );
    }
}
