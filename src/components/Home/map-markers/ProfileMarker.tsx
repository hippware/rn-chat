import React from 'react'
import {observer} from 'mobx-react/native'
import HackMarker from '../../map/HackMarker'
import {IHomeStore, ILocationSharerCard} from '../../../store/HomeStore'
import LocationAvatar from '../LocationAvatar'

type Props = {
  card: ILocationSharerCard
  homeStore?: IHomeStore
}

const ProfileMarker = observer(({homeStore, card}: Props) => {
  const {profile, location} = card
  const {latitude, longitude} = location
  return (
    profile && (
      <HackMarker
        zIndex={1001}
        key={`profilemarker${profile.avatar && profile.avatar.loaded}`}
        coordinate={{latitude, longitude}}
        onPress={() => {
          card.select()
          homeStore!.setFocusedLocation(location)
        }}
        stopPropagation
      >
        <LocationAvatar profile={profile} />
      </HackMarker>
    )
  )
})

export default ProfileMarker
