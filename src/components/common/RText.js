// @flow

import React from 'react';
import {Text} from 'react-native';
import {k} from '../Global';

type Props = {
  size?: number,
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium',
  style?: any,
  children?: any,
};

const RText = ({children, size, weight, style}: Props) => {
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular';
  const fontSize = size ? size * k : 12 * k;
  return (
    <Text style={[{fontSize, fontFamily}, style]}>
      {children}
    </Text>
  );
};

export default RText;
