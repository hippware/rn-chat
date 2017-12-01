// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import Profile from '../../model/Profile';
import {k} from '../Global';
import friendStore from '../../store/friendStore';

type Props = {
  profile: Profile,
};

@observer
class FollowButton extends React.Component<Props> {
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

export default FollowButton;

const styles = StyleSheet.create({
  followContainer: {
    alignItems: 'center',
    height: 15 * k,
  },
  followButton: {
    marginTop: -30 * k,
  },
});
