// @flow

import React from 'react';
import {Text} from 'react-native';

type Props = {
  size?: number,
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium',
  style?: any,
  children?: any,
};

const RText = ({children, size, weight, style}: Props) => {
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular';
  const fontSize = size || 12;
  return (
    <Text style={[{fontSize, fontFamily}, style]}>
      {children}
    </Text>
  );
};

export default RText;
