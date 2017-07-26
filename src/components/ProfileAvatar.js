import React from 'react';
import {View} from 'react-native';
import Avatar from './Avatar';
import {k} from './Global';

type Props = {
  isDay: boolean,
  profile: any,
  tappable: boolean,
  size: number,
};

export default (props: Props) => {
  const {size = 65, tappable = true} = props;
  return (
    <View style={{alignItems: 'center', height: size * k}}>
      <Avatar {...props} tappable={tappable} size={size} />
    </View>
  );
};
