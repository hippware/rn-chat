import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import {observer} from 'mobx-react'
import {colors} from '../../constants'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {ProfileHandle} from '../common'
import ProfileAvatar from '../ProfileAvatar'
import {IProfile} from 'src/wocky'
import {botProfileStyle} from '../styles'

type Props = {
  profile: IProfile
  style?: ViewStyle
}

const UserInfoRow = observer(({profile, style}: Props) => {
  return profile ? (
    <View style={[styles.container, style]}>
      <View style={styles.userInfoRow}>
        <ProfileAvatar profile={profile} size={40} fontFamily="regular" />
        <ProfileHandle
          style={botProfileStyle.userInfoRow}
          onPress={() => Actions.profileDetails({item: profile.id, preview: false})}
          size={16}
          profile={profile}
        />
      </View>
    </View>
  ) : null
})

export default UserInfoRow

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15 * k,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  botLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
