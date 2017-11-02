import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {GiftedFormManager} from 'react-native-gifted-form';
import Button from 'apsl-react-native-button';
import {settings} from '../globals';
import {k} from './Global';
import {Actions} from 'react-native-router-flux';

export default () => {
  if (settings.isTesting) {
    return (
      <Button
        testID='logout'
        onPress={() => {
          GiftedFormManager.resetValues('signIn');
          Actions.logout({remove: true});
        }}
        style={styles.button}
        textStyle={styles.text}
      >
        Logout
      </Button>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          GiftedFormManager.resetValues('signIn');
          GiftedFormManager.resetValues('myAccount');
          Actions.pop({animated: false});
          Actions.pop({animated: false});
          Actions.logout();
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  text: {fontSize: 15 * k, fontFamily: 'Roboto-Regular', color: 'white'},
  button: {
    position: 'absolute',
    bottom: 40 * k,
    left: 15 * k,
    right: 15 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
