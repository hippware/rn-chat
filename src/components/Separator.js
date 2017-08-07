import React from 'react';
import {View} from 'react-native';
import {k} from './Global';

const Separator = ({width}) =>
  (<View
    style={{
      height: (width || 2) * k,
      backgroundColor: 'rgba(155,155,155,0.15)',
    }}
  />);

export default Separator;
