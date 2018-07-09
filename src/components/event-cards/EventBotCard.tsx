import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import EventBotTitle from './EventBotTitle'
import EventBotMetabar from './EventBotMetabar'
import BotImage from './BotImage'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {IEventBot} from 'wocky-client'

type Props = {
  item: IEventBot
}

@observer
export default class EventBotCard extends React.Component<Props> {
  onPress() {
    if (this.props.item.bot && isAlive(this.props.item.bot)) {
      Actions.botDetails({item: this.props.item.bot.id})
    }
  }

  render() {
    const eventBot = this.props.item
    const {bot} = eventBot
    if (!bot || !isAlive(bot)) {
      return null
    }

    return (
      <View>
        <EventBotTitle
          bot={bot}
          action={bot.geofence ? 'created a presence bot' : 'created'}
          timestamp={eventBot.relativeDateAsString}
        />
        <BotImage bot={bot} isGeo={bot.geofence} />
        <EventBotMetabar bot={bot} />
      </View>
    )
  }
}
