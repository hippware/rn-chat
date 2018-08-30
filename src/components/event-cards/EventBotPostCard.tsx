import React from 'react'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {IEventBotPost} from 'wocky-client'
import EventCardTemplate from './EventCardTemplate'

type Props = {
  item: IEventBotPost
}

const geoIcon = require('../../../images/notificationGeo.png')

@observer
export default class EventBotInviteCard extends React.Component<Props> {
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id})
  }

  render() {
    const {bot, relativeDateAsString, post} = this.props.item

    return (
      <EventCardTemplate
        profile={post.profile}
        icon={geoIcon}
        timestamp={relativeDateAsString}
        action="commentedOn"
        line2={bot.title}
      />
    )
  }
}
