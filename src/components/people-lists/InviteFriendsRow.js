// @flow

import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Share} from 'react-native';

import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';
import {inject, observer} from 'mobx-react/native';

type Props = {
  style?: any,
  subtext?: string,
  botTitle?: string,
};

const InviteFriendsRow = inject('wocky')(observer(({style, subtext, botTitle, wocky}: Props) => {
  const {profile} = wocky;
  const handle = profile ? profile.handle : '';
  const message = botTitle
    ? `Hey, @${handle} invited you to check out "${botTitle}" on tinyrobot!`
    : `Hey! Check out my favorite places in the world on tinyrobot! Add me as @${handle}.`;
  return (
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
      onPress={() => share(message)}
    >
      <Image source={require('../../../images/iconBot.png')} style={{height: 37 * k, width: 37 * k}} resizeMode='contain' />
      <View style={{flex: 1, marginLeft: 13 * k}}>
        <RText size={16} weight='Medium' color={colors.PINK}>
            Invite Friends
        </RText>
        <RText size={14} weight='Light' color={colors.DARK_PURPLE}>
          {subtext || 'To discover their favorite places!'}
        </RText>
      </View>
    </TouchableOpacity>
  );
}));

async function share(message) {
  const res = await Share.share(
    {
      message: `${message} Download the app at`,
      // title: 'title',
      url: 'https://itunes.apple.com/app/apple-store/id1076718311?pt=117841011&ct=Invite%20Friends&mt=8',
    },
    {
      subject: 'Check out tinyrobot',
      // excludedActivityTypes: [],
      // tintColor: ''
    },
  );
  // console.log('res', res);
}

export default InviteFriendsRow;
