// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

import ProfileAvatar from '../ProfileAvatar';
import Card from '../Card';
import Profile from '../../model/Profile';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';
import MetaBar from './MetaBar';
import friendStore from '../../store/friendStore';

type Props = {
  profile: Profile,
  isDay: boolean,
};

@observer
class FollowButton extends React.Component {
  props;
  @observable pendingFollowChange: boolean = false;

  unfollow = () => {
    const {profile} = this.props;
    Alert.alert(null, `Are you sure you want to unfollow ${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: () => {
          this.pendingFollowChange = true;
          friendStore.unfollow(profile).then(() => (this.pendingFollowChange = false));
        },
      },
    ]);
  };

  follow = () => {
    const {profile} = this.props;
    this.pendingFollowChange = true;
    friendStore.follow(profile).then(() => {
      this.pendingFollowChange = false;
    });
  };

  render() {
    const {profile} = this.props;
    if (profile.isFollowed) {
      return (
        <View style={styles.followContainer}>
          <TouchableOpacity onPress={this.unfollow} style={styles.followButton} disabled={this.pendingFollowChange}>
            <Image source={require('../../../images/buttonFollowing.png')} />
          </TouchableOpacity>
        </View>
      );
    } else if (!profile.isOwn) {
      return (
        <View style={styles.followContainer}>
          <TouchableOpacity onPress={this.follow} style={styles.followButton} disabled={this.pendingFollowChange}>
            <Image source={require('../../../images/buttonFollow.png')} />
          </TouchableOpacity>
        </View>
      );
    } else return null;
  }
}

const Header = observer((props: Props) => {
  const {profile, isDay} = props;
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      <Card style={styles.header}>
        <ProfileAvatar size={100} isDay={isDay} profile={profile} tappable={false} />
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
  followContainer: {
    alignItems: 'center',
    height: 15 * k,
  },
  followButton: {
    marginTop: -30 * k,
  },
});
