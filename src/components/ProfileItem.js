// @flow

import React from 'react';
import {Image, View, Text} from 'react-native';
import Avatar from './Avatar';
import ProfileNameText from './ProfileNameText';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import Profile from '../model/Profile';

type Props = {
  profile: Profile,
  isDay: boolean,
  selected: boolean,
  style: ?Object,
  children: any,
};

const ProfileItem = ({profile, selected, isDay, style, children}: Props) => {
  return (
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
        <Avatar size={40} profile={profile} isDay={isDay} />
      </View>
      <View style={{flex: 1, padding: 7 * k}}>
        <ProfileNameText isDay={isDay}>
          @{profile.handle}
        </ProfileNameText>
        <Text
          isDay={isDay}
          style={{
            color: 'rgb(194,194,194)',
            fontFamily: 'Roboto-Medium',
            fontSize: 15 * k,
          }}
        >
          {profile.displayName}
        </Text>
      </View>
      {selected !== undefined &&
        <View style={{width: 40 * k, padding: 10 * k}}>
          <Image style={{right: 20 * k}} source={selected ? require('../../images/contactSelect.png') : require('../../images/addContactUnselectedV2.png')} />
        </View>}
      {children}
    </View>
  );
};

export default observer(ProfileItem);
