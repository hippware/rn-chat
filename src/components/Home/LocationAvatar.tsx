import React from 'react'
import {View, Image, Text, ImageBackground} from 'react-native'
import {Avatar} from '../common'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  hidden?: boolean
  tappable?: boolean
  noFade?: boolean
}

const avatarBG = require('../../../images/LocationAvatar.png')
const avatarBGNoRing = require('../../../images/LocationAvatarNoRing.png')
const avatarBGGray = require('../../../images/LocationAvatarGray.png')
const activity = require('../../../images/activity-outer.png')
const unreadCounter = require('../../../images/unreadBG.png')

const activityEmojis = {
  walking: '🚶',
  on_foot: '🚶',
  on_bicycle: '🚴',
  running: '🏃',
  in_vehicle: '🚗',
}

const Badge = ({style, background, text}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={background} style={{position: 'absolute'}} resizeMode="contain" />
      <Text style={[{bottom: 3, color: 'white'}, style]}>{text}</Text>
    </View>
  )
}

const LocationAvatar = ({profile, hidden, tappable, noFade}: Props) => {
  const sharesLocation = profile.isLocationShared
  const currentActivity = profile.currentActivity
  const isStill = currentActivity === 'still'
  const inactive = hidden || isStill || (!profile.isOwn && !sharesLocation)
  const currentBG = inactive ? avatarBGGray : sharesLocation && !isStill ? avatarBG : avatarBGNoRing
  const theActivity = activityEmojis[currentActivity || '']
  return (
    <ImageBackground
      source={currentBG}
      style={{
        marginVertical: -9,
        marginHorizontal: -5,
        paddingTop: 17,
        width: 85,
        height: 87,
        alignItems: 'center',

        paddingLeft: 1.2,
        opacity: isStill && !noFade ? 0.4 : 1,
      }}
    >
      <Avatar
        noScale
        size={54}
        inactive={inactive}
        profile={profile}
        hideDot
        borderWidth={0}
        tappable={tappable}
      />
      {!!profile.unreadCount && (
        <Badge style={{top: 1}} text={profile.unreadCount} background={unreadCounter} />
      )}
      {!profile.unreadCount && !!theActivity && (
        <Badge style={{left: 1}} text={theActivity} background={activity} />
      )}
    </ImageBackground>
  )
}

export default LocationAvatar
