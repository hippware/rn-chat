import React from 'react'
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import alert from '../../utils/alert'
import {IProfile} from 'wocky-client'
import {colors} from 'src/constants'
import {RText, Spinner} from '../common'
import {Actions} from 'react-native-router-flux'

type Props = {
  profile: IProfile
  analytics?: any
  myProfile?: any
}

const imgFollowing = require('../../../images/button_friends.png')

@inject('analytics')
@observer
class ConnectButton extends React.Component<Props> {
  @observable pendingFollowChange: boolean = false

  toggleFollow = async () => {
    const {profile} = this.props
    if (profile.isFriend) {
      alert(null, `Are you sure you want to unfriend @${profile.handle}?`, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            this.pendingFollowChange = false
          },
        },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: async () => {
            this.pendingFollowChange = true
            await profile.unfriend()
            this.props.analytics.track('user_unfollow', this.props.myProfile.toJSON())
            this.pendingFollowChange = false
          },
        },
      ])
    } else {
      await profile.invite()
      this.props.analytics.track('user_follow', this.props.myProfile.toJSON())
      this.pendingFollowChange = false
    }
  }

  render() {
    const {profile} = this.props
    return !profile.isOwn ? (
      <TouchableOpacity
        onPress={this.toggleFollow}
        style={styles.followButton}
        disabled={this.pendingFollowChange}
      >
        {this.pendingFollowChange ? (
          <Spinner color="pink" />
        ) : profile.isFriend ? (
          <Image source={imgFollowing} />
        ) : profile.hasSentInvite || profile.hasReceivedInvite ? (
          <View style={[styles.profileButton, styles.requestedButton]}>
            <RText size={15} color={colors.GREY} weight={'Medium'}>
              {profile.hasSentInvite ? 'Request Received' : 'Request Sent'}
            </RText>
          </View>
        ) : (
          <View style={[styles.profileButton, styles.connectButton]}>
            <RText size={15} color={colors.PINK} weight={'Medium'}>
              Connect
            </RText>
          </View>
        )}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={Actions.myAccount}
        style={{
          marginTop: 15,
        }}
        testID="editProfileButton"
      >
        <View style={[styles.profileButton, styles.editProfileButton]}>
          <RText size={15} color={'#757575'} weight={'Medium'}>
            Edit Profile
          </RText>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ConnectButton

const styles = StyleSheet.create({
  followButton: {
    marginTop: 15,
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
  editProfileButton: {
    borderColor: '#DEDEDE',
  },
  connectButton: {
    borderColor: colors.PINK,
  },
  requestedButton: {
    borderColor: colors.GREY,
  },
})
