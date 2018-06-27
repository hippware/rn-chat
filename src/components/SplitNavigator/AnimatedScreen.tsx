import React from 'react'
import {View, Animated, StyleSheet, PanResponder, Text} from 'react-native'
import {height} from '../Global'

type Props = {
  base: any
  popup: any
  show: boolean
  splitHeight: number
  draggable: boolean
}

type State = {
  bottom: Animated.Value
  panY: Animated.Value
  opened: boolean
}

class AnimatedScreen extends React.Component<Props, State> {
  state = {
    bottom: new Animated.Value(0),
    panY: new Animated.Value(0),
    opened: false,
  }
  _panPlaceholder: number = 0

  // Pan responder to handle gestures
  _panResponder: any = {}

  componentWillMount() {
    this.state.panY.addListener(value => {
      // console.log('& panY: ', value.value)
      this._panPlaceholder = value.value
    })
  }

  componentWillReceiveProps({show, draggable}) {
    // console.log('& animatedScreen props', this.props)
    if (show !== this.props.show) {
      if (!show) this.setState({opened: false})
      Animated.spring(this.state.bottom, {
        toValue: show ? -this.props.splitHeight : 0,
        // useNativeDriver: true,
      }).start(() => {
        // console.log('& after', show)
        if (show) this.setState({opened: true})
      })
    }

    this._panResponder = draggable
      ? PanResponder.create({
          onStartShouldSetPanResponder: this._grantPanResponder,
          onStartShouldSetPanResponderCapture: this._grantPanResponder,
          onMoveShouldSetPanResponder: this._grantPanResponder,
          onMoveShouldSetPanResponderCapture: this._grantPanResponder,
          onPanResponderGrant: this._handlePanResponderGrant,
          onPanResponderMove: this._handlePanResponderMove,
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: this._handlePanResponderEnd,
          onPanResponderTerminate: this._handlePanResponderEnd,
          onShouldBlockNativeResponder: (evt, gestureState) => true,
        })
      : {}
  }

  render() {
    const {base, popup, show, splitHeight} = this.props
    const {bottom, panY, opened} = this.state
    const y = Animated.add(bottom, panY)
    const translateYPan = y.interpolate({
      inputRange: [-height, -splitHeight],
      outputRange: [-height, -splitHeight],
      extrapolateRight: 'clamp',
    })
    const headerOpacity = y.interpolate({
      inputRange: [-height, -height + 50, -splitHeight],
      outputRange: [1, 0, 0],
    })
    const openCloseTransform = {transform: [{translateY: bottom}]}
    const panTransform = {transform: [{translateY: translateYPan}]}
    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: headerOpacity,
          }}
        >
          <Text style={{fontSize: 20}}>TODO: Header Placeholder</Text>
        </Animated.View>
        <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, openCloseTransform]}>
          {base}
        </Animated.View>
        <Animated.View
          style={[
            styles.absolute,
            {top: height},
            {marginTop: show ? -30 : 0},
            opened ? panTransform : openCloseTransform,
          ]}
          {...this._panResponder.panHandlers}
        >
          {popup}
        </Animated.View>
      </View>
    )
  }

  // Either allow or deny gesture handler
  _grantPanResponder = (evt, {moveX, moveY, dx, dy}) => {
    // console.log('& gpr', dx, dy, evt)
    return Math.abs(dy) > 0.75
  }

  // Called when granted
  _handlePanResponderGrant = (evt, gestureState) => {
    // console.log('& hprg', this._panPlaceholder)
    if (this._panPlaceholder > 0) {
      this._panPlaceholder = 0
    }
    this.state.panY.setOffset(this._panPlaceholder)
    this.state.panY.setValue(0)
  }

  _handlePanResponderMove = Animated.event([null, {dy: this.state.panY}])

  // Called when gesture ended
  _handlePanResponderEnd = (evt, {vy}) => {
    // console.log('& hpr end', vy)
    Animated.decay(this.state.panY, {velocity: vy, deceleration: 0.997}).start()
    // TODO: "bounce" back to bottom-most position?
    // this.state.panY.setOffset(this._panPlaceholder)
    // this.state.panY.setValue(0)
  }
}

export default AnimatedScreen

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})
