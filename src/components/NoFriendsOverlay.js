// @flow

import React from 'react';
import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import {k, width, height} from './Global';

export default () =>
  (<Modal transparent>
    <View style={styles.container}>
    </View>
  </Modal>);


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
