// @flow

import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {observer} from 'mobx-react/native';
import {k} from './Global';
import {colors} from '../constants';
import {RText} from './common';
import {Actions} from 'react-native-router-flux';
import {settings} from '../globals';

@observer
export default class BotError extends React.Component<{}> {
  static leftButton = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.pop({animated: false});
          Actions.pop();
        }}
        style={{marginLeft: 10 * k}}
      >
        <Image source={require('../../images/iconBackGrayNew.png')} style={{tintColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)'}} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <RText size={17} style={{textAlign: 'center'}}>
            <Text style={{color: 'red'}}>Oops. </Text>
            <Text style={{color: colors.ANOTHER_GREY}}>{'This bot is no\r\nlonger available'}</Text>
          </RText>
          <Image source={require('../../images/botError.png')} style={{marginTop: 30 * k}} />
        </View>
      </View>
    );
  }
}
