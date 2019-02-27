import React from 'react'
import {View} from 'react-native'
import {colors} from '../../constants'
import {Avatar} from '../common'
import Triangle from '../map/Triangle'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  hidden?: boolean
  tappable?: boolean
}
const LocationAvatar = ({profile, hidden, tappable}: Props) => {
  const color = hidden ? colors.DARK_GREY : colors.PINK
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: color,
        borderWidth: profile.sharesLocation ? 1 : 0,
        borderRadius: 50,
        paddingTop: 3.3,
        paddingHorizontal: 3.3,
        height: 63.6,
        width: 63.6,
      }}
    >
      <Avatar noScale size={54} profile={profile} hideDot borderColor={color} tappable={tappable} />
      <Triangle width={8} height={8} color={color} direction="down" />
    </View>
  )
}

export default LocationAvatar
