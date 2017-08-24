// @flow

import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {k} from '../globals';
import {colors} from '../constants';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';

type Props = {
  style: ?Object,
  imageStyle: ?Object,
  textStyle: ?Object,
  image: any,
  children: any,
  onRemove: ?Function,
  onPress: ?Function,
};

const Cell = ({style, imageStyle, textStyle, image, children, onRemove, onPress}: Props) => {
  const cell = (
    <View style={[{flexDirection: 'row', alignItems: 'center', padding: 15 * k}, style]}>
      {image &&
        <View
          style={[
            {
              width: 15 * k,
              paddingLeft: 5 * k,
              paddingRight: 15 * k,
              alignItems: 'center',
            },
            imageStyle,
          ]}
        >
          <Image source={image} />
        </View>}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {typeof children === 'string' &&
          <Text
            numberOfLines={1}
            style={[
              {
                flex: 1,
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                color: location.isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight,
              },
              textStyle,
            ]}
          >
            {children}
          </Text>}
        {typeof children !== 'string' && children}
      </View>
      {onRemove &&
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={onRemove}>
          <Image source={require('../../images/iconCloseSmall.png')} />
        </TouchableOpacity>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {cell}
      </TouchableOpacity>
    );
  } else {
    return cell;
  }
};

export default observer(Cell);
