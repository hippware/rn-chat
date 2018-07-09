import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {k} from '../Global'
import {inject, observer} from 'mobx-react/native'
import {Spinner} from '../common'

const CurrentLocationIndicator = inject('locationStore')(
  observer(({onPress, locationStore}) => {
    return locationStore.loading ? (
      <Spinner
        style={{
          position: 'absolute',
          bottom: 20 * k,
          left: 15 * k,
          height: 50 * k,
          width: 50 * k,
        }}
      />
    ) : (
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          bottom: 20 * k,
          left: 15 * k,
          height: 50 * k,
          width: 50 * k,
        }}
      >
        <Image source={require('../../../images/iconCurrentLocation.png')} />
      </TouchableOpacity>
    )
  })
)

export default CurrentLocationIndicator
