import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import LocationAvatar from 'src/components/Home/LocationAvatar'
import {IProfile, Profile, Location} from 'wocky-client'
import {observer} from 'mobx-react/native'
import {RText} from 'src/components/common'

const profile = Profile.create({
  id: '1234',
  handle: 'jennyong',
  status: 'ONLINE',
  location: Location.create({
    latitude: 1,
    longitude: 1,
    accuracy: 1,
    activity: 'on_foot',
    activityConfidence: 75,
  }),
})

function toggle() {
  profile.location!.load({activity: 'still'})
}

export default observer(() => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity
      onPress={toggle}
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}
    >
      <RText>Toggle</RText>
    </TouchableOpacity>
    <LocationAvatar
      profile={profile as IProfile}
      sharesLocation
      currentActivity={profile.currentActivity}
    />
  </View>
))
