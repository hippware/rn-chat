import React from 'react'
import {TouchableOpacity, ImageRequireSource} from 'react-native'
// import Bubble from './BubbleAnimated'
import Bubble from './Bubble'
import {observer} from 'mobx-react/native'
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
}

@observer
class BotBubble extends React.Component<Props> {
  render() {
    const {bot, showLoader, image, onImagePress, ...rest} = this.props
    if (!bot || !isAlive(bot) || !bot.location) {
      return null
    }
    const coverImage = image || (bot.image ? bot.image.thumbnail : null)
    const text = bot.icon
    const bubble = (
      <Bubble
        text={text}
        image={coverImage}
        textSize={35}
        showLoader={showLoader === undefined ? bot.image && !bot.image.loaded : showLoader}
        {...rest}
      />
    )

    return onImagePress ? (
      <TouchableOpacity onPress={onImagePress}>{bubble}</TouchableOpacity>
    ) : (
      bubble
    )
  }
}

export default BotBubble
