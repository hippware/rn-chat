import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react'
import HackMarker from '../../map/HackMarker'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../../store/LocationStore'
import {IHomeStore, YouCard} from '../../../store/HomeStore'
import LocationAvatar from '../LocationAvatar'
import _ from 'lodash'
import {Actions} from 'react-native-router-flux'

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
        zIndex={
          homeStore!.focusedLocation === null ||
          _.isEqual(homeStore!.focusedLocation, locationStore!.location)
            ? 2000
            : 1000
        }
        key={`youmarker${profile.avatar && profile.avatar.loaded && profile.isLocationShared}`}
        coordinate={{latitude, longitude}}
        onPress={() => {
          homeStore!.select(card.id)
          homeStore!.followUserOnMap(profile)
          Actions.popTo('home')
          Actions.profileDetails({item: profile.id, preview: true})
        }}
        stopPropagation
      >
        {/* extra padding here for the activity icon */}
        <View style={{paddingHorizontal: 9, paddingTop: 15}}>
          <LocationAvatar profile={profile} hidden={profile.hidden.enabled} />
        </View>
      </HackMarker>
    )
  )
})

export default YouMarker
