// @flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react/native';

import ProfileAvatar from '../ProfileAvatar';
import Card from '../Card';
import {Profile} from 'wocky-client';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';
import MetaBar from './MetaBar';
import FollowButton from './FollowButton';

type Props = {
  profile: Profile,
};

const Header = observer((props: Props) => {
  const {profile} = props;
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      <Card style={styles.header}>
        <ProfileAvatar size={100} profile={profile} tappable={false} />
        <RText size={16} style={styles.displayName}>
          {profile.displayName}
        </RText>
        <RText size={13} style={styles.tagline}>
          {profile.tagline}
        </RText>
        {profile.botsSize !== undefined && <MetaBar profile={profile} />}
      </Card>
      <FollowButton {...props} />
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  displayName: {
    paddingTop: 10 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  tagline: {
    paddingBottom: 23 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
});
