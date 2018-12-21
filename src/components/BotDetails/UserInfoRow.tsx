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
  // bot: IBot
  profile: IProfile
  style?: ViewStyle
  copyAddress?: () => void
  locationStore?: ILocationStore
}

// const Separator = () => (
//   <View style={{width: 1, height: 10 * k, backgroundColor: colors.DARK_GREY}} />
// )

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

          {/* TODO: add bot.createdAt when ready on the backend */}

          {/* <View style={{flex: 1}} />
          <SavesCount botId={bot.id} isOwn={bot.owner.isOwn} />
          <RText color={colors.WARM_GREY_2} style={{marginLeft: 4 * k, marginRight: 4 * k}}>
            {bot.followersSize}
          </RText>
          <Separator />

          {location &&
            bot.location && (
              <View>
                <TouchableOpacity
                  onLongPress={this.props.copyAddress}
                  ref={r => (this.button = r)}
                  onPress={() => Actions.refresh({scale: 0})}
                  style={styles.botLocationButton}
                >
                  <View style={{paddingRight: 2 * k, paddingLeft: 5 * k}}>
                    <Image
                      style={{width: 11 * k, height: 14 * k}}
                      source={require('../../../images/iconBotLocation2.png')}
                    />
                  </View>
                  <RText color={colors.WARM_GREY_2}>
                    {distanceToString(
                      distance(
                        location.latitude,
                        location.longitude,
                        bot.location.latitude,
                        bot.location.longitude
                      )
                    )}
                  </RText>
                </TouchableOpacity>
              </View>
            )} */}
        </View>
      </View>
    )
  }
}

// const SavesCount = ({botId, isOwn}) => {
//   const inner = (
//     <Image style={{width: 14 * k, height: 13 * k}} source={require('../../../images/heart.png')} />
//   )
//   return isOwn ? (
//     <TouchableOpacity
//       onPress={() => Actions.subscribers({item: botId})}
//       hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
//     >
//       {inner}
//     </TouchableOpacity>
//   ) : (
//     inner
//   )
// }

export default UserInfoRow

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 10 * k,
    paddingBottom: 15 * k,
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  userInfoRow: {
    // marginTop: 10 * k,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  botLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
