import React from 'react'
import Avatar from '../common/Avatar'
import {observer} from 'mobx-react/native'
import {ProfileHandle} from '../common'
import {IProfile} from 'wocky-client'
import PersonRow from './PersonRow'

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
    >
      {children}
    </PersonRow>
  ) : null
})

export default ProfileItem
