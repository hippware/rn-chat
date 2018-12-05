import React from 'react'
import {Animated, View, Image, TouchableOpacity} from 'react-native'
import {k, minHeight} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {observer, inject} from 'mobx-react/native'
import {ILocationStore} from '../../store/LocationStore'

type Props = {
  enabled: boolean
  onPress: (param: any) => void
  locationStore?: ILocationStore
  geocodingStore?: any
}

type State = {
  address: string
  meta: any
  marginTop: any
}

const HIDDEN = -64 * k
const SHOWN = 0 * k

@inject('locationStore', 'geocodingStore')
@observer
class CurrentLocation extends React.Component<Props, State> {
  state: State = {
    marginTop: new Animated.Value(SHOWN),
    address: '',
    meta: {},
  }
  timeout

  componentDidMount() {
    const {locationStore, geocodingStore /*, enabled*/} = this.props
    // this.toggle(enabled)
    this.timeout = setTimeout(async () => {
      const data = await geocodingStore.reverse(locationStore!.location)
      if (data) {
        this.setState(data)
      }
    })
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }
  componentWillReceiveProps(props) {
    if (props.enabled !== undefined && this.props.enabled !== props.enabled) {
      this.toggle(props.enabled)
    }
  }
  toggle = (show: boolean) => {
    const toValue = show ? SHOWN : HIDDEN
    Animated.spring(this.state.marginTop, {toValue}).start()
  }

  onPress = () => {
    this.props.onPress({
      location: this.props.locationStore!.location,
      address: this.state.address,
      meta: this.state.meta,
      isCurrent: true,
    })
  }

  render() {
    return (
      <Animated.View
        style={{
          marginTop: this.state.marginTop,
          paddingHorizontal: 20 * k,
          borderColor: colors.LIGHT_GREY,
          borderBottomWidth: 1,
          paddingVertical: 12 * minHeight,
          backgroundColor: colors.WHITE,
          zIndex: -1,
          // transform: [{translateY: this.state.marginTop}],
        }}
      >
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={this.onPress}
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
              {this.state.address}
            </RText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

export default CurrentLocation
