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
  // menuTop: Animated.Value
  panY
}

class AnimatedScreen extends React.Component<Props, State> {
  state = {
    bottom: new Animated.Value(0),
    // menuTop: new Animated.Value(0),
    panY: new Animated.Value(0),
  }
  _panPlaceholder: number = 0

  // Pan responder to handle gestures
  _panResponder: any = {}

  componentWillMount() {
    // // Set current position
    // this._currentPosition = this._animatedPosition._value;
    // // Listen for this._animatedPosition changes
    // this._animatedPosition.addListener((value) => {
    //   // Update _currentPosition
    //   this._currentPosition = value.value;
    //   // Animate depending values
    //   this.config.position.animates.map(item => {
    //     item().setValue(value.value);
    //   })
    // });
    // // Reset value once listener is registered to update depending animations
    // this._animatedPosition.setValue(this._animatedPosition._value);

    this.state.panY.addListener(value => (this._panPlaceholder = value.value))

    // Initialize PanResponder to handle gestures
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
    // Animated.parallel([
    //   Animated.spring(this.state.bottom, {
    //     toValue: show ? -this.props.splitHeight : 0,
    //     useNativeDriver: true,
    //   }),
    //   Animated.spring(this.state.menuTop, {
    //     toValue: show ? -this.props.splitHeight : 0,
    //     useNativeDriver: true,
    //   }),
    // ])
    Animated.spring(this.state.bottom, {
      toValue: show ? -this.props.splitHeight : 0,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {base, menu, show} = this.props
    const {bottom, panY} = this.state

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[styles.absolute, {top: 0, bottom: 0}, {transform: [{translateY: bottom}]}]}
        >
          {base}
        </Animated.View>
        <Animated.View
          style={[
            styles.absolute,
            {
              top: height,
            },
            {marginTop: show ? -30 : 0},
            {transform: [{translateY: Animated.add(bottom, panY)}]},
            // {transform: [{translateY: menuTop}]},
          ]}
          {...this._panResponder.panHandlers}
        >
          {menu}
        </Animated.View>
      </View>
    )
  }

  // Either allow or deny gesture handler
  _grantPanResponder = (evt, gestureState) => {
    // console.log('& gpr', evt, gestureState)
    // // Allow if is not open
    // if (!this.state.open) {
    //   return true;
    // }
    // // Allow if user haven't scroll the content yet
    // else if (this.pulledDown(gestureState) && this.state.scrollOffset <= 0) {
    //   return true;
    // }
    // // Allow if pulled down rapidly
    // else if (this.pulledDown(gestureState) && this.pulledFast(gestureState)) {
    //   return true;
    // }

    // Deny otherwise
    return true
  }

  // Called when granted
  _handlePanResponderGrant = (evt, gestureState) => {
    // console.log('& hprg', evt, gestureState)
    this.state.panY.setOffset(this._panPlaceholder)
    this.state.panY.setValue(0)
    // // Update the state so we know we're in the middle of pulling it
    // this.setState({ pulling: true });
    // // Set offset and initialize with 0 so we update it
    // // with relative values from gesture handler
    // this._animatedPosition.setOffset(this._currentPosition);
    // this._animatedPosition.setValue(0);
  }

  // // Called when being pulled
  // _handlePanResponderMove = (evt, gestureState) => {
  //   console.log('& hprm', gestureState.dy)
  //   const {menuTop, bottom} = this.state

  //   menuTop.setValue(menuTop._value + gestureState.dy)

  //   // const testValue = bottom.set
  //   // panY.setValue()

  //   // // Update position unless we go outside of allowed range
  //   // if (this.insideAllowedRange()) {
  //   //   this._animatedPosition.setValue(gestureState.dy);
  //   // }
  // }

  _handlePanResponderMove = Animated.event([null, {dy: this.state.panY}])

  // _handlePanResponderMove = Animated.event([
  //   null, { dx: this.state.pan.x, dy: this.state.pan.y }
  // ])

  // Called when gesture ended
  _handlePanResponderEnd = (evt, gestureState) => {
    // console.log('& hpre', evt, gestureState)
    // // Reset offset
    // this._animatedPosition.flattenOffset();
    // // Reset pulling state
    // this.setState({ pulling: false });
    // // Pulled down and far enough to trigger close
    // if (this.pulledDown(gestureState) && this.pulledFar(gestureState)) {
    //   return this.close();
    // }
    // // Pulled up and far enough to trigger open
    // else if (this.pulledUp(gestureState) && this.pulledFar(gestureState)) {
    //   return this.open();
    // }
    // // Toggle if tapped
    // else if (this.tapped(gestureState)) {
    //   return this.toggle();
    // }
    // // Restore back to appropriate position otherwise
    // else {
    //   this.restore();
    // }
  }

  // Handle content scrolling
  _handleScroll = event => {
    console.log('& hs', event)
    // const { y } = event.nativeEvent.contentOffset;
    // this.setState({ scrollOffset: y });
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
