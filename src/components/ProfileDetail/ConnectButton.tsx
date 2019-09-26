import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import {observer} from 'mobx-react-lite'
import alert from '../../utils/alert'
import {IProfile} from 'wocky-client'
import {colors} from 'src/constants'
import {RText, Spinner} from '../common'
import {Actions} from 'react-native-router-flux'
import {useAnalytics} from 'src/utils/injectors'

type Props = {
  profile: IProfile
  myProfile?: any
}

const imgFollowing = require('../../../images/button_friends.png')

const ConnectButton = observer(({profile, myProfile}: Props) => {
  const [pendingFollowChange, setPendingFollowChange] = useState(false)
  const {track} = useAnalytics()

  const toggleFollow = async () => {
    if (profile.isFriend) {
      alert(null, `Are you sure you want to unfriend @${profile.handle}?`, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setPendingFollowChange(false)
          },
        },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: async () => {
            setPendingFollowChange(true)
            await profile.unfriend()
            track('user_unfollow', myProfile.toJSON())
            setPendingFollowChange(false)
          },
        },
      ])
    } else {
      await profile.invite()
      track('user_follow', myProfile.toJSON())
      setPendingFollowChange(false)
    }
  }

  return !profile.isOwn ? (
    <TouchableOpacity
      onPress={toggleFollow}
      style={styles.followButton}
      disabled={pendingFollowChange}
    >
      {pendingFollowChange ? (
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
})

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
