// @flow

import React from 'react';
import {Alert, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {colors} from '../../constants';
import {Profile} from 'wocky-client';
import {Actions} from 'react-native-router-flux';
import ProfileItem from './ProfileItem';
import {RText} from '../common';
import {k} from '../Global';

const FollowButton = inject('analytics')(({profile, analytics}) => (
  <TouchableOpacity
    style={[styles.button, styles.follow]}
    onPress={async () => {
      await profile.follow();
      analytics.track('user_follow', profile.toJSON());
    }}
  >
    <View style={{flexDirection: 'row'}}>
      <Image source={require('../../../images/followPlus.png')} style={{marginRight: 7 * k}} />
      <RText size={10} color={colors.DARK_GREY}>
        FOLLOW
      </RText>
    </View>
  </TouchableOpacity>
));

const FollowingButton = inject('analytics')(({profile, analytics}) => (
  <TouchableOpacity
    style={[styles.button, styles.following]}
    onPress={async () => {
      await unfollow(profile);
      analytics.track('user_unfollow', profile.toJSON());
    }}
  >
    <RText size={10} color={colors.WHITE}>
      FOLLOWING
    </RText>
  </TouchableOpacity>
));

const BlockedButton = ({profile}) => (
  <TouchableOpacity style={[styles.button, styles.following]} onPress={() => unblock(profile)}>
    <RText size={10} color={colors.WHITE}>
      UNBLOCK
    </RText>
  </TouchableOpacity>
);

const unfollow = async (profile: Profile) => {
  return new Promise((resolve) => {
    Alert.alert(null, `Are you sure you want to unfollow @${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: async () => {
          await profile.unfollow();
          resolve();
        },
      },
    ]);
  });
};

const unblock = (profile) => {
  Alert.alert(null, `Are you sure you want to unblock @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unblock',
      style: 'destructive',
      onPress: profile.unblock,
    },
  ]);
};

type Props = {
  profile: Profile,
};

export const FollowableProfileItem = observer(({profile}: Props) => (
  <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.id})}>
    <ProfileItem isDay profile={profile}>
      {!profile.isOwn && (profile.isFollowed ? <FollowingButton profile={profile} /> : <FollowButton profile={profile} />)}
    </ProfileItem>
  </TouchableOpacity>
));

export const TappableProfileItem = observer(({profile}: Props) => (
  <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.id})}>
    <ProfileItem profile={profile} />
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
