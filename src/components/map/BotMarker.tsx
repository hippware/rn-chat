import React from 'react'
import BotBubble from './BotBubble'
import {MarkerAnimated} from 'react-native-maps'
import {observer} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {IBot} from 'wocky-client'

type Props = {
  bot: IBot
  id?: string
  scale: number
  onImagePress: (value: any) => void
  image?: any
  style?: any
  showLoader?: boolean
}

@observer
export default class BotMarker extends React.Component<Props> {
  mounted = false
  state = {tracking: true}

  componentDidMount() {
    this.mounted = true
    setTimeout(() => this.mounted && this.setState({tracking: false}), 1000)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(_0, previousState) {
    if (previousState.tracking && !this.state.tracking) {
      return
    }
    if (!previousState.tracking && this.state.tracking) {
      return
    }
    if (this.mounted && !this.state.tracking) {
      this.setState({tracking: true})
      setTimeout(() => this.mounted && this.setState({tracking: false}), 500)
    }
  }

  render() {
    const {id, bot, scale, style, ...props} = this.props
    const y = scale === 1 ? 0.5 : 1 // fullMap ? -35 : -106
    if (!bot || !isAlive(bot) || !bot.location) {
      return null
    }
    return (
      <MarkerAnimated
        anchor={{x: 0.5, y}}
        tracksViewChanges={this.state.tracking}
        style={[{top: -2000}, style]} // DIRTY workaround to catch all onPress events for the marker.
        identifier={bot.id}
        coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
        onPress={props.onImagePress}
      >
        <BotBubble bot={bot} scale={scale} {...props} />
      </MarkerAnimated>
    )
  }
}
