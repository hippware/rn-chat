// @flow

import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';
import {k} from './Global';
import * as colors from '../constants/colors';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import Profile from '../model/Profile';
import {Actions} from 'react-native-router-flux';

type Props = {
  bot: Bot,
  action: string,
  timestamp: string,
  profile: Profile
};

const onProfile = (bot: Bot, profile: Profile) => {
  Actions.profileDetails({
    item: profile.user,
  });
};

export default observer((props: Props) => {
  const {bot, action, timestamp} = props;
  const profile = props.profile || bot.owner;
  return (
    <View style={{flexDirection: 'row', paddingVertical: 10 * k}}>
      <View style={{paddingHorizontal: 15 * k}}>
        <Avatar size={36 * k} profile={profile} />
      </View>
      <View style={{flex: 1, paddingRight: 15 * k}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => onProfile(bot, profile)}>
              <Text style={styles.hyperlink}>@{profile.handle}</Text>
            </TouchableOpacity>
            <Text style={styles.action}> {action}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.title, {color: location.isDay ? colors.DARK_PURPLE : colors.WHITE}]}>{bot.title}</Text>
          {bot.isSubscribed &&
            <View style={{width: 21 * k, height: 21 * k}}>
              <Image source={require('../../images/iconFollowingbot.png')} />
            </View>}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  hyperlink: {
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Medium',
    fontSize: 13 * k,
    letterSpacing: -0.1,
  },
  action: {
    color: colors.PURPLISH_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
    letterSpacing: -0.1,
  },
  title: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
  timestamp: {
    fontSize: 12 * k,
    fontFamily: 'Roboto-Light',
    textAlign: 'right',
    color: colors.DARK_GREY,
  },
});
