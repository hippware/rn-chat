import React from 'react'
import {ImageBackground} from 'react-native'
import {Avatar, BubbleBadge} from '../common'
import {observer} from 'mobx-react'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  hidden?: boolean
  tappable?: boolean
  asHeaderItem?: boolean
}

const avatarBG = require('../../../images/LocationAvatar.png')
const avatarBGNoRing = require('../../../images/LocationAvatarNoRing.png')
const avatarBGGray = require('../../../images/LocationAvatarGray.png')
const activity = require('../../../images/activity-outer.png')
const unreadCounter = require('../../../images/unreadBG.png')

const activityEmojis = {
  walking: '🚶',
  on_foot: '🚶',
  on_bicycle: '🚴',
  running: '🏃',
  in_vehicle: '🚗',
}

const LocationAvatar = observer(({profile, hidden, tappable, asHeaderItem}: Props) => {
  const sharesLocation = profile.isLocationShared
  const currentActivity = profile.currentActivity
  const isStill = currentActivity === 'still'
  const inactive = hidden || (!profile.isOwn && !sharesLocation)
  const currentBG = inactive ? avatarBGGray : sharesLocation && !isStill ? avatarBG : avatarBGNoRing
  const theActivity = activityEmojis[currentActivity || '']
  return (
    <ImageBackground
      source={currentBG}
      style={{
        marginVertical: -9,
        marginHorizontal: -5,
        paddingTop: 17,
        width: 85,
        height: 87,
        alignItems: 'center',

        paddingLeft: 1.2,
        opacity: 1,
      }}
    >
      <Avatar
        noScale
        size={54}
        inactive={inactive}
        profile={profile}
        hideDot
        borderWidth={0}
        tappable={tappable}
      />
      {!!asHeaderItem && !!profile.unreadCount && (
        <BubbleBadge text={profile.unreadCountString} background={unreadCounter} />
      )}
      {(!asHeaderItem || !profile.unreadCount) && !!theActivity && (
        <BubbleBadge
          style={{bottom: 3, left: 1}}
          diameter={35}
          text={theActivity}
          background={activity}
        />
      )}
    </ImageBackground>
  )
})

export default LocationAvatar
