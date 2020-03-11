import React from 'react'
import EventCardTemplate from './EventCardTemplate'
import {IEventFriendInvite, IProfile} from 'src/wocky'
import {StyleSheet, Image, View, TouchableOpacity, Alert} from 'react-native'
import {observer} from 'mobx-react'
import {RText} from '../common'
import {colors} from '../../constants'
import GradientButton from '../common/GradientButton'
import {useAnalytics} from 'src/utils/injectors'
import {Props as LocationSettingsProps} from '../LiveLocation/LocationSettingsModal'
import {Actions} from 'react-native-router-flux'

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
}

const ConnectButton = observer(({item}: ConnectProps) => {
  const analytics = useAnalytics()
  const profile = item.user
  const {isFriend} = profile

  const onFriendAccept = () => {
    Actions.locationSettingsModal({
      settingsType: 'ACCEPT_REQUEST',
      profile,
      displayName: profile.firstName,
      onOkPress: shareType => {
        profile.invite(shareType).then(() => {
          analytics.track('user_follow', (profile as any).toJSON())
        })
        Actions.pop()
      },
    } as LocationSettingsProps)
  }

  return isFriend ? (
    <GradientButton
      style={[styles.button, isFriend ? styles.friend : styles.notFriend]}
      isPink={isFriend}
      offColor="white"
      onPress={() => {
        Alert.alert('', `Are you sure you want to unfriend @${profile.handle}?`, [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Unfriend',
            style: 'destructive',
            onPress: () => profile.unfriend(),
          },
        ])
      }}
    >
      <RText size={10.5} weight="Medium" color={isFriend ? 'white' : colors.PINK}>
        FRIENDS
      </RText>
    </GradientButton>
  ) : (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onFriendAccept}>
        <Image style={{marginRight: 5}} source={require('../../../images/friendAccept.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={item.remove}>
        <Image source={require('../../../images/friendDecline.png')} />
      </TouchableOpacity>
    </View>
  )
})

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
