import React from 'react'
import {View, Animated, StyleSheet, TouchableWithoutFeedback, PanResponder} from 'react-native'

type Props = {
  base: any
  show: boolean
  menu: any
  splitHeight: number
}

type State = {
  bottom: Animated.Value
}

class AnimatedScreen extends React.Component<Props, State> {
  state = {
    bottom: new Animated.Value(0),
  }

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
    Animated.spring(this.state.bottom, {
      toValue: show ? -this.props.splitHeight : 0,
    }).start()
  }

  render() {
    const {base, menu, splitHeight, show} = this.props
    const theTransform = {transform: [{translateY: this.state.bottom}]}

    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, theTransform]}>
          {base}
        </Animated.View>
        <Animated.View
          style={[
            styles.absolute,
            {
              bottom: -splitHeight,
              height: splitHeight + (show ? 30 : 0),
            },
            theTransform,
            {borderWidth: 1, borderColor: 'red'},
          ]}
          {...this._panResponder.panHandlers}
        >
          {/* <TouchableWithoutFeedback
            onPress={() => console.log('& touch')}
          > */}
          {menu}
          {/* </TouchableWithoutFeedback> */}
        </Animated.View>
      </View>
    )
  }

  // Either allow or deny gesture handler
  _grantPanResponder = (evt, gestureState) => {
    console.log('& gpr', evt, gestureState)
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
    console.log('& hprg', evt, gestureState)
    // // Update the state so we know we're in the middle of pulling it
    // this.setState({ pulling: true });
    // // Set offset and initialize with 0 so we update it
    // // with relative values from gesture handler
    // this._animatedPosition.setOffset(this._currentPosition);
    // this._animatedPosition.setValue(0);
  }

  // Called when being pulled
  _handlePanResponderMove = (evt, gestureState) => {
    console.log('& hprm', evt, gestureState)
    // // Update position unless we go outside of allowed range
    // if (this.insideAllowedRange()) {
    //   this._animatedPosition.setValue(gestureState.dy);
    // }
  }

  // Called when gesture ended
  _handlePanResponderEnd = (evt, gestureState) => {
    console.log('& hpre', evt, gestureState)
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
