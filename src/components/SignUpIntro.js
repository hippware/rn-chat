import React from 'react';
import {View, Image, Text} from 'react-native';
import statem from '../../gen/state';
import BackgroundImage from './BackgroundImage';
import {k} from './Global';
import {colors} from '../constants';

export default class SignUpIntro extends React.Component {
  render() {
    return (
      <BackgroundImage source={require('../../images/bG.png')}>
        <Text
            style={{
              position: 'absolute',
              top: 188 * k,
              left: 55.5 * k,
              right: 55.5 * k,
              fontFamily: 'Roboto-Medium',
              fontSize: 30 * k,
              textAlign: 'center',
              color: colors.PURPLE,
            }}
        >
          Awesome!{'\n'}Now, it’s time to set up your profile…
        </Text>
      </BackgroundImage>
    );
  }
}
