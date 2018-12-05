import React from 'react'
import {View} from 'react-native'
import Avatar from './common/Avatar'
import {k} from './Global'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  tappable?: boolean
  size: number
  style?: any
  wrapperStyle?: any
  fontSize?: 'large' | 'small'
  fontFamily?: any
}

const ProfileAvatar = (props: Props) => {
  const {size = 65, tappable = true, wrapperStyle, fontSize, fontFamily} = props
  return (
    <View style={[{alignItems: 'center', height: size * k}, wrapperStyle]}>
      <Avatar
        {...props}
        tappable={tappable}
        size={size}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
    </View>
  )
}

export default ProfileAvatar
