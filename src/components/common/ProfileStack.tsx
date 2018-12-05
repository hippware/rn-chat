import React from 'react'
import {View, ViewStyle} from 'react-native'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'

import {Avatar, RText} from '../common'
import {colors} from '../../constants'

type Props = {
  firstProfile: IProfile
  stackSize: number
  circleSize?: number
  style?: ViewStyle
  textSize?: number
  fontFamily?: any
}

const ProfileStack = observer(
  ({firstProfile, stackSize, circleSize, style, textSize, fontFamily}: Props) => {
    const size = circleSize || 30
    return firstProfile ? (
      <View style={style}>
        {stackSize > 1 && (
          <View
            style={{
              height: size,
              width: size,
              borderRadius: size / 2,
              backgroundColor: colors.PINK,
              position: 'absolute',
              right: 0,
              borderWidth: 2,
              borderColor: colors.WHITE,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RText size={textSize || 12} color={colors.WHITE} weight="Bold">
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
          fontSize={size > 30 ? 'large' : 'small'}
          fontFamily={fontFamily}
        />
      </View>
    ) : null
  }
)

export default ProfileStack
