import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {avatarScale} from '../Global'
import {observer} from 'mobx-react'
import {colors} from '../../constants'
import {IProfile} from 'src/wocky'

const onlineColor = colors.LIGHT_BLUE
const offlineColor = 'rgb(211,211,211)'
const imgAnon = require('../../../images/follower.png')

type Props = {
  profile: IProfile
  size: number
  disableStatus?: boolean
  style?: any
}

const PresenceDot = observer(({profile, size, disableStatus, style}: Props) => {
  const backgroundColor = profile && profile.status === 'ONLINE' ? onlineColor : offlineColor
  const shift = (size * avatarScale * 3) / 4
  const d = Math.max(10, size / 5) * avatarScale
  const theStyle = {
    borderRadius: d / 2,
    borderWidth: d / 10,
    height: d,
    width: d,
    top: shift - 2 * avatarScale,
    left: shift,
    ...style,
  }

  if (profile) {
    const {isOwn, isFriend} = profile
    if ((isFriend || isOwn) && !disableStatus) {
      return <View style={[styles.dot, theStyle, {backgroundColor}]} />
    } else {
      return <Image source={imgAnon} style={[styles.dot, theStyle]} />
    }
  } else {
    return null
  }
})

export default PresenceDot

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    borderColor: 'white',
  },
})
