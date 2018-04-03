// @flow

import React from 'react'
import Map from './Map'
import {observer} from 'mobx-react/native'
import BotMarker from './BotMarker'
import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  scale: number
  onImagePress: () => void
  onMapPress: () => void
}

const BotDetailsMap = observer(({bot, scale, ...props}: Props) => {
  const fullMap = scale === 0
  return (
    <Map
      location={bot ? {...bot.location} : null}
      geofence={bot && bot.geofence}
      showOnlyBot
      showUser={fullMap}
      fullMap={fullMap}
      scale={scale}
      bot={bot}
      scrollEnabled={fullMap}
      rotateEnabled={fullMap}
      pitchEnabled={fullMap}
      zoomEnabled={fullMap}
      marker={<BotMarker {...props} scale={scale} bot={bot} />}
      {...props}
    />
  )
})

export default BotDetailsMap
