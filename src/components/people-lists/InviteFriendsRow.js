// @flow

import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Share} from 'react-native';

import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';
import {inject, observer} from 'mobx-react/native';

const share = async (profile) => {
  const res = await Share.share(
    {
      message: `Hey! Check out my favorite places in the world on tinyrobot! Add me as @${profile.handle}. Download the app`,
      // title: 'title',
      url: 'https://itunes.apple.com/app/apple-store/id1076718311?mt=8',
    },
    {
      subject: 'Check out tinyrobot',
      // excludedActivityTypes: [],
      // tintColor: ''
    },
  );
  // console.log('res', res);
};

const InviteFriendsRow = inject('wocky')(observer(({wocky, style}) => (
  <TouchableOpacity
    style={[
      {
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.DARK_GREY,
        padding: 13 * k,
        alignItems: 'center',
      },
      style,
    ]}
    onPress={() => share(wocky.profile)}
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
  </TouchableOpacity>
)));

export default InviteFriendsRow;
