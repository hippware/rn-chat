import React from 'react'
import {Animated} from 'react-native'
import {observable, when} from 'mobx'
import {height} from '../Global'

type Props = {
  scene: any
  transitionProps: any
}

class AnimatedPushScene extends React.Component<Props> {
  @observable viewHeight: number = 0
  animating: boolean = false
  slideHeight = new Animated.Value(height) // initialize to full screen height

  componentDidMount() {
    when(
      () => !!this.viewHeight,
      () => {
        this.slideHeight.setValue(this.viewHeight)
        this.showScene()
      }
    )
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

  showScene = () => this.slideSceneTo(0)

  hideScene = () =>
    this.slideSceneTo(this.props.scene.route.params.fromTop ? -this.viewHeight : this.viewHeight)

  slideSceneTo = offset => {
    if (this.animating) return
    this.animating = true
    Animated.spring(this.slideHeight, {
      toValue: offset,
      useNativeDriver: true,
    }).start(() => (this.animating = false))
  }

  render() {
    const {
      descriptor: {navigation, getComponent},
      route: {
        params: {fromTop},
      },
      isActive,
    } = this.props.scene
    const Scene = getComponent()
    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: fromTop ? 0 : undefined,
          bottom: fromTop ? undefined : 0,
          transform: [
            {
              translateY: this.slideHeight,
              // TODO: opacity - fade in on show and fade out on hide
            },
          ],
        }}
        onLayout={({
          nativeEvent: {
            layout: {height: viewHeight},
          },
        }) => (this.viewHeight = viewHeight)}
      >
        <Scene navigation={navigation} isActive={isActive} />
      </Animated.View>
    )
  }
}

export default AnimatedPushScene
