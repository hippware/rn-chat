// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';
import {k, width, height} from '../Global';

const PopupBlur = ({children}) => (
  <View style={styles.container}>
    <BlurView blurType='light' blurAmount={10} style={[styles.absolute, {alignItems: 'center', justifyContent: 'center'}]}>
      <View style={styles.popup}>{children}</View>
    </BlurView>
  </View>
);

export default PopupBlur;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  popup: {
    marginHorizontal: 30 * k,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30 * k,
    borderRadius: 5 * k,
  },
});
