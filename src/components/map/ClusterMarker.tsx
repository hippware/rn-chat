import React from 'react'
import {k} from '../Global'
import {View} from 'react-native'
import {colors} from '../../constants'
import {RText} from '../common'
import HackMarker from './HackMarker'

type Props = {
  coordinate: any
  onPress: any
  pointCount: number
}

const ClusterMarker = ({pointCount, ...props}: Props) => (
  <HackMarker {...props}>
    <View
      style={{
        height: 40 * k,
        width: 40 * k,
        borderRadius: 8 * k,
        borderColor: colors.WHITE,
        backgroundColor: colors.PINK,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RText size={20} color={colors.WHITE}>
        {pointCount}
      </RText>
    </View>
  </HackMarker>
)

export default ClusterMarker
