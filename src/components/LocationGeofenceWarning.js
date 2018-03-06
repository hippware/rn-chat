// @flow

import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {RText} from './common';

const footprint = require('../../images/footprint.png');

type Props = {
  onCancel: Function,
};

const LocationGeofenceWarning = ({onCancel}: Props) => (
  <View style={styles.container}>
    <Image source={footprint} style={{width: 60, height: 60, marginVertical: 25 * k}} resizeMode='contain' />
    <RText style={styles.title} size={30} color='white'>
      {'Allow Location\r\nAccess'}
    </RText>
    <RText style={styles.muted} color='white' size={14}>
      Please change your location settings to “always allow” to receive updates for your bots.
    </RText>
    <View style={{marginVertical: 25 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL('app-settings:{1}');
        }}
      >
        <RText color='white' size={17.5}>
          Always Allow
        </RText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
        <RText color='white' size={17.5}>
          Cancel
        </RText>
      </TouchableOpacity>
    </View>
  </View>
);

export default LocationGeofenceWarning;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30 * k,
  },
  title: {
    marginVertical: 15 * k,
    lineHeight: 32 * k,
    textAlign: 'center',
  },
  muted: {
    marginTop: 5 * k,
    textAlign: 'center',
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    margin: 10 * k,
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
});
