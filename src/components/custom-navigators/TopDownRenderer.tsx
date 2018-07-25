import React, {ReactElement} from 'react'
import {Animated, View, StyleSheet} from 'react-native'

export default ({navigation, navigationConfig, descriptors}) => {
  const {state} = navigation
  const {routes, index} = state
  const descriptor = descriptors[state.routes[0].key] // base component to render
  const ScreenComponent = descriptor.getComponent()
  const routeState = routes[index > 0 ? index : 1]
  const popupDescriptor = descriptors[routeState.key]
  const Popup = popupDescriptor.getComponent()
  const params = routeState && routeState.params ? routeState.params : {}

  return (
    <TopSlider
      topHeight={navigationConfig.topHeight}
      {...params}
      base={<ScreenComponent navigation={descriptor.navigation} />}
      show={index !== 0}
      popup={
        <Popup
          navigation={popupDescriptor.navigation}
          // {...params}
        />
      }
    />
  )
}

interface IProps {
  base: ReactElement<any> // main element
  show: boolean
  popup: ReactElement<any> // element that slides up from the bottom of the screen
  topHeight: number
}

type State = {
  y: Animated.Value
  keepMounted: boolean
}

class TopSlider extends React.Component<IProps, State> {
  state = {
    y: new Animated.Value(0), // determines the y offset of sliders
    keepMounted: false,
  }

  componentWillReceiveProps({show, topHeight}: IProps) {
    if (show !== this.props.show) {
      const toValue = show ? topHeight : 0
      if (show) this.setState({keepMounted: true})
      Animated.spring(this.state.y, {
        toValue,
        useNativeDriver: true,
      }).start(() => {
        if (!show) this.setState({keepMounted: false})
      })
    }
  }

  render() {
    const {base, popup, topHeight} = this.props
    const {y} = this.state
    const transY = y.interpolate({
      inputRange: [0, topHeight],
      outputRange: [-topHeight, 0],
    })
    const openCloseTransform = {transform: [{translateY: transY}]}

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[
            styles.absolute,
            {
              zIndex: 1000,
              top: 0,
              // height: topHeight,
              flex: 1,
            },
            openCloseTransform,
          ]}
        >
          {this.state.keepMounted && popup}
        </Animated.View>
        {base}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})
