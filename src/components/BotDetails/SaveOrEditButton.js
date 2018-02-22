// @flow

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
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

const SaveOrEditButton = ({subscribe, unsubscribe, isSubscribed, isOwn, botId, style}: Props) => {
  console.log('isSubscribed', isSubscribed);
  let onPress, buttonStyle, image;
  if (isOwn) {
    onPress = () => Actions.botEdit({botId});
    buttonStyle = [style, {backgroundColor: colors.WHITE}];
    image = require('../../../images/editBot.png');
  } else if (isSubscribed) {
    onPress = unsubscribe;
    buttonStyle = style;
    image = require('../../../images/heartSave.png');
  } else {
    onPress = subscribe;
    buttonStyle = [style, {backgroundColor: colors.WHITE}];
    image = require('../../../images/heartSave.png');
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={image} resizeMode='contain' />
    </TouchableOpacity>
  );
};

export default SaveOrEditButton;
