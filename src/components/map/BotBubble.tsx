import React from 'react'
import {TouchableOpacity, ImageRequireSource, Image} from 'react-native'
import Bubble from './Bubble'
import {observer} from 'mobx-react'
import {isAlive} from 'mobx-state-tree'

import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  scale: number
  onImagePress?: () => void
  image?: ImageRequireSource
  showLoader?: boolean
  radius?: number
  borderWidth?: number
  youreHere?: boolean
}

const BotBubble = observer((props: Props) => {
  const {bot, showLoader, image, onImagePress, youreHere = false, ...rest} = props
  if (!bot || !isAlive(bot) || !bot.location) {
    return null
  }

  const defaultIcon = require('../../../images/mapIcons/question.png')
  const text = bot.icon
  const bubble = youreHere ? (
    <Bubble image={image} {...rest} />
  ) : bot.icon ? (
    <Bubble text={text} textSize={35} {...rest} />
  ) : (
    <Bubble {...rest}>
      <Image style={{width: 28, height: 28}} resizeMode="contain" source={defaultIcon} />
    </Bubble>
  )

  return onImagePress ? (
    <TouchableOpacity onPress={onImagePress}>{bubble}</TouchableOpacity>
  ) : (
    bubble
  )
})

export default BotBubble
