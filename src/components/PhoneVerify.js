import React, {Component} from 'react';
import {StyleSheet, NativeModules} from 'react-native';
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {settings} from '../globals';
const CarrierInfo = NativeModules.RNCarrierInfo;
import DeviceInfo from 'react-native-device-info';
import Button from 'apsl-react-native-button';
import {getRegionCode} from '../store/phoneStore';
import statem from '../../gen/state';
import {width, height, k} from './Global';

let code;
CarrierInfo.isoCountryCode(result => (code = getRegionCode(result)));

export default () => {
  return (
    <DigitsLoginButton
        options={{
          phoneNumber: code || '',
          title: 'TinyRobot',
          appearance: {
            backgroundColor: {
              hex: '#3F324D',
              alpha: 1,
            },
            logoImageName: 'logoMark',
            accentColor: {
              hex: '#FE5C6C',
              alpha: 1.0,
            },
            headerFont: {
              name: 'Roboto-Regular',
              size: 15,
            },
            labelFont: {
              name: 'Roboto-Regular',
              size: 18,
            },
            bodyFont: {
              name: 'Roboto-Light',
              size: 15,
            },
          },
        }}
        completion={(error, provider_data) => {
          if (error && error.code !== 1) {
            statem.profileRegister.failure(error.message);
          } else if (provider_data) {
            statem.promoScene.signIn({
              resource: DeviceInfo.getUniqueID(),
              provider_data,
            });
          }
        }}
        text='Sign In'
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
    />
  );
};

const styles = {
  buttonStyle: {
    position: 'absolute',
    bottom: 40 * k,
    left: 30 * k,
    right: 30 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
};
