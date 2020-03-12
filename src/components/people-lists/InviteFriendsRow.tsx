import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {observer} from 'mobx-react'
import {IWocky} from 'src/wocky'
import ShareActivitySheet from './ShareActivitySheet'
import {useWocky} from '../../utils/injectors'

type Props = {
  style?: any
  subtext?: string
  botTitle?: string
  wocky?: IWocky
  analytics?: any
}

const icon = require('../../../images/followers.png')

const InviteFriendsRow = observer(({style, subtext, botTitle}: Props) => {
  const wocky = useWocky()
  const message =
    botTitle &&
    `Hey, @${wocky.profile!.handle} invited you to check out "${botTitle}" on tinyrobot!`
  return (
    <ShareActivitySheet
      message={message}
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
    </ShareActivitySheet>
  )
})

export default InviteFriendsRow
