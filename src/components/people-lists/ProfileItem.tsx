import React from 'react'
import {View, Text, Image} from 'react-native'
import Avatar from '../common/Avatar'
import {k, minHeight} from '../Global'
import {observer} from 'mobx-react/native'
import {ProfileHandle} from '../common'

type Props = {
  profile: any
  style?: any
  children?: any
  selected?: boolean
  tappable?: boolean
}

const ProfileItem = observer(({profile, style, children, selected, tappable}: Props) => {
  return profile && profile.handle ? (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 18,
        },
        style,
      ]}
    >
      <View style={{marginRight: 13}}>
        <Avatar size={48} profile={profile} tappable={tappable !== false} />
      </View>
      <View style={{flex: 1}}>
        <ProfileHandle size={16} profile={profile} />
        <Text
          style={{
            color: '#757575',
            fontFamily: 'Roboto-Regular',
            fontSize: 15,
          }}
        >
          {profile.displayName}
        </Text>
      </View>
      {selected !== undefined && (
        <View style={{width: 25}}>
          {selected && <Image source={require('../../../images/contactSelect.png')} />}
        </View>
      )}
      {children}
    </View>
  ) : null
})

export default ProfileItem
