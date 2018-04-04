// @flow

import React from 'react'
import BotBubble from './BotBubble'
import MapView from 'react-native-maps'
import {observer} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  id?: string
  scale: number
  onImagePress: () => void
  image?: any
  showLoader?: boolean
}

const BotMarker = observer(({id, bot, scale, ...props}: Props) => {
  const y = scale === 1 ? 0.5 : 1 // fullMap ? -35 : -106
  if (!bot || !isAlive(bot) || !bot.location) {
    return null
  }
  return (
    <MapView.Marker.Animated
      anchor={{x: 0.5, y}}
      style={{borderWidth: 2, top: -2000}} // DIRTY workaround to catch all onPress events for the marker.
      key={id || bot.id}
      identifier={bot.id}
      coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
      onPress={props.onImagePress}
    >
      <BotBubble bot={bot} scale={scale} {...props} />
    </MapView.Marker.Animated>
  )
})

export default BotMarker
