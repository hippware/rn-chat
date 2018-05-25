import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {Marker} from 'react-native-maps'
import {View, Image} from 'react-native'
@inject('locationStore', 'wocky')
@observer
export default class CurrentLocationMarker extends React.Component<any> {
  state = {tracking: true}

  // workaround for https://github.com/react-community/react-native-maps/issues/1031#issuecomment-378881118
  componentDidMount() {
    setTimeout(() => this.setState({tracking: false}), 500)
  }
  render() {
    const locationStore = this.props.locationStore
    const currentLoc = locationStore.location
    if (!currentLoc) {
      return null
    }
    const heading = currentLoc && currentLoc.heading
    return (
      <Marker
        tracksViewChanges={this.state.tracking}
        // pointerEvents="none"
        style={{zIndex: 1000}}
        coordinate={{latitude: currentLoc.latitude, longitude: currentLoc.longitude}}
      >
        <View style={{transform: heading ? [{rotate: `${360 + heading} deg`}] : []}}>
          <Image source={require('../../../images/location-indicator.png')} />
        </View>
      </Marker>
    )
  }
}
