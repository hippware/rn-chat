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
          padding: 3 * k,
          alignItems: 'center',
          paddingHorizontal: 15 * minHeight,
          paddingVertical: 10,
        },
        style,
      ]}
    >
      <View>
        <Avatar size={40} profile={profile} tappable={tappable !== false} />
      </View>
      <View style={{flex: 1, paddingLeft: 7}}>
        <ProfileHandle size={15} profile={profile} />
        <Text
          style={{
            color: 'rgb(75,75,75)',
            fontFamily: 'Roboto-Light',
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
