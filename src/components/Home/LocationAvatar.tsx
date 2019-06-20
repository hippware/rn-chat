import React from 'react'
import {View, Image, Text} from 'react-native'
import {colors} from '../../constants'
import {Avatar} from '../common'
import Triangle from '../map/Triangle'
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
  const color = hidden || isStill ? colors.DARK_GREY : colors.PINK
  const theActivity = activityEmojis[currentActivity || '']
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: color,
        borderWidth: isYou || (sharesLocation && !isStill) ? 1 : 0,
        borderRadius: 50,
        paddingTop: 3.3,
        paddingHorizontal: 3.3,
        height: 63.6,
        width: 63.6,
        opacity: isStill && !noFade ? 0.4 : 1,
      }}
    >
      <Avatar
        noScale
        size={54}
        profile={profile}
        hideDot
        borderColor={color}
        tappable={tappable}
        isYou={isYou}
      />
      {theActivity && (
        <View
          style={{
            position: 'absolute',
            top: -12,
            right: -7,
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
      <Triangle width={8} height={8} color={color} direction="down" />
    </View>
  )
}

export default LocationAvatar
