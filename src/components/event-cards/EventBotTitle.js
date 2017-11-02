// @flow

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Avatar from '../common/Avatar';
import {k} from '../Global';
import * as colors from '../../constants/colors';
import Bot from '../../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../../store/locationStore';
import Profile from '../../model/Profile';
import {Actions} from 'react-native-router-flux';
import {RText, ProfileHandle} from '../common';

type Props = {
  bot: Bot,
  action: string,
  timestamp: string,
  profile: Profile,
  style: any,
};

const onProfile = (bot: Bot, profile: Profile) => {
  Actions.profileDetails({
    item: profile.user,
  });
};

const EventBotTitle = (props: Props) => {
  const {bot, action, timestamp, style} = props;
  const profile = props.profile || bot.owner;
  return (
    <View style={[{flexDirection: 'row', paddingVertical: 10 * k, paddingHorizontal: 15 * k, borderBottomWidth: 1, borderColor: colors.GREY}, style]}>
      <Avatar size={36 * k} profile={profile} style={{marginRight: 15 * k}} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <ProfileHandle profile={profile} onPress={() => onProfile(bot, profile)} textStyle={styles.text} />
            <RText size={13} color={colors.PURPLISH_GREY} style={styles.text}>
              {' '}
              {action}
            </RText>
          </View>
          <RText size={12} weight='Light' style={{flex: 1, textAlign: 'right'}} color={colors.DARK_GREY}>
            {timestamp}
          </RText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RText size={15} color={location.isDay ? colors.DARK_PURPLE : colors.WHITE} style={{flex: 1}}>
            {bot.title}
          </RText>
          {bot.isSubscribed && <Image source={require('../../../images/iconFollowingbot.png')} />}
        </View>
      </View>
    </View>
  );
};

export default observer(EventBotTitle);

const styles = StyleSheet.create({
  text: {
    letterSpacing: -0.1,
  },
});
