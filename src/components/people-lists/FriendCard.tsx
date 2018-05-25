// @flow

import React from 'react'
import {TouchableOpacity} from 'react-native'
import {backgroundColorCardDay} from '../../constants/colors'
import assert from 'assert'
import ProfileItem from './ProfileItem'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react/native'

type Props = {
  profile: any
  children?: any
}

const FriendCard = observer(({profile, children}: Props) => {
  assert(profile, 'Profile is not defined')
  const backgroundColor = backgroundColorCardDay
  return (
    <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.id})}>
      <ProfileItem profile={profile} style={{backgroundColor}}>
        {children}
      </ProfileItem>
    </TouchableOpacity>
  )
})

export default FriendCard
