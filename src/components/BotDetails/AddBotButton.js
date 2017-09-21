// @flow

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../../constants';
import {k} from '../../globals';
import {observer} from 'mobx-react/native';

type Props = {
  subscribe: Function,
  unsubscribe: Function,
  isSubscribed: boolean,
};

const AddBotButton = ({subscribe, unsubscribe, isSubscribed}: Props) => {
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
    <View style={{backgroundColor: 'white'}}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Image source={image} resizeMode='contain' />
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(AddBotButton);

const styles = StyleSheet.create({
  addBotButton: {
    flexDirection: 'row',
    height: 40 * k,
    width: 136 * k,
    backgroundColor: colors.PINK,
    borderRadius: 5 * k,
    borderColor: colors.PINK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBotText: {
    fontSize: 13,
    letterSpacing: 0.6,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 5 * k,
  },
});
