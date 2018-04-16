// @flow

import React from 'react'
import BotBubble from './BotBubble'
import MapView from 'react-native-maps'
import {observer} from 'mobx-react/native'
import {observable} from 'mobx'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  id?: string
  scale: number
  onImagePress: () => void
  image?: any
  style?: any
  showLoader?: boolean
}

@observer
export default class BotMarker extends React.Component<Props> {
  @observable tracking = true

  componentDidMount() {
    setTimeout(() => this.tracking = false, 400)
  }

  render() {
    const {id, bot, scale, style, ...props} = this.props
    const y = scale === 1 ? 0.5 : 1 // fullMap ? -35 : -106
    if (!bot || !isAlive(bot) || !bot.location) {
      return null
    }
    return (
      <MapView.Marker.Animated
        anchor={{x: 0.5, y}}
        tracksViewChanges={this.tracking}
        style={[{top: -2000}, style]} // DIRTY workaround to catch all onPress events for the marker.
        key={(id || bot.id) + (bot && bot.image && bot.image.loaded)}
        identifier={bot.id}
        coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
        onPress={props.onImagePress}
      >
        <BotBubble bot={bot} scale={scale} {...props} />
      </MapView.Marker.Animated>
    )
  }
}
