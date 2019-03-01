import React from 'react'
import {Image} from 'react-native'
import {observer} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../../store/LocationStore'
import {IHomeStore, YouCard} from '../../../store/HomeStore'
import LocationAvatar from '../LocationAvatar'

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

interface ICardProps extends IProps {
  card: YouCard
}

const YouMarker = observer(({wocky, locationStore, homeStore, card}: ICardProps) => {
  const {location} = locationStore!
  if (!locationStore!.location) {
    return null
  }
  const {latitude, longitude} = location!
  const {profile} = wocky!
  return (
    profile && (
      <HackMarker
        zIndex={1000}
        key={`youmarker${profile.avatar && profile.avatar.loaded && profile.isLocationShared}`}
        coordinate={{latitude, longitude}}
        onPress={() => {
          homeStore!.select(card.id)
          homeStore!.setFocusedLocation(location)
        }}
        stopPropagation
      >
        {!profile.avatar && !profile.hidden.enabled ? (
          <Image source={require('../../../../images/you.png')} />
        ) : (
          <LocationAvatar
            profile={profile}
            hidden={profile.hidden.enabled}
            sharesLocation={profile.isLocationShared} // computed isLocationShared must be used for OwnProfile instances
          />
        )}
      </HackMarker>
    )
  )
})

export default YouMarker
