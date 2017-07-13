// @flow

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PhoneVerify from './PhoneVerify';
import BackgroundImage from './BackgroundImage';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import {colors} from '../constants';
import DeviceInfo from 'react-native-device-info';
import {settings} from '../globals';

type Props = {
  error: any
};

export default (props: Props) => {
  const state = statem.promoScene;
  return (
    <BackgroundImage source={require('../../images/LaunchScreen.png')}>
      {(settings.isStaging || settings.isTesting) &&
        <TouchableOpacity onPress={() => Actions.testRegister({resource: DeviceInfo.getUniqueID()})} style={styles.button}>
          <Text style={{fontFamily: 'Roboto-Regular', color: colors.PINK}}>Bypass Digits</Text>
        </TouchableOpacity>}
      <PhoneVerify {...{state}} />
      {!!props.error && <Text numberOfLines={1} style={styles.error}>{JSON.stringify(props.error)}</Text>}
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    bottom: 70 * k,
    left: 30 * k,
    right: 30 * k,
    height: 40 * k,
    color: 'red',
  },
  button: {
    position: 'absolute',
    bottom: 110 * k,
    left: 30 * k,
    right: 30 * k,
    height: 50 * k,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
