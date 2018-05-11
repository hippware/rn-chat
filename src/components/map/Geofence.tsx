import React from 'react'
import {Circle} from 'react-native-maps'
import {colors} from '../../constants/index'

type Props = {
  coords: {
    latitude: number
    longitude: number
  }
}

const Geofence = ({coords, ...rest}: Props) => (
  <Circle
    center={coords}
    radius={100}
    fillColor={colors.PINK_MASK}
    strokeColor={colors.PINK}
    {...rest}
  />
)

export default Geofence
