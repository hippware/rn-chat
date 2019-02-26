import React from 'react'
import {View} from 'react-native'
import {colors} from '../../constants'
import {Avatar} from '../common'
import Triangle from '../map/Triangle'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  hidden?: boolean
}
const LocationAvatar = ({profile, hidden}: Props) => {
  const color = hidden ? colors.DARK_GREY : colors.PINK
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: color,
        borderWidth: 1,
        borderRadius: 50,
        paddingTop: 3.3,
        paddingHorizontal: 3.3,
        height: 63.6,
        width: 63.6,
      }}
    >
      <Avatar noScale size={54} profile={profile} hideDot borderColor={color} />
      <Triangle width={8} height={8} color={color} direction="down" />
    </View>
  )
}

export default LocationAvatar
