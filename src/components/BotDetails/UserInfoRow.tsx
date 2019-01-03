import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {ProfileHandle} from '../common'
import ProfileAvatar from '../ProfileAvatar'
import {ILocationStore} from '../../store/LocationStore'
import {IProfile} from 'wocky-client'
import {botProfileStyle} from '../styles'

type Props = {
  profile: IProfile
  style?: ViewStyle
  copyAddress?: () => void
  locationStore?: ILocationStore
}

@inject('locationStore')
@observer
class UserInfoRow extends React.Component<Props> {
  button: any

  render() {
    const {profile, style /*, locationStore*/} = this.props
    if (!profile) return null
    // const {distanceToString, distance, location} = locationStore!
    return (
      <View style={[styles.container, style]}>
        <View style={styles.userInfoRow}>
          <ProfileAvatar profile={profile} size={40} fontFamily="regular" />
          <ProfileHandle
            style={botProfileStyle.userInfoRow}
            onPress={() => Actions.profileDetails({item: profile.id})}
            size={16}
            profile={profile}
          />
        </View>
      </View>
    )
  }
}

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
