import React from 'react'
import {Animated, StyleSheet, PanResponder, Easing} from 'react-native'
import {height as screenHeight, height} from '../Global'

type Props = {
  transitionProps: any
  scene: any
}

class DragUpScene extends React.Component<Props> {
  _panResponder: any
  _panValue: number = 0

  // state = {
  panY = new Animated.Value(0)
  slideHeight = new Animated.Value(0)
  // }

  constructor(props: Props) {
    super(props)

    this.panY.addListener(({value}) => (this._panValue = value))
    // this.slideHeight.addListener(({value}) => console.log('& e', value))

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.panY.setOffset(this._panValue)
        this.panY.setValue(0)
      },
      onPanResponderMove: Animated.event([null, {dy: this.panY}]),
      onPanResponderRelease: () => {
        this.panY.flattenOffset()
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

  showScene = () => this.slideSceneTo(300) // NOTE: we may need to make this a param later for starting from different heights

  hideScene = () => this.slideSceneTo(0)

  slideSceneTo = h => {
    Animated.spring(this.slideHeight, {
      toValue: -h,
      // stiffness: 5000,
      // damping: 600,
      // mass: 3,
      // useNativeDriver: true,
    }).start()
  }

  render() {
    const {scene} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    const {add, multiply, Value} = Animated

    const {panY, slideHeight} = this
    const yOffset = add(panY, slideHeight).interpolate({
      inputRange: [-height - 40, -300, 0],
      outputRange: [-height - 40, -300, -300],
      extrapolate: 'clamp',
      // easing: Easing.elastic,
      // {clamp: true}
    })

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
          {transform: [{translateY: yOffset}]},
          // {transform: [{translateY: multiply(slideHeight, new Animated.Value(-1))}]},
          // {transform: [{translateY: -300}]},
        ]}
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
