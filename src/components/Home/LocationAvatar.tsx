import React from 'react'
import {View, Image} from 'react-native'
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
}

const walking = require('../../../images/walking.png')
const activityImages = {
  walking,
  on_foot: walking,
  on_bicycle: walking,
  running: walking,
  in_vehicle: require('../../../images/driving.png'),
}

const LocationAvatar = ({profile, sharesLocation, hidden, tappable, currentActivity}: Props) => {
  const isStill = currentActivity === 'still'
  const color = hidden || isStill ? colors.DARK_GREY : colors.PINK
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: color,
        borderWidth: sharesLocation && !isStill ? 1 : 0,
        borderRadius: 50,
        paddingTop: 3.3,
        paddingHorizontal: 3.3,
        height: 63.6,
        width: 63.6,
        opacity: isStill ? 0.4 : 1,
      }}
    >
      <Avatar noScale size={54} profile={profile} hideDot borderColor={color} tappable={tappable} />
      {currentActivity && activityImages[currentActivity] && (
        <Image
          source={activityImages[currentActivity]}
          style={{position: 'absolute', top: -12, right: -7, height: 35, width: 35}}
        />
      )}
      <Triangle width={8} height={8} color={color} direction="down" />
    </View>
  )
}

export default LocationAvatar
