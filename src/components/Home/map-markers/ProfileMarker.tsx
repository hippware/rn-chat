import React from 'react'
import {observer} from 'mobx-react'
import HackMarker from '../../map/HackMarker'
import {IHomeStore} from '../../../store/HomeStore'
import LocationAvatar from '../LocationAvatar'
import {View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {IProfile} from 'wocky-client'

type Props = {
  profile: IProfile
  homeStore?: IHomeStore
}

const ProfileMarker = observer(({homeStore, profile}: Props) => {
  // we could have null location until https://github.com/hippware/wocky/issues/2304 is implemented
  if (!profile.location) {
    return null
  }
  const {latitude, longitude} = profile.location
  return (
    profile && (
      <HackMarker
        zIndex={profile.id === homeStore!.selectedId ? 1001 : profile.isOwn ? 1000 : 100}
        key={`profilemarker${profile.avatar && profile.avatar.loaded}${profile.isLocationShared}`}
        coordinate={{latitude, longitude}}
        onPress={() => {
          homeStore!.select(profile.id)
          homeStore!.followUserOnMap(profile)
          Actions.profileDetails({item: profile.id, preview: true})
        }}
        stopPropagation
      >
        {/* extra padding here for the activity icon */}
        <View style={{paddingHorizontal: 9, paddingTop: 15}}>
          <LocationAvatar profile={profile} />
        </View>
      </HackMarker>
    )
  )
})

export default ProfileMarker
