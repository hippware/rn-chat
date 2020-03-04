import React from 'react'
// import EventBotShareCard from './EventBotShareCard'
import {getType} from 'mobx-state-tree'
import {
  IEvent,
  IEventBotInvite,
  IEventBotPost,
  IEventBotGeofence,
  FriendShareTypeEnum,
} from 'wocky-client'
import EventFriendInviteRequestCard from './EventFriendInviteRequestCard'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import EventCardTemplate from './EventCardTemplate'
import {IEventLocationShare} from 'third-party/wocky-client/src/model/EventLocationShare'
import {IEventUserBefriend} from 'third-party/wocky-client/src/model/EventUserBefriend'

const EventBotInviteCard = observer(
  ({
    item: {bot, relativeDateAsString, sender, isAccepted, isResponse},
  }: {
    item: IEventBotInvite
  }) => (
    <EventCardTemplate
      profile={sender}
      iconType="geo"
      timestamp={relativeDateAsString}
      action={
        isResponse
          ? isAccepted
            ? 'accepted your invite to'
            : 'rejected your invite to'
          : 'invited you to follow'
      }
      line2={bot.title}
      onPress={() => Actions.botDetails({botId: bot.id, preview: false})}
    />
  )
)

export const EventBotPostCard = observer(
  ({item: {bot, relativeDateAsString, post}}: {item: IEventBotPost}) => {
    if (!post.profile) {
      return null
    }
    return (
      <EventCardTemplate
        profile={post.profile!}
        iconType="notification"
        timestamp={relativeDateAsString}
        action="commented on"
        line2={bot.title}
        onPress={() => Actions.botDetails({botId: bot.id, preview: false})}
      />
    )
  }
)

const EventBotGeofenceCard = observer(
  ({item: {bot, relativeDateAsString, profile, isEnter}}: {item: IEventBotGeofence}) => (
    <EventCardTemplate
      profile={profile}
      iconType="geo"
      timestamp={relativeDateAsString}
      action={isEnter ? 'is at' : 'left'}
      line2={bot.title}
      onPress={() => Actions.botDetails({botId: bot.id, preview: false})}
    />
  )
)

const EventLocationShareCard = observer(
  ({
    item: {sharedWith, ownShareType, shareType, relativeDateAsString},
  }: {
    item: IEventLocationShare
  }) => {
    if (ownShareType !== FriendShareTypeEnum.ALWAYS) {
      return null
    }
    if (shareType === FriendShareTypeEnum.ALWAYS) {
      return (
        <EventCardTemplate
          profile={sharedWith}
          iconType="share"
          timestamp={relativeDateAsString}
          action={'is sharing their location with you'}
        />
      )
    } else {
      return (
        <EventCardTemplate
          profile={sharedWith}
          iconType="share"
          timestamp={relativeDateAsString}
          action={'started sharing location, share your location to see each other'}
          onPress={() => Actions.profileDetails({item: sharedWith.id, preview: false})}
        />
      )
    }
  }
)

const EventBeFriendCard = observer(
  ({item: {userBeFriend, relativeDateAsString}}: {item: IEventUserBefriend}) => {
    return (
      <EventCardTemplate
        profile={userBeFriend}
        iconType="connected"
        timestamp={relativeDateAsString}
        action={'is now connected'}
      />
    )
  }
)

const eventCardMap: {[key: string]: any} = {
  EventBotPost: EventBotPostCard,
  EventUserBefriend: EventBeFriendCard,
  // EventBotShare: EventBotShareCard,
  EventBotGeofence: EventBotGeofenceCard,
  EventFriendInvite: EventFriendInviteRequestCard,
  EventBotInvite: EventBotInviteCard,
  EventLocationShare: EventLocationShareCard,
}

type Props = {
  item: IEvent
}
const EventCard = observer(({item}: Props) => {
  const CardClass = eventCardMap[getType(item).name]
  return CardClass ? <CardClass item={item} /> : null
})

export default EventCard
