// @flow

import React from 'react';
import {k} from './Global';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../constants';
import NavBar from './NavBar';

type Props = {
  onPress: Function,
};

export default ({onPress}: Props) =>
  (<NavBar>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.selectedText, {color: colors.DARK_PURPLE}]}>tinyrobot</Text>
    </TouchableOpacity>
  </NavBar>);

const styles = StyleSheet.create({
  selectedText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
    letterSpacing: 0.5,
    paddingTop: 10 * k,
  },
});
