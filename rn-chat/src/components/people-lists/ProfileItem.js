// @flow

import React from 'react';
import {View, Text, Image} from 'react-native';
import Avatar from '../common/Avatar';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import {Profile} from 'wocky-client';
import {ProfileHandle} from '../common';

type Props = {
  profile: Profile,
  style: ?Object,
  children: any,
  selected?: boolean,
  tappable?: boolean,
};

const ProfileItem = observer(({profile, style, children, selected, tappable}: Props) => {
  return profile && profile.handle ? (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          padding: 3 * k,
          paddingRight: 0,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <View style={{padding: 5 * k}}>
        <Avatar size={40} profile={profile} tappable={tappable !== false} />
      </View>
      <View style={{flex: 1, padding: 7 * k}}>
        <ProfileHandle size={15} profile={profile} />
        <Text
          style={{
            color: 'rgb(194,194,194)',
            fontFamily: 'Roboto-Medium',
            fontSize: 15 * k,
          }}
        >
          {profile.displayName}
        </Text>
      </View>
      {selected !== undefined && (
        <View style={{width: 40 * k, padding: 10 * k}}>{selected && <Image style={{right: 20 * k}} source={require('../../../images/contactSelect.png')} />}</View>
      )}
      {children}
    </View>
  ) : null;
});

export default ProfileItem;
