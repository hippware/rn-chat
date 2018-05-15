import React from 'react'
import {Text} from 'react-native'

type Props = {
  isDay: boolean
  style?: any
  children: any
}

const CardText = ({isDay, style, children}: Props) => (
  <Text
    numberOfLines={0}
    style={[
      {
        fontFamily: 'Roboto-Regular',
        color: isDay ? 'rgb(81,67,96)' : 'white',
        fontSize: 15,
      },
      style,
    ]}
  >
    {children}
  </Text>
)

export default CardText
