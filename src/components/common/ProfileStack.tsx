import React from 'react'
import {View, ViewStyle} from 'react-native'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'

import {k} from '../Global'
import {Avatar, RText} from '../common'
import {colors} from '../../constants'

type Props = {
  firstProfile: IProfile
  stackSize: number
  circleSize?: number
  style?: ViewStyle
  textSize?: number
}

const ProfileStack = observer(({firstProfile, stackSize, circleSize, style, textSize}: Props) => {
  const size = circleSize || 30
  return firstProfile ? (
    <View style={style}>
      {stackSize > 1 && (
        <View
          style={{
            height: size * k,
            width: size * k,
            borderRadius: size * k / 2,
            backgroundColor: colors.PINK,
            position: 'absolute',
            right: 0,
            borderWidth: 2 * k,
            borderColor: colors.WHITE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RText size={textSize || 12} color={colors.WHITE} weight="Medium">
            {`+${stackSize - 1}`}
          </RText>
        </View>
      )}
      <Avatar
        profile={firstProfile}
        tappable={false}
        size={size}
        hideDot
        style={{marginRight: stackSize > 1 ? size * 0.75 : 0}}
      />
    </View>
  ) : null
})

export default ProfileStack
