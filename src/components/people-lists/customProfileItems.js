// @flow

import React from 'react';
import {Alert, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';
import Profile from '../../model/Profile';
import friendStore from '../../store/friendStore';
import {Actions} from 'react-native-router-flux';
import ProfileItem from './ProfileItem';
import {RText} from '../common';
import {k} from '../Global';

const FollowButton = ({profile}) => (
  <TouchableOpacity style={[styles.button, styles.follow]} onPress={() => friendStore.add(profile)}>
    <View style={{flexDirection: 'row'}}>
      <Image source={require('../../../images/followPlus.png')} style={{marginRight: 7 * k}} />
      <RText size={10} color={colors.DARK_GREY}>
        FOLLOW
      </RText>
    </View>
  </TouchableOpacity>
);

const FollowingButton = ({profile}) => (
  <TouchableOpacity style={[styles.button, styles.following]} onPress={() => unfollow(profile)}>
    <RText size={10} color={colors.WHITE}>
      FOLLOWING
    </RText>
  </TouchableOpacity>
);

const BlockedButton = ({profile}) => (
  <TouchableOpacity style={[styles.button, styles.following]} onPress={() => unblock(profile)}>
    <RText size={10} color={colors.WHITE}>
      UNBLOCK
    </RText>
  </TouchableOpacity>
);

const unfollow = (profile: Profile) => {
  Alert.alert(null, `Are you sure you want to unfollow @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unfollow',
      style: 'destructive',
      onPress: () => {
        friendStore.unfollow(profile);
      },
    },
  ]);
};

const unblock = (profile) => {
  Alert.alert(null, `Are you sure you want to unblock @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unblock',
      style: 'destructive',
      onPress: () => {
        friendStore.unblock(profile);
      },
    },
  ]);
};

type Props = {
  profile: Profile,
};

export const FollowableProfileItem = observer(({profile}: Props) => (
  <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.user})}>
    <ProfileItem isDay profile={profile}>
      {!profile.isOwn && (profile.isFollowed ? <FollowingButton profile={profile} /> : <FollowButton profile={profile} />)}
    </ProfileItem>
  </TouchableOpacity>
));

export const BlockableProfileItem = ({profile}: Props) => (
  <ProfileItem isDay profile={profile} tappable={false}>
    <BlockedButton profile={profile} />
  </ProfileItem>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10 * k,
    marginRight: 10 * k,
    width: 100 * k,
    alignItems: 'center',
    borderRadius: 2 * k,
  },
  follow: {
    backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREY,
    borderWidth: 1,
  },
  following: {
    backgroundColor: colors.PINK,
  },
});
