import React from 'react'
import {View, Animated, StyleSheet, PanResponder} from 'react-native'
import {height} from '../Global'

type Props = {
  base: any
  menu: any
  show: boolean
  splitHeight: number
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
      // console.log('& bottom + panY: ', value.value + this.state.bottom._value)

      // TODO: set this so that _panPlaceholder doesn't put the total position below
      this._panPlaceholder = value.value
    })

    this._panResponder = PanResponder.create({
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
  }

  componentWillReceiveProps({show}) {
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
  }

  render() {
    const {base, menu, show, splitHeight} = this.props
    const {bottom, panY, opened} = this.state
    const translateYPan = Animated.add(bottom, panY).interpolate({
      inputRange: [-height, -splitHeight],
      outputRange: [-height, -splitHeight],
      extrapolateRight: 'clamp',
    })
    const openCloseTransform = {transform: [{translateY: bottom}]}
    const panTransform = {transform: [{translateY: translateYPan}]}
    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, openCloseTransform]}>
          {base}
        </Animated.View>
        <Animated.View
          style={[
            styles.absolute,
            {
              top: height,
            },
            {marginTop: show ? -30 : 0},
            opened ? panTransform : openCloseTransform,
          ]}
          {...this._panResponder.panHandlers}
        >
          {menu}
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
  _handlePanResponderEnd = (evt, gestureState) => {
    this.state.panY.flattenOffset()
    // TODO: Animated.decay to simulate "momentum" instead of just stopping the gesture?
    // TODO: "bounce" back to bottom-most position?
    // console.log('& hpr end', this._panPlaceholder)
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
