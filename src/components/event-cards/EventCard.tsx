import React from 'react'
import EventBotShareCard from './EventBotShareCard'
import {getType} from 'mobx-state-tree'
import {IEvent, IEventBotInvite, IEventBotPost, IEventBotGeofence} from 'wocky-client'
import EventUserFollowCard from './EventUserFollowCard'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import EventCardTemplate from './EventCardTemplate'

const geoIcon = require('../../../images/notificationGeo.png')
const notificationIcon = require('../../../images/notificationMessage.png')

const EventBotInviteCard = observer(
  ({
    item: {bot, relativeDateAsString, sender, isAccepted, isResponse},
  }: {
    item: IEventBotInvite
  }) => (
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
      onPress={() => Actions.botDetails({botId: bot.id})}
    />
  )
)

const EventBotPostCard = observer(
  ({item: {bot, relativeDateAsString, post}}: {item: IEventBotPost}) => {
    if (!post.profile) {
      return null
    }
    return (
      <EventCardTemplate
        profile={post.profile!}
        icon={notificationIcon}
        timestamp={relativeDateAsString}
        action="commented on"
        line2={bot.title}
        onPress={() => Actions.botDetails({botId: bot.id})}
      />
    )
  }
)

const EventBotGeofenceCard = observer(
  ({item: {bot, relativeDateAsString, profile, isEnter}}: {item: IEventBotGeofence}) => (
    <EventCardTemplate
      profile={profile}
      icon={geoIcon}
      timestamp={relativeDateAsString}
      action={isEnter ? 'is at' : 'left'}
      line2={bot.title}
      onPress={() => Actions.botDetails({botId: bot.id})}
    />
  )
)

const eventCardMap: {[key: string]: any} = {
  // EventBotCreate: EventBotCard,
  EventBotPost: EventBotPostCard,
  EventBotShare: EventBotShareCard,
  // EventBotNote: EventBotNoteCard,
  EventBotGeofence: EventBotGeofenceCard,
  EventUserFollow: EventUserFollowCard,
  EventBotInvite: EventBotInviteCard,
}

type Props = {
  item: IEvent
}
const EventCard = ({item}: Props) => {
  const CardClass = eventCardMap[getType(item).name]
  return CardClass ? <CardClass item={item} /> : null
}

export default EventCard
