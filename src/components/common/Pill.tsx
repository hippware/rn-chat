import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {RText} from '.'
import {colors} from 'src/constants'
import {k} from '../Global'

const Pill = ({children}) => (
  <LinearGradient
    start={{x: 0, y: 0.5}}
    end={{x: 1, y: 0.5}}
    colors={['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']}
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
)

export default Pill
