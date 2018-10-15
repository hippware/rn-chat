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
}

@observer
class BotBubble extends React.Component<Props> {
  componentDidMount() {
    const {bot} = this.props
    if (bot && isAlive(bot) && bot.image && !bot.image.thumbnail) {
      bot.image.download()
    }
  }
  render() {
    const {bot, showLoader, image, onImagePress, ...rest} = this.props
    if (!bot || !isAlive(bot) || !bot.location) {
      return null
    }
    const coverImage =
      image || (bot.image ? bot.image.thumbnail : require('../../../images/footPrintCover.png'))
    const text = bot.addressData ? bot.addressData.locationShort : bot.address
    const bubble = (
      <Bubble
        text={text}
        image={coverImage}
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
