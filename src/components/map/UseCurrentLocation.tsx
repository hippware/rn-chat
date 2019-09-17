import React, {useState, useEffect} from 'react'
import {Animated, View, Image, TouchableOpacity} from 'react-native'
import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {inject} from 'mobx-react'
import {ILocationStore} from '../../store/LocationStore'
import {observer} from 'mobx-react-lite'

type Props = {
  enabled: boolean
  onPress: (param: any) => void
  locationStore?: ILocationStore
  geocodingStore?: any
}

const HIDDEN = -64 * k
const SHOWN = 0

const CurrentLocation = inject('locationStore', 'geocodingStore')(
  observer(({enabled, onPress, locationStore, geocodingStore}: Props) => {
    const [marginTop] = useState(new Animated.Value(SHOWN))
    const [address, setAddress] = useState('')
    const [meta, setMeta] = useState({})

    useEffect(() => {
      geocodingStore.reverse(locationStore!.location).then(data => {
        if (data) {
          setAddress(data.address)
          setMeta(data.meta)
        }
      })
    }, [])

    useEffect(() => {
      if (enabled !== undefined) {
        toggle(enabled)
      }
    }, [enabled])

    const toggle = (show: boolean) => {
      const toValue = show ? SHOWN : HIDDEN
      Animated.spring(marginTop, {toValue}).start()
    }

    return (
      <Animated.View
        style={{
          marginTop,
          paddingHorizontal: 20 * k,
          borderColor: colors.LIGHT_GREY,
          borderBottomWidth: 1,
          paddingVertical: 12 * minHeight,
          backgroundColor: colors.WHITE,
          zIndex: -1,
          // transform: [{translateY: state.marginTop}],
        }}
      >
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            onPress({
              location: locationStore!.location,
              address,
              meta,
              isCurrent: true,
            })
          }
        >
          <Image
            source={require('../../../images/currentLocation.png')}
            style={{marginRight: 20 * k}}
          />
          <View style={{flex: 1}}>
            <RText weight="Bold" size={16}>
              Use current location
            </RText>
            <RText size={15} numberOfLines={1}>
              {address}
            </RText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  })
)

export default CurrentLocation
