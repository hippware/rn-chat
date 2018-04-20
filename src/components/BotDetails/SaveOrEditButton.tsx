// @flow

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {colors} from '../../constants';

type Props = {
  subscribe: Function,
  unsubscribe: Function,
  isSubscribed: boolean,
  isOwn: boolean,
  style: any,
};

const SaveOrEditButton = ({subscribe, unsubscribe, isSubscribed, isOwn, style}: Props) => {
  let onPress, buttonStyle, image;
  if (isOwn) {
    return null;
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
