import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from 'src/constants'
import {k} from '../Global'
import {View} from 'react-native'
import RText from './RText'

type Props = {
  children: React.ReactNode
  solidColor?: string
}

const Pill = ({children, solidColor}: Props) => (
  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={
        solidColor
          ? [solidColor, solidColor, solidColor]
          : ['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']
      }
      style={{
        paddingHorizontal: 10 * k,
        paddingVertical: 3 * k,
        borderRadius: 5,
        marginRight: 5 * k,
      }}
    >
      <RText size={13} weight="Medium" color={colors.WHITE}>
        {children}
      </RText>
    </LinearGradient>
  </View>
)

export default Pill
