import React from 'react'
import {TouchableOpacity} from 'react-native'
import {defaultCover} from '../Global'
import Bubble from './Bubble'
import {observer} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'

import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  scale: number
  onImagePress?: () => void
}

const BotBubble = observer(({bot, scale, onImagePress}: Props) => {
  if (!bot || !isAlive(bot) || !bot.location) {
    return null
  }
  const image = bot.image
    ? bot.image.thumbnail
    : bot.geofence
      ? require('../../../images/footPrintCover.png')
      : defaultCover[bot.coverColor % 4]
  const showLoader = bot.image && !bot.image.loaded
  const text = bot.addressData ? bot.addressData.locationShort : bot.address
  return onImagePress ? (
    <TouchableOpacity onPress={onImagePress}>
      <Bubble text={text} scale={scale} image={image} showLoader={showLoader} />
    </TouchableOpacity>
  ) : (
    <Bubble text={text} scale={scale} image={image} showLoader={showLoader} />
  )
})

export default BotBubble
