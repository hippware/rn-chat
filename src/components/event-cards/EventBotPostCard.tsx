import React from 'react'
import {View, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import EventBotTitle from './EventBotTitle'
import {RText} from '../common'
import {width} from '../Global'
import EventBotMetabar from './EventBotMetabar'
import {IEventBotPost} from 'wocky-client'

type Props = {
  item: IEventBotPost
}

const imageWidth = 2 * width / 3

@observer
class EventBotPostCard extends React.Component<Props> {
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id})
  }

  render() {
    const {item} = this.props
    return (
      item.bot &&
      item.post && (
        <View>
          <EventBotTitle
            bot={item.bot}
            action="added a post to"
            timestamp={item.relativeDateAsString}
            profile={item.post.profile!}
          />
          <View style={{marginHorizontal: 15}}>
            {!!item.post.content && (
              <RText size={15} weight="Light" style={{marginTop: 15}} numberOfLines={4}>
                {item.post.content}
              </RText>
            )}
            {item.post.image && (
              <Image
                source={item.post.image.source}
                resizeMode="contain"
                style={{height: imageWidth, width: imageWidth, marginTop: 15}}
              />
            )}
          </View>
          <EventBotMetabar bot={item.bot} />
        </View>
      )
    )
  }
}

export default EventBotPostCard
