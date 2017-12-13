import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {k} from '../Global';

export default ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 20 * k,
        left: 15 * k,
        height: 50 * k,
        width: 50 * k,
      }}
    >
      <Image source={require('../../../images/iconCurrentLocation.png')} />
    </TouchableOpacity>
  );
};
