import React from 'react'
import BotBubble from './BotBubble'
import {observer} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'
import HackMarker from './HackMarker'

type Props = {
  bot: IBot
  scale: number
  onImagePress: any
  image?: any
  style?: any
  showLoader?: boolean
}

const BotMarker = observer(({bot, scale, ...props}: Props) => {
  const y = scale === 1 ? 0.5 : 1 // fullMap ? -35 : -106
  if (!bot || !isAlive(bot) || !bot.location) {
    return null
  }
  return (
    <HackMarker
      identifier={bot.id}
      coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
      onPress={props.onImagePress}
      scale={scale}
      {...props}
    >
      <BotBubble bot={bot} scale={scale} {...props} />
    </HackMarker>
  )
})

export default BotMarker
