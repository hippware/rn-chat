import React from 'react'
import {Animated, StyleSheet, PanResponder} from 'react-native'
import {height as screenHeight} from '../Global'

type Props = {
  transitionProps: any
  scene: any
  initialHeight: number
}

type State = {
  panY: Animated.Value
  slideHeight: Animated.Value
}

class DragUpScene extends React.Component<Props, State> {
  _panResponder: any

  state = {
    panY: new Animated.Value(0),
    slideHeight: new Animated.Value(0),
  }

  constructor(props: Props) {
    super(props)

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      // onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.state.panY.setValue(0)
      },
      onPanResponderMove: Animated.event([null, {dy: this.state.panY}]),
      // onPanResponderMove: thing => console.log('& move', thing),
      onPanResponderRelease: () => {
        /**/
      },
    })
  }

  componentWillReceiveProps({transitionProps, scene}) {
    if (scene.index > 0) {
      if (transitionProps.index === scene.index) {
        this.showScene()
      } else {
        this.hideScene()
      }
    }
  }

  showScene = () => this.slideSceneTo(this.props.initialHeight)

  hideScene = () => this.slideSceneTo(0)

  slideSceneTo = height => {
    Animated.spring(this.state.slideHeight, {
      toValue: -height,
      // stiffness: 5000,
      // damping: 600,
      // mass: 3,
      useNativeDriver: true,
    }).start()
  }

  render() {
    // const theMargin = screenHeight - splitHeight - 30

    const {scene, initialHeight} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    // const style = this._getScreenStyle()
    // const {add, multiply} = Animated

    // const {panY, slideHeight} = this.state
    // const top = add(panY, multiply(slideHeight, new Animated.Value(-1)))

    // .interpolate({
    //   inputRange: [0, screenHeight],
    //   outputRange: [-initialHeight, -screenHeight],
    // })

    return (
      <Animated.View
        style={[
          styles.absolute,
          {
            top: screenHeight,
            // paddingTop: theMargin,
            height: screenHeight,
          },
          // {transform: [{translateY: top}]},
          // {transform: [{translateY: multiply(slideHeight, new Animated.Value(-1))}]},
          {transform: [{translateY: -initialHeight}]},
        ]}
        // scrollEventThrottle={16}
        // onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}
        {...this._panResponder.panHandlers}
      >
        <Scene navigation={navigation} />
      </Animated.View>
    )
  }
}

export default DragUpScene

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})
