// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';

import {Profile} from 'wocky-client';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';

const Separator = () => <View style={{width: 1 * k, top: 7 * k, height: 34 * k, backgroundColor: colors.SILVER}} />;

const NewFollowerDot = () => (
  <View
    style={{
      height: 1,
      width: 1,
      borderWidth: 4,
      borderColor: colors.PINK,
      borderRadius: 4,
    }}
  />
);

const MetaBar = observer(({profile}: {profile: Profile}) => (
  <View style={styles.metabar}>
    <View style={{flex: 1}}>
      <RText size={22} style={styles.number}>
        {profile.botsSize}
      </RText>
      <RText weight='Light' size={11} style={styles.word}>
        BOTS
      </RText>
    </View>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.followers({userId: profile.id})}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <RText size={22} style={styles.number}>
          {profile.followersSize}
        </RText>
        {/* TODO restore this {profile.isOwn && model.friends.newFollowers.length > 0 && <NewFollowerDot />} */}
      </View>
      <RText weight='Light' size={11} style={styles.word}>
        FOLLOWERS
      </RText>
    </TouchableOpacity>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.followed({userId: profile.id})}>
      <RText size={22} style={styles.number}>
        {profile.followedSize}
      </RText>

      <RText weight='Light' size={11} style={styles.word}>
        FOLLOWING
      </RText>
    </TouchableOpacity>
  </View>
));

export default MetaBar;

const styles = StyleSheet.create({
  metabar: {
    flexDirection: 'row',
    paddingBottom: 30 * k,
  },
  number: {
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  word: {
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
});
