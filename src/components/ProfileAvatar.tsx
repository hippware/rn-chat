import React from 'react'
import {View} from 'react-native'
import Avatar from './common/Avatar'
import {IProfile} from 'wocky-client'
import MessageButton from './ProfileDetail/MessagProfileCTA'

type Props = {
  profile: IProfile
  tappable?: boolean
  size: number
  style?: any
  wrapperStyle?: any
  fontSize?: 'large' | 'small'
  fontFamily?: any
  borderColor?: any
  hideDot?: any
}

const ProfileAvatar = (props: Props) => {
  const {size = 65, tappable = true, wrapperStyle, fontSize, fontFamily, profile} = props
  return (
    <View style={[{alignItems: 'center', height: size}, wrapperStyle]}>
      <Avatar
        {...props}
        tappable={tappable}
        size={size}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
      <MessageButton profile={profile} />
    </View>
  )
}

export default ProfileAvatar
