// @flow

import React from 'react'
import {StyleSheet, TouchableOpacity, Image, View, Alert, ActivityIndicator} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {Profile} from 'wocky-client'
import {k} from '../Global'

type Props = {
  profile: Profile
}

const imgFollowing = require('../../../images/buttonFollowing.png')
const imgFollow = require('../../../images/buttonFollow.png')

@inject('analytics')
@observer
class FollowButton extends React.Component<Props> {
  @observable pendingFollowChange: boolean = false

  toggleFollow = async () => {
    const {profile} = this.props
    this.pendingFollowChange = true
    if (profile.isFollowed) {
      Alert.alert(null, `Are you sure you want to unfollow ${profile.handle}?`, [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Unfollow',
          style: 'destructive',
          onPress: async () => {
            this.pendingFollowChange = true
            await profile.unfollow()
            this.props.analytics.track('user_unfollow', profile.toJSON())
            this.pendingFollowChange = false
          },
        },
      ])
    } else {
      await profile.follow()
      this.props.analytics.track('user_follow', profile.toJSON())
      this.pendingFollowChange = false
    }
  }

  render() {
    const {profile} = this.props
    return !profile.isOwn ? (
      <View style={styles.followContainer}>
        <TouchableOpacity
          onPress={this.toggleFollow}
          style={styles.followButton}
          disabled={this.pendingFollowChange}
        >
          {this.pendingFollowChange ? (
            <ActivityIndicator />
          ) : (
            <Image source={profile.isFollowed ? imgFollowing : imgFollow} />
          )}
        </TouchableOpacity>
      </View>
    ) : null
  }
}

export default FollowButton

const styles = StyleSheet.create({
  followContainer: {
    alignItems: 'center',
    height: 15 * k,
  },
  followButton: {
    marginTop: -30 * k,
  },
})
