import React from 'react'
import {View, ViewStyle} from 'react-native'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'
import {colors} from '../../constants'
import {avatarScale} from '../Global'
import RText from './RText'
import Avatar from './Avatar'

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
              height: size * avatarScale,
              width: size * avatarScale,
              borderRadius: (size * avatarScale) / 2,
              backgroundColor: colors.PINK,
              position: 'absolute',
              right: 0,
              borderWidth: 2,
              borderColor: colors.WHITE,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RText size={textSize || 13} color={colors.WHITE} weight="Bold">
              {`+${stackSize - 1}`}
            </RText>
          </View>
        )}
        <Avatar
          profile={firstProfile}
          tappable={false}
          size={size}
          hideDot
          style={{marginRight: stackSize > 1 ? size * avatarScale * 0.75 : 0}}
          fontSize={size > 30 ? 'large' : 'small'}
          fontFamily={fontFamily}
        />
      </View>
    ) : null
  }
)

export default ProfileStack
