import React from 'react'
import EventCardTemplate from './EventCardTemplate'
import {IEventUserFollow, IProfile} from 'wocky-client'
import {StyleSheet} from 'react-native'
import alert from '../../utils/alert'
import {inject, observer} from 'mobx-react/native'
import {RText} from '../common'
import {colors} from '../../constants'
import GradientButton from '../common/GradientButton'

const geoIcon = require('../../../images/notificationFollow.png')

type Props = {
  item: IEventUserFollow
  user: IProfile
}

const EventUserFollowCard = observer(({item: {relativeDateAsString, user}}: Props) => (
  <EventCardTemplate
    timestamp={relativeDateAsString}
    action={'wants to connect with you.'}
    icon={geoIcon}
    profile={user}
    rightColumnElement={<FollowButton profile={user} />}
  />
))

export default EventUserFollowCard

type FollowProps = {
  profile: IProfile
  analytics?: any
}

const FollowButton = inject('analytics')(
  observer(({profile, analytics}: FollowProps) => {
    const {follow, isFollowed} = profile
    return (
      <GradientButton
        style={[styles.button, isFollowed ? styles.following : styles.follow]}
        isPink={isFollowed}
        offColor="white"
        onPress={async () => {
          if (isFollowed) {
            await unfollow(profile)
          } else {
            await follow()
            analytics.track('user_follow', (profile as any).toJSON())
          }
        }}
      >
        <RText size={10.5} weight="Medium" color={isFollowed ? 'white' : colors.PINK}>
          {isFollowed ? 'FRIENDS' : 'CONNECT'}
        </RText>
      </GradientButton>
    )
  })
)

const unfollow = async (profile: any) => {
  return new Promise(resolve => {
    alert(null, `Are you sure you want to unfriend @${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfriend',
        style: 'destructive',
        onPress: async () => {
          await profile.unfollow()
          resolve()
        },
      },
    ])
  })
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    width: 71,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3.6,
  },
  follow: {
    borderColor: colors.PINK,
    borderWidth: 1,
  },
  following: {},
})
