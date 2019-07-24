import React from 'react'
import Avatar from '../common/Avatar'
import {observer} from 'mobx-react'
import {ProfileHandle} from '../common'
import {IProfile} from 'wocky-client'
import PersonRow from './PersonRow'
import {View, Image} from 'react-native'

type Props = {
  profile: IProfile
  style?: any
  children?: any
  selected?: boolean
  tappable?: boolean
}

const ProfileItem = observer(({profile, style, children, selected, tappable}: Props) => {
  return profile && profile.handle ? (
    <PersonRow
      imageComponent={<Avatar size={44} profile={profile} tappable={tappable !== false} />}
      handleComponent={<ProfileHandle size={16} profile={profile} />}
      displayName={profile.displayName}
      style={style}
    >
      {selected !== undefined && (
        <View style={{width: 25}}>
          {selected && <Image source={require('../../../images/contactSelect.png')} />}
        </View>
      )}
      {children}
    </PersonRow>
  ) : null
})

export default ProfileItem
