import React from 'react'
import {View, Image, ViewStyle} from 'react-native'
import Avatar from './Avatar'
import {IProfile} from 'wocky-client'
import {k, avatarScale} from '../Global'

export type AvatarIcon = 'geo' | 'notification' | 'share'

type Props = {
  profile: IProfile
  type: AvatarIcon
  outerStyle?: ViewStyle
  size: number
}

const geoIcon = require('../../../images/notificationGeo.png')
const notificationIcon = require('../../../images/notificationMessage.png')
const shareLocationIcon = require('../../../images/notificationLocation.png')

const iconMap = {
  geo: geoIcon,
  notification: notificationIcon,
  share: shareLocationIcon,
}

const ActionAvatar = ({profile, type, outerStyle, size}: Props) => {
  return (
    <View style={[outerStyle, {paddingRight: 13 * k}]}>
      <Avatar size={size} profile={profile} hideDot />
      <Image
        source={iconMap[type]}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 5 * k,
          width: 26 * avatarScale,
          height: 26 * avatarScale,
        }}
      />
    </View>
  )
}

export default ActionAvatar
