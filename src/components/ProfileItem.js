// @flow

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Avatar from './Avatar';
import ProfileNameText from './ProfileNameText';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import Profile from '../model/Profile';
import {colors} from '../constants';

type Props = {
  profile: Profile,
  isDay: boolean,
  selected: ?boolean,
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
      {selected !== undefined && selected ? <FollowingButton /> : <FollowButton />
      // <View style={{width: 40 * k, padding: 10 * k}}>
      //   <Image style={{right: 20 * k}} source={selected ? require('../../images/contactSelect.png') : require('../../images/addContactUnselectedV2.png')} />
      // </View>
      }
      {children}
    </View>
  );
};

const FollowButton = () =>
  (<View style={[styles.button, styles.follow]}>
    <Text style={[styles.btnText, styles.followBtnText]}>FOLLOW</Text>
  </View>);

const FollowingButton = () =>
  (<View style={[styles.button, styles.following]}>
    <Text style={[styles.btnText, styles.followingBtnText]}>FOLLOWING</Text>
  </View>);

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
