import React, {Component, PropTypes} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import assert from 'assert';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-native';
import {k} from '../globals';

export default class NavBarBackButton extends Component {
  render() {
    return (
      <TouchableOpacity
          onPress={Actions.pop}
          style={{
            position: 'absolute',
            left: 3,
            top: 7,
            width: 40 * k,
            height: 70 * k,
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Image source={require('../../images/iconBackGrayNew.png')} />
      </TouchableOpacity>
    );
  }
}
