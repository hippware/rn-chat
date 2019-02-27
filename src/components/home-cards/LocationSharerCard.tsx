import React from 'react'
import {Pill} from '../common'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'
import ProfileCard from './ProfileCard'
import {View} from 'react-native'
type Props = {
  profile: IProfile
}

const LocationSharerCard = observer(({profile}: Props) => {
  return (
    <ProfileCard profile={profile!}>
      <View style={{flexDirection: 'row'}}>
        {/* todo: proper implementation for these placeholders.
        https://github.com/hippware/rn-chat/issues/3371#issue-413385816 */}
        {/* <Pill>Driving</Pill> */}
        {profile.location &&
          !!profile.location!.fromNow && <Pill>{profile.location!.fromNow}</Pill>}
      </View>
    </ProfileCard>
  )
})

export default LocationSharerCard
