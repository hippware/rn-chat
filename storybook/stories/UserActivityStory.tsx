import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import LocationAvatar from 'src/components/Home/LocationAvatar'
import {IProfile, Profile, Location} from 'wocky-client'
import {observer} from 'mobx-react/native'
import {RText} from 'src/components/common'
import {types} from 'mobx-state-tree'
import Timer from '../../third-party/wocky-client/src/store/Timer'

const store = types
  .model({
    wocky: types.model({
      timer: Timer,
    }),
    profile: Profile,
  })
  .create({
    wocky: {
      timer: {},
    },
    profile: {
      id: '1234',
      handle: 'jennyong',
      status: 'ONLINE',
      location: Location.create({
        latitude: 1,
        longitude: 1,
        accuracy: 1,
        activity: 'on_foot',
        activityConfidence: 75,
        createdAt: Date.now(),
      }),
      avatar: null,
    },
  })

function toggle() {
  store.profile.location!.load({activity: 'still', createdAt: Date.now()})
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

    <RText style={{marginBottom: 20}}>Current Activity: {store.profile.currentActivity}</RText>

    <LocationAvatar
      profile={store.profile as IProfile}
      sharesLocation
      currentActivity={store.profile.currentActivity}
    />
  </View>
))