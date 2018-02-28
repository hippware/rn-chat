// @flow

import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';

const InviteFriendsRow = () => (
  <View
    style={{
      flexDirection: 'row',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.DARK_GREY,
      padding: 13 * k,
      alignItems: 'center',
    }}
  >
    <Image source={require('../../../images/iconBot.png')} style={{height: 37 * k, width: 37 * k}} resizeMode='contain' />
    <View style={{flex: 1, marginLeft: 13 * k}}>
      <RText size={16} weight='Medium' color={colors.PINK}>
        Invite Friends
      </RText>
      <RText size={14} weight='Light' color={colors.DARK_PURPLE}>
        To discover their favorite places!
      </RText>
    </View>
  </View>
);

export default InviteFriendsRow;
