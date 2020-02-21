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
import {RText, GradientButton} from '../common'
import {TouchableOpacity} from 'react-native'
import {colors} from 'src/constants'
import {useAnalytics} from '../../utils/injectors'
import {Props as LocationSettingsProps} from '../LiveLocation/LocationSettingsModal'
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

const EventLocationShareCard = observer(
  ({item: {sharedWith, relativeDateAsString}}: {item: IEventLocationShare}) => {
    const analytics = useAnalytics()

    return (
      <EventCardTemplate
        profile={sharedWith}
        iconType="share"
        timestamp={relativeDateAsString}
        action={'is sharing location with you'}
      >
        {sharedWith.sharesLocation ? (
          sharedWith.receivesLocationShare ? (
            <GradientButton
              text="SHARING LOCATION"
              style={{width: 160, height: 29, borderRadius: 4, marginVertical: 4}}
              textStyle={{fontSize: 12, color: 'white'}}
              onPress={() => sharedWith.shareLocationUpdate(FriendShareTypeEnum.DISABLED)}
            />
          ) : (
            <Button
              text="SHARE YOUR LOCATION"
              onPress={() =>
                Actions.locationSettingsModal({
                  settingsType: 'ACCEPT_REQUEST',
                  profile: sharedWith,
                  displayName: sharedWith.firstName,
                  onOkPress: shareType => {
                    sharedWith.invite(shareType).then(() => {
                      analytics.track('user_follow', (sharedWith as any).toJSON())
                    })
                    Actions.pop()
                  },
                } as LocationSettingsProps)
              }
            />
          )
        ) : (
          undefined
        )}
      </EventCardTemplate>
    )
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
