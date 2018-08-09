import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'

import {k} from '../Global'
import {Avatar, RText} from '../common'
import {colors} from '../../constants'

type Props = {
  profiles: IProfile[]
}

const VisitorHeads = observer(({profiles}: Props) => {
  console.log('& v heads', profiles)
  const profile = profiles.length ? profiles[0] : null
  const rest = profiles.length - 1
  const size = 30
  return profile ? (
    <View style={{position: 'absolute', top: -15, right: -8}}>
      {rest > 0 && (
        <View
          style={{
            height: size * k,
            width: size * k,
            borderRadius: size * k / 2,
            backgroundColor: colors.PINK,
            position: 'absolute',
            top: 0,
            right: 0,
            borderWidth: 2 * k,
            borderColor: colors.WHITE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RText size={12} color={colors.WHITE} weight="Medium">
            {`+${rest}`}
          </RText>
        </View>
      )}
      <Avatar
        profile={profile}
        tappable={false}
        size={size}
        hideDot
        style={{position: 'absolute', right: rest > 0 ? 22 * k : 0, top: 0}}
      />
    </View>
  ) : null
})

export default VisitorHeads
