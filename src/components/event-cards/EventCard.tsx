import React from 'react'
// import EventBotShareCard from './EventBotShareCard'
import {getType} from 'mobx-state-tree'
import {IEvent, IEventBotInvite, IEventBotPost, IEventBotGeofence} from 'wocky-client'
import EventFriendInviteRequestCard from './EventFriendInviteRequestCard'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import EventCardTemplate from './EventCardTemplate'
import {IEventLocationShare} from 'third-party/wocky-client/src/model/EventLocationShare'
import {RText, GradientButton} from '../common'
import {TouchableOpacity} from 'react-native'
import {colors} from 'src/constants'
import {IWocky} from 'wocky-client'

const geoIcon = require('../../../images/notificationGeo.png')
const notificationIcon = require('../../../images/notificationMessage.png')
const shareLocationIcon = require('../../../images/notificationLocation.png')
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
          ? isAccepted
            ? 'accepted your invite to'
            : 'rejected your invite to'
          : 'invited you to follow'
      }
      line2={bot.title}
      onPress={() => Actions.botDetails({botId: bot.id})}
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

const Button = ({
  text,
  onPress,
  textStyle,
  style,
}: {
  text: string
  onPress: any
  textStyle?: any
  style?: any
}) => (
  <TouchableOpacity
    style={[
      {
        borderColor: colors.PINK,
        borderWidth: 1,
        marginTop: 5,
        height: 29,
        borderRadius: 3,
        justifyContent: 'center',
      },
      style,
    ]}
    onPress={onPress}
  >
    <RText
      weight="Medium"
      color={colors.PINK}
      style={[{marginLeft: 10, marginRight: 10}, textStyle]}
    >
      {text}
    </RText>
  </TouchableOpacity>
)

const EventLocationShareCard = inject('wocky')(
  observer(
    ({
      wocky,
      item: {sharedWith, relativeDateAsString},
    }: {
      wocky: IWocky
      item: IEventLocationShare
    }) => (
      <EventCardTemplate
        profile={sharedWith}
        icon={shareLocationIcon}
        timestamp={relativeDateAsString}
        action={'is sharing location with you'}
      >
        {sharedWith.sharesLocation ? (
          sharedWith.receivesLocationShare ? (
            <GradientButton
              text="SHARING LOCATION"
              style={{width: 160, height: 29, borderRadius: 4, marginVertical: 4}}
              textStyle={{fontSize: 12, color: 'white'}}
              onPress={Actions.liveLocationShare}
            />
          ) : (
            <Button text="SHARE YOUR LOCATION" onPress={Actions.liveLocationShare} />
          )
        ) : (
          undefined
        )}
      </EventCardTemplate>
    )
  )
)
const eventCardMap: {[key: string]: any} = {
  EventBotPost: EventBotPostCard,
  // EventBotShare: EventBotShareCard,
  EventBotGeofence: EventBotGeofenceCard,
  EventFriendInvite: EventFriendInviteRequestCard,
  EventBotInvite: EventBotInviteCard,
  EventLocationShare: EventLocationShareCard,
}

type Props = {
  item: IEvent
}
const EventCard = ({item}: Props) => {
  const CardClass = eventCardMap[getType(item).name]
  return CardClass ? <CardClass item={item} /> : null
}

export default EventCard
