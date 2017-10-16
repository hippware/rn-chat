// @flow

import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';

export default ({isOwn, bot}) => {
  return (
    !!isOwn &&
    <TouchableOpacity onPress={() => Actions.botEdit({item: bot.id})} style={styles.editButton}>
      <Text style={styles.editButtonText}>EDIT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    borderRadius: 2,
    backgroundColor: colors.addAlpha(colors.WHITE, 0.75),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20 * k,
    width: 62 * k,
    right: 20 * k,
    height: 30 * k,
  },
  editButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11 * k,
    color: colors.PURPLE,
    letterSpacing: 0.5,
  },
});
