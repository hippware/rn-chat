// @flow

import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../../constants';
import {k} from '../../globals';
import {observer} from 'mobx-react/native';

export default observer(({subscribe, unsubscribe, isSubscribed}) => {
  let onPress, buttonStyle, image, text, textStyle;
  if (isSubscribed) {
    onPress = unsubscribe;
    buttonStyle = [styles.addBotButton, {backgroundColor: colors.WHITE, borderColor: colors.GREY}];
    image = require('../../../images/iconCheckBotAdded.png');
    text = 'SAVED';
    textStyle = [styles.addBotText, {color: colors.PURPLE}];
  } else {
    onPress = subscribe;
    buttonStyle = styles.addBotButton;
    image = require('../../../images/saveIcon.png');
    text = 'SAVE';
    textStyle = styles.addBotText;
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={image} style={styles.addBotIcon} resizeMode='contain' />
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  addBotButton: {
    flexDirection: 'row',
    height: 40 * k,
    marginTop: -20 * k,
    width: 150 * k,
    alignSelf: 'center',
    backgroundColor: colors.PINK,
    borderRadius: 5 * k,
    borderColor: colors.PINK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBotText: {
    fontSize: 15,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 5 * k,
  },
});
