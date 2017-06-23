// @flow

import React from 'react';
import {View, Animated} from 'react-native';
import {observer} from 'mobx-react/native';
import {k} from '../globals';

type Props = {
  style: Object
};

export default observer((props: Props) => (
  <Animated.View
      {...props}
      style={[
        {
          position: 'absolute',
          top: 0,
          height: 70 * k,
          right: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        },
        props.style,
      ]}
  />
));
