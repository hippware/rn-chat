import React from 'react'
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native'
import {observer} from 'mobx-react'
import {colors} from '../../constants'
import {Actions} from 'react-native-router-flux'
import ProfileItem from './ProfileItem'
import {RText, GradientButton} from '../common'
import {k} from '../Global'
import alert from '../../utils/alert'
import {useAnalytics} from 'src/utils/injectors'

const FollowButton = ({profile}) => {
  const {track} = useAnalytics()
  return (
    <TouchableOpacity
      style={[styles.button, styles.follow]}
      onPress={async () => {
        await profile.follow()
        track('user_follow', profile.toJSON())
      }}
    >
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../../../images/followPlus.png')} style={{marginRight: 7 * k}} />
        <RText size={10} color={colors.DARK_GREY}>
          FOLLOW
        </RText>
      </View>
    </TouchableOpacity>
  )
}

const FollowingButton = ({profile}) => {
  const {track} = useAnalytics()
  return (
    <TouchableOpacity
      style={[styles.button, styles.following]}
      onPress={async () => {
        await unfollow(profile)
        track('user_unfollow', profile.toJSON())
      }}
    >
      <RText size={10} color={colors.WHITE}>
        FOLLOWING
      </RText>
    </TouchableOpacity>
  )
}

const unfollow = async (profile: any) => {
  return new Promise(resolve => {
    alert(null, `Are you sure you want to unfollow @${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: async () => {
          await profile.unfollow()
          resolve()
        },
      },
    ])
  })
}

const unblock = profile => {
  alert(null, `Are you sure you want to unblock @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unblock',
      style: 'destructive',
      onPress: profile.unblock,
    },
  ])
}

type Props = {
  profile: any
}

export const FollowableProfileItem = observer(({profile}: Props) => (
  <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.id, preview: false})}>
    <ProfileItem profile={profile}>
      {!profile.isOwn &&
        (profile.isFollowed ? (
          <FollowingButton profile={profile} />
        ) : (
          <FollowButton profile={profile} />
        ))}
    </ProfileItem>
  </TouchableOpacity>
))

export const BlockableProfileItem = ({profile}: Props) => (
  <ProfileItem profile={profile} tappable={false} style={{paddingHorizontal: 15}}>
    <GradientButton
      style={[styles.button, styles.following]}
      isPink
      onPress={() => unblock(profile)}
    >
      <RText size={13} color={colors.WHITE} weight={'Medium'}>
        UNBLOCK
      </RText>
    </GradientButton>
  </ProfileItem>
)

const styles = StyleSheet.create({
  button: {
    height: 31,
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PINK,
    borderRadius: 4,
  },
  follow: {
    backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREY,
    borderWidth: 1,
  },
  following: {
    backgroundColor: colors.PINK,
  },
})
