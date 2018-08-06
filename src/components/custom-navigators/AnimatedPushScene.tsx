import React from 'react'
import {Animated} from 'react-native'
import {observable, when} from '../../../node_modules/mobx'
import {height} from '../Global'

type Props = {
  scene: any
  transitionProps: any
  // initialHeight: number
}

class AnimatedPushScene extends React.Component<Props> {
  @observable viewHeight: number = 0
  state = {
    slideHeight: new Animated.Value(height), // initialize to full screen height
  }

  componentDidMount() {
    when(
      () => !!this.viewHeight,
      () => {
        this.state.slideHeight.setValue(this.viewHeight)
        this.showScene()
      }
    )
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

  hideScene = () => this.slideSceneTo(this.viewHeight)

  slideSceneTo = toHeight => {
    Animated.spring(this.state.slideHeight, {
      toValue: toHeight,
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
      <Animated.View
        style={style}
        onLayout={({nativeEvent: {layout: {height: viewHeight}}}) => (this.viewHeight = viewHeight)}
      >
        <Scene navigation={navigation} />
      </Animated.View>
    )
  }
}

export default AnimatedPushScene
