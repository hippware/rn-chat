import React from 'react'
import {StyleSheet, View, Image, TouchableOpacity, Share, Platform} from 'react-native'

import {k} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {inject, observer} from 'mobx-react'
import {IWocky} from 'wocky-client'
import {IFirebaseStore} from '../../store/FirebaseStore'

type Props = {
  style?: any
  subtext?: string
  botTitle?: string
  wocky?: IWocky
  analytics?: any
  firebaseStore?: IFirebaseStore
}

const icon = require('../../../images/followers.png')

@inject('wocky', 'analytics', 'firebaseStore')
@observer
export default class InviteFriendsRowNew extends React.Component<Props> {
  render() {
    const {style, subtext, botTitle, wocky} = this.props
    const {profile} = wocky!
    const handle = profile ? profile.handle : ''
    const message = botTitle
      ? `Hey, @${handle} invited you to check out "${botTitle}" on tinyrobot!`
      : `Hey! Check out my favorite places in the world on tinyrobot! Add me as @${handle}.`
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => this.share(message)}>
        <Image source={icon} style={{height: 37 * k, width: 37 * k}} resizeMode="contain" />
        <View style={{marginLeft: 13 * k}}>
          <RText size={16} weight="Medium" color={colors.PINK}>
            Invite Friends
          </RText>
          <RText size={13} weight="Light" color={colors.DARK_PURPLE}>
            {subtext || 'To discover their favorite places!'}
          </RText>
        </View>
      </TouchableOpacity>
    )
  }

  share = async message => {
    this.props.analytics!.track('invite_friends')
    const url = await this.props.firebaseStore!.getFriendInviteLink()

    // https://facebook.github.io/react-native/docs/share
    const {action, activityType} = await (Share as any).share(
      {
        message: `${message} Download the app at${Platform.OS === 'android' ? ` ${url}` : ''}`,
        // title: 'title',
        url,
      },
      {
        subject: 'Check out tinyrobot',
        // excludedActivityTypes: [],
        // tintColor: ''
      }
    )
    this.props.analytics!.track('invite_friends_action_sheet', {action, activityType})
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10 * k,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.PINK,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
