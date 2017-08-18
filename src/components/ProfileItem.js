// @flow

import React from 'react';
import {View, Alert, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Avatar from './Avatar';
import ProfileNameText from './ProfileNameText';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import Profile from '../model/Profile';
import {colors} from '../constants';
import friendStore from '../store/friendStore';

type Props = {
  profile: Profile,
  isDay: boolean,
  style: ?Object,
  children: any,
  showFollowButtons?: boolean,
};

const ProfileItem = ({profile, isDay, style, children, showFollowButtons}: Props) => {
  return profile && profile.handle
    ? <View
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
      {!profile.isOwn && showFollowButtons && (profile.isFollowed ? <FollowingButton profile={profile} /> : <FollowButton profile={profile} />)}
      {children}
    </View>
    : null;
};

export const unfollow = (profile: Profile) => {
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


const FollowButton = ({profile}) =>
  (<TouchableOpacity style={[styles.button, styles.follow]} onPress={() => friendStore.add(profile)}>
    <Text style={[styles.btnText, styles.followBtnText]}>FOLLOW</Text>
  </TouchableOpacity>);

const FollowingButton = ({profile}) =>
  (<TouchableOpacity style={[styles.button, styles.following]} onPress={() => unfollow(profile)}>
    <Text style={[styles.btnText, styles.followingBtnText]}>FOLLOWING</Text>
  </TouchableOpacity>);

export default observer(ProfileItem);

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
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
  },
  followBtnText: {color: colors.DARK_GREY},
  followingBtnText: {color: colors.WHITE},
});
