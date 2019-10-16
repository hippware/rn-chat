import React from 'react'
import {Pill} from '../common'
import {observer} from 'mobx-react'
import {IProfile} from 'wocky-client'
import ProfileCard from './ProfileCard'
import {View} from 'react-native'
type Props = {
  profile: IProfile
}

const LocationSharerCard = observer(({profile}: Props) => {
  return (
    <ProfileCard profile={profile!} showAvatarDot>
      <View style={{flexDirection: 'row'}}>
        {!!profile.location && !!profile.location!.fromNow && (
          <Pill>{profile.location!.fromNow}</Pill>
        )}
      </View>
    </ProfileCard>
  )
})

export default LocationSharerCard
