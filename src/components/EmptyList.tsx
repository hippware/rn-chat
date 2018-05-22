import React from 'react'
import {View, Image} from 'react-native'
import {RText} from './common'
import {colors} from '../constants'
import {k} from './Global'

type Props = {
  text: string
}

const EmptyList = ({text}: Props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.LIGHT_GREY,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Image
      source={require('../../images/surpriseBotGray.png')}
      style={{height: 74, width: 64, marginVertical: 10 * k}}
      resizeMode="contain"
    />
    <RText color={colors.DARK_GREY} size={15}>
      {text}
    </RText>
  </View>
)

export default EmptyList
