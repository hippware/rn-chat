import React from 'react'
import {observer} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import {IHomeStore, LocationSharerCard} from '../../../store/HomeStore'
import LocationAvatar from '../LocationAvatar'
import {View} from 'react-native'

type Props = {
  card: LocationSharerCard
  homeStore?: IHomeStore
}

const ProfileMarker = observer(({homeStore, card}: Props) => {
  const {profile, location} = card
  // we could have null location until https://github.com/hippware/wocky/issues/2304 is implemented
  if (!location) {
    return null
  }
  const {latitude, longitude} = location
  return (
    profile && (
      <HackMarker
        zIndex={1001}
        key={`profilemarker${profile.avatar && profile.avatar.loaded}`}
        coordinate={{latitude, longitude}}
        onPress={() => {
          homeStore!.select(card.id)
          homeStore!.followUserOnMap(profile)
        }}
        stopPropagation
      >
        {/* extra padding here for the activity icon */}
        <View style={{paddingHorizontal: 9, paddingTop: 15}}>
          <LocationAvatar
            profile={profile}
            sharesLocation={profile.sharesLocation}
            currentActivity={profile.currentActivity}
            noFade={homeStore!.mapType === 'hybrid'}
          />
        </View>
      </HackMarker>
    )
  )
})

export default ProfileMarker
