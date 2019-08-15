import React from 'react'
import {View, Image, Text, ImageBackground} from 'react-native'
import {Avatar} from '../common'
import {IProfile} from 'wocky-client'
import {UserActivityType} from 'third-party/wocky-client/src/transport/types'

type Props = {
  profile: IProfile
  hidden?: boolean
  tappable?: boolean
  sharesLocation: boolean
  currentActivity?: UserActivityType | null
  noFade?: boolean
  isYou?: boolean
}

const avatarBG = require('../../../images/LocationAvatar.png')
const avatarBGNoRing = require('../../../images/LocationAvatarNoRing.png')
const avatarBGGray = require('../../../images/LocationAvatarGray.png')
const activity = require('../../../images/activity-outer.png')
const activityEmojis = {
  walking: '🚶',
  on_foot: '🚶',
  on_bicycle: '🚴',
  running: '🏃',
  in_vehicle: '🚗',
}

const LocationAvatar = ({
  profile,
  sharesLocation,
  hidden,
  tappable,
  currentActivity,
  noFade,
  isYou,
}: Props) => {
  const isStill = currentActivity === 'still'
  const currentBG =
    hidden || isStill
      ? avatarBGGray
      : isYou || (sharesLocation && !isStill)
      ? avatarBG
      : avatarBGNoRing
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
        profile={profile}
        hideDot
        borderWidth={0}
        tappable={tappable}
        isYou={isYou}
      />
      {theActivity && (
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
          <Image source={activity} style={{position: 'absolute'}} resizeMode="contain" />
          <Text style={{bottom: 3, left: 1}}>{theActivity}</Text>
        </View>
      )}
    </ImageBackground>
  )
}

export default LocationAvatar
