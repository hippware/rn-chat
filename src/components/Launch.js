import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {width, height, k} from './Global';
import {colors} from '../constants';

export default props => (
  <View style={[styles.container, {flex: 1, backgroundColor: 'transparent'}]}>
    <View style={styles.container}>
      <Image style={{width, height}} source={require('../../images/Launch.gif')} />
    </View>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
