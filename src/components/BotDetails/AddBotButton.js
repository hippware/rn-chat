// @flow

import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../../constants';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';

type Props = {
  subscribe: Function,
  unsubscribe: Function,
  isSubscribed: boolean,
  isOwn: boolean,
  botId: string,
  style: any,
};

const AddBotButton = ({subscribe, unsubscribe, isSubscribed, isOwn, botId, style}: Props) => {
  let onPress, buttonStyle, image, text, textStyle;
  if (isOwn) {
    onPress = () => Actions.botEdit({item: botId});
    buttonStyle = [style, {backgroundColor: colors.WHITE}];
    image = require('../../../images/editPink.png');
    text = 'EDIT';
    textStyle = [styles.addBotText, {color: colors.PINK}];
  } else if (isSubscribed) {
    onPress = unsubscribe;
    buttonStyle = [style, {backgroundColor: colors.WHITE, borderColor: colors.GREY}];
    image = require('../../../images/iconCheckBotAdded.png');
    text = 'SAVED';
    textStyle = [styles.addBotText, {color: colors.PURPLE}];
  } else {
    onPress = subscribe;
    buttonStyle = style;
    image = require('../../../images/saveIcon.png');
    text = 'SAVE';
    textStyle = styles.addBotText;
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={image} resizeMode='contain' />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AddBotButton;

const styles = StyleSheet.create({
  addBotText: {
    fontSize: 13,
    letterSpacing: 0.6,
    fontFamily: 'Roboto-Medium',
    color: colors.WHITE,
    marginLeft: 5 * k,
  },
});
