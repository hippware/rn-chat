import React from 'react'
import {Animated, View, Image, TouchableOpacity} from 'react-native'
import {k, width} from '../Global'
import {colors} from '../../constants/index'
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

const HIDDEN = -20 * k
const SHOWN = 44 * k

@inject('locationStore', 'geocodingStore')
@observer
class CurrentLocation extends React.Component<Props, State> {
  state: State = {
    marginTop: new Animated.Value(SHOWN),
    address: '',
    meta: {},
  }

  componentDidMount() {
    const {locationStore, geocodingStore /*, enabled*/} = this.props
    // this.toggle(enabled)
    setTimeout(async () => {
      const data = await geocodingStore.reverse(locationStore!.location)
      if (data) {
        this.setState(data)
      }
    })
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
          position: 'absolute',
          width,
          marginTop: this.state.marginTop,
          paddingHorizontal: 20 * k,
          borderColor: colors.LIGHT_GREY,
          borderBottomWidth: 1,
          paddingVertical: 10 * k,
          backgroundColor: colors.WHITE,
          // backgroundColor: 'red',
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
            <RText weight="Bold" size={15}>
              Use Current Location
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
