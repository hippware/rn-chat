// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {k} from '../Global';

const Separator = ({width, backgroundColor, ...rest}) => (
  <View
    style={{
      height: width * k || StyleSheet.hairlineWidth,
      backgroundColor: backgroundColor || 'rgba(155,155,155,0.15)',
    }}
  />
);

export default Separator;
