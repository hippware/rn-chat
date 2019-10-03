import React from 'react'
import {StyleSheet, View, Image, TouchableOpacity, Share, Platform} from 'react-native'

import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {IWocky} from 'wocky-client'

type Props = {
  style?: any
  subtext?: string
  botTitle?: string
  wocky?: IWocky
  analytics?: any
}

const icon = require('../../../images/followers.png')

const InviteFriendsRow = inject('wocky', 'analytics')(
  observer(({style, subtext, botTitle, wocky, analytics}: Props) => {
    const share = async m => {
      analytics!.track('invite_friends')
      const url =
        'https://itunes.apple.com/app/apple-store/id1295678402?pt=117841011&ct=Invite%20Friends&mt=8'

      // https://facebook.github.io/react-native/docs/share
      const {action, activityType} = await (Share as any).share(
        {
          message: `${m} Download the app at${Platform.OS === 'android' ? ` ${url}` : ''}`,
          // title: 'title',
          url,
        },
        {
          subject: 'Check out tinyrobot',
          // excludedActivityTypes: [],
          // tintColor: ''
        }
      )
      analytics!.track('invite_friends_action_sheet', {action, activityType})
    }

    const {profile} = wocky!
    const handle = profile ? profile.handle : ''
    const message = botTitle
      ? `Hey, @${handle} invited you to check out "${botTitle}" on tinyrobot!`
      : `Hey! Check out my favorite places in the world on tinyrobot! Add me as @${handle}.`
    return (
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: colors.DARK_GREY,
            paddingHorizontal: 15 * minHeight,
            paddingVertical: 20,
            alignItems: 'center',
          },
          style,
        ]}
        onPress={() => share(message)}
      >
        <Image
          source={require('../../../images/iconBot.png')}
          style={{height: 37, width: 37}}
          resizeMode="contain"
        />
        <View style={{flex: 1, marginLeft: 13 * k}}>
          <RText size={16} weight="Medium" color={colors.PINK}>
            Invite Friends
          </RText>
          <RText size={14} weight="Light" color={colors.DARK_PURPLE}>
            {subtext || 'To discover their favorite places!'}
          </RText>
        </View>
        <View
          style={{
            padding: 8 * k,
            paddingHorizontal: 16 * k,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: colors.PINK,
          }}
        >
          <Image source={icon} />
        </View>
      </TouchableOpacity>
    )
  })
)

export default InviteFriendsRow
