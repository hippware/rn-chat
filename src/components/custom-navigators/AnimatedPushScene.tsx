import React from 'react'
import {Animated} from 'react-native'

type Props = {
  scene: any
  transitionProps: any
  initialHeight: number
}

class AnimatedPushScene extends React.Component<Props> {
  state = {slideHeight: new Animated.Value(this.props.initialHeight)}

  componentDidMount() {
    this.showScene()
  }

  componentWillReceiveProps({transitionProps, scene}) {
    // if (scene.index > 0) {
    //   console.log('& scene', scene, transitionProps)
    // }

    if (scene.index > 0) {
      if (transitionProps.index === scene.index) {
        this.showScene()
      } else {
        this.hideScene()
      }
    }
  }

  showScene = () => this.slideSceneTo(0)

  hideScene = () => this.slideSceneTo(this.props.initialHeight)

  slideSceneTo = height => {
    Animated.spring(this.state.slideHeight, {
      toValue: height,
      useNativeDriver: true,
    }).start()
  }

  _getScreenStyle = () => {
    const {scene: {index, route: {params: {fromTop}}}} = this.props
    const absolute = {position: 'absolute', left: 0, right: 0}
    if (index === 0) {
      // the "main" screen
      return {flex: 1}
    } else {
      // "push" into view from a set height (good for scenes that will change height a lot)
      return {
        ...absolute,
        borderWidth: 1,
        borderColor: 'red',
        top: fromTop ? 0 : undefined,
        bottom: fromTop ? undefined : 0,
        transform: [
          {
            translateY: fromTop
              ? Animated.multiply(this.state.slideHeight, new Animated.Value(-1))
              : this.state.slideHeight,
            // TODO: opacity - fade in on show and fade out on hide
          },
        ],
      }
    }
  }

  render() {
    const {scene} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    const style = this._getScreenStyle()
    return (
      <Animated.View style={style}>
        <Scene navigation={navigation} />
      </Animated.View>
    )
  }
}

export default AnimatedPushScene
