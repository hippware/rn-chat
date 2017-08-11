// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {backgroundColorCardDay, backgroundColorCardNight} from '../constants/colors';
import assert from 'assert';
import Profile from '../model/Profile';
import ProfileItem from './ProfileItem';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';

type Props = {
  profile: Profile,
  isDay: boolean,
  children: any,
};

const FriendCard = ({profile, isDay, children}: Props) => {
  assert(profile, 'Profile is not defined');
  const backgroundColor = isDay ? backgroundColorCardDay : backgroundColorCardNight;
  return (
    <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.user})}>
      <ProfileItem profile={profile} isDay={isDay} style={{backgroundColor}}>
        {children}
      </ProfileItem>
    </TouchableOpacity>
  );
};

export default observer(FriendCard);
