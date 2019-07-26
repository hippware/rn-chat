import React from 'react'
import EventCardTemplate from './EventCardTemplate'
import {IEventFriendInvite, IProfile} from 'wocky-client'
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native'
import alert from '../../utils/alert'
import {inject, observer} from 'mobx-react'
import {RText} from '../common'
import {colors} from '../../constants'
import GradientButton from '../common/GradientButton'

type Props = {
  item: IEventFriendInvite
  user: IProfile
}

const EventFriendInviteRequestCard = observer(({item}: Props) => (
  <EventCardTemplate
    timestamp={item.relativeDateAsString}
    action={'wants to connect with you.'}
    iconType="geo"
    profile={item.user}
    rightColumnElement={<ConnectButton item={item} />}
  />
))

export default EventFriendInviteRequestCard

type ConnectProps = {
  item: IEventFriendInvite
  analytics?: any
}

const ConnectButton = inject('analytics')(
  observer(({item, analytics}: ConnectProps) => {
    const profile = item.user
    const {isFriend} = profile
    return isFriend ? (
      <GradientButton
        style={[styles.button, isFriend ? styles.friend : styles.notFriend]}
        isPink={isFriend}
        offColor="white"
        onPress={async () => {
          if (isFriend) {
            await unfriend(profile)
          } else {
            await invite(item, analytics)
          }
        }}
      >
        <RText size={10.5} weight="Medium" color={isFriend ? 'white' : colors.PINK}>
          FRIENDS
        </RText>
      </GradientButton>
    ) : (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => invite(item, analytics)}>
          <Image style={{marginRight: 5}} source={require('../../../images/friendAccept.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => decline(item)}>
          <Image source={require('../../../images/friendDecline.png')} />
        </TouchableOpacity>
      </View>
    )
  })
)

const invite = async (item: IEventFriendInvite, analytics: any) => {
  const profile = item.user
  await profile.invite()
  await item.removeAfterDelay(2) // remove the item after 2 sec
  analytics.track('user_follow', (profile as any).toJSON())
}

const decline = async (item: IEventFriendInvite) => {
  await item.remove()
}

const unfriend = async (profile: IProfile) => {
  return new Promise(resolve => {
    alert(null, `Are you sure you want to unfriend @${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfriend',
        style: 'destructive',
        onPress: async () => {
          await profile.unfriend()
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
  friend: {
    borderColor: colors.PINK,
    borderWidth: 1,
  },
  notFriend: {},
})
