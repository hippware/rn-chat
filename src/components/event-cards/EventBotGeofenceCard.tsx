import React from 'react'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {IEventBotGeofence} from 'wocky-client'
import EventCardTemplate from './EventCardTemplate'

type Props = {
  item: IEventBotGeofence
}

const geoIcon = require('../../../images/notificationGeo.png')

@observer
export default class EventBotGeofenceCard extends React.Component<Props> {
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id})
  }

  render() {
    const {bot, relativeDateAsString, profile, isEnter} = this.props.item

    return (
      <EventCardTemplate
        profile={bot.owner}
        icon={geoIcon}
        timestamp={relativeDateAsString}
        userHandle={profile.handle}
        action={isEnter ? 'is at' : 'left'}
        line2={bot.title}
      />
    )
  }
}
