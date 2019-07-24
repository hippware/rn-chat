import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {backgroundColorCardDay} from '../../constants/colors'
import assert from 'assert'
import ProfileItem from './ProfileItem'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react'
import {k} from '../Global'

type Props = {
  profile: any
  children?: any
  onPress?: () => void
}

const FriendCard = observer(({profile, children, onPress}: Props) => {
  assert(profile, 'Profile is not defined')
  const backgroundColor = backgroundColorCardDay
  return (
    <View style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={onPress || (() => Actions.profileDetails({item: profile.id}))}
        style={{width: '90%', paddingHorizontal: 15 * k, alignSelf: 'center'}}
      >
        <ProfileItem profile={profile} style={{backgroundColor}}>
          {children}
        </ProfileItem>
      </TouchableOpacity>
    </View>
  )
})

export default FriendCard
