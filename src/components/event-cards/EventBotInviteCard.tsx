import React from 'react'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {IEventBotInvite} from 'wocky-client'
import EventCardTemplate from './EventCardTemplate'

type Props = {
  item: IEventBotInvite
}

const geoIcon = require('../../../images/notificationGeo.png')

@observer
export default class EventBotInviteCard extends React.Component<Props> {
  onPress() {
    Actions.botDetails({botId: this.props.item.bot.id})
  }

  render() {
    const {bot, relativeDateAsString, sender, isAccepted, isResponse} = this.props.item

    return (
      <EventCardTemplate
        profile={sender}
        icon={geoIcon}
        timestamp={relativeDateAsString}
        action={
          isResponse
            ? isAccepted ? 'accepted your invite to' : 'rejected your invite to'
            : 'invited you to follow'
        }
        line2={bot.title}
      />
    )
  }
}
