import React from 'react';
import {View} from 'react-native';
import {k} from './Global';

const Separator = ({width, backgroundColor}) => (
  <View
    style={{
      height: (width || 1) * k,
      backgroundColor: backgroundColor || 'rgba(155,155,155,0.15)',
    }}
  />
);

export default Separator;
