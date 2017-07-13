import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {k} from './Global';
import {Actions} from 'react-native-router-flux';

export default () => (
  <TouchableOpacity
      style={[
        {
          position: 'absolute',
          bottom: 20 * k,
          right: 20 * k,
          width: 54,
          height: 54,
          backgroundColor: 'rgb(148,94,135)',
          borderRadius: 27,
        },
        this.props.style,
      ]}
    /* statem.logged.selectFriends*/
      onPress={() => {}}
  >
    <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
    >
      <Image style={this.props.style} source={require('../../images/iconNewMsg.png')} />
    </View>
  </TouchableOpacity>
);
