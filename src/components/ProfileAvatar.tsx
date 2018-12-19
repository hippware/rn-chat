import React from 'react'
import {View} from 'react-native'
import Avatar from './common/Avatar'
import {IProfile} from 'wocky-client'
import MessageButton from './ProfileDetail/MessagProfileCTA'
import {observer} from 'mobx-react/native'

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
  messageBtn?: boolean
}

const ProfileAvatar = observer((props: Props) => {
  const {
    size = 65,
    tappable = true,
    wrapperStyle,
    fontSize,
    fontFamily,
    profile,
    messageBtn = false,
  } = props
  return (
    <View style={[{alignItems: 'center', height: size}, wrapperStyle]}>
      <Avatar
        {...props}
        tappable={tappable}
        size={size}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
      {messageBtn && <MessageButton profile={profile} />}
    </View>
  )
})

export default ProfileAvatar
