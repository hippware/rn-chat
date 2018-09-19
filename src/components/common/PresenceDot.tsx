import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {k} from '../Global'
import {observer} from 'mobx-react/native'
import {colors} from '../../constants'
import {IProfile} from 'wocky-client'

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
  const backgroundColor = profile && profile.status === 'available' ? onlineColor : offlineColor
  const shift = size * k * 3 / 4
  const d = Math.max(10, size / 5) * k
  const theStyle = {
    borderRadius: d / 2,
    borderWidth: d / 10,
    height: d,
    width: d,
    top: shift,
    left: shift,
    ...style,
  }

  if (profile) {
    const {isOwn, isMutual} = profile
    if ((isMutual || isOwn) && !disableStatus) {
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
