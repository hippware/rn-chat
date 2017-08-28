// @flow

import React from 'react';
import {Text} from 'react-native';
import {k} from '../Global';

type Props = {
  size?: number,
  color?: string,
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium',
  style?: any,
  children?: any,
};

const RText = ({children, color, size, weight, style}: Props) => {
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular';
  const fontSize = size ? size * k : 12 * k;
  return (
    <Text style={[{color, fontSize, fontFamily}, style]}>
      {children}
    </Text>
  );
};

export default RText;
