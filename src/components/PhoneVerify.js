import React from 'react';
import {StyleSheet, NativeModules, View} from 'react-native';
import {DigitsLoginButton} from 'react-native-fabric-digits';
const CarrierInfo = NativeModules.RNCarrierInfo;
import DeviceInfo from 'react-native-device-info';
import {getRegionCode} from '../store/phoneStore';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import {colors} from '../constants';

let code;
CarrierInfo.isoCountryCode(result => (code = getRegionCode(result)));

export const digitsOptions = {
  phoneNumber: code || '',
  title: 'tinyrobot',
  appearance: {
    backgroundColor: {
      hex: '#FFFFFF',
      alpha: 1,
    },
    logoImageName: 'pink',
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
};

export const completion = async (error, provider_data) => {
  if (error && error.code !== 1) {
    alert(error.message);
  } else if (provider_data) {
    Actions.register({
      resource: DeviceInfo.getUniqueID(),
      provider_data,
    });
  }
};

export default () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <DigitsLoginButton
          options={digitsOptions}
          completion={completion}
          text='Log in'
          buttonStyle={[styles.button, styles.login]}
          textStyle={[styles.text, styles.loginText]}
      />
      <DigitsLoginButton options={digitsOptions} completion={completion} text='Sign up' buttonStyle={styles.button} textStyle={styles.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 5 * k,
    justifyContent: 'center',
  },
  login: {
    borderWidth: 1,
    borderColor: colors.PINK,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
  },
  loginText: {
    color: colors.PINK,
  },
});
