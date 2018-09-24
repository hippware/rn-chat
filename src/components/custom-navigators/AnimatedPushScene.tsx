import React from 'react'
import {Animated} from 'react-native'
import {observable, when} from 'mobx'
import {height} from '../Global'
import {TouchThroughWrapper} from 'react-native-touch-through-view'

type Props = {
  scene: any
  transitionProps: any
}

class AnimatedPushScene extends React.PureComponent<Props> {
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
    const {descriptor: {navigation, getComponent}, route: {params: {fromTop}}} = this.props.scene
    const Scene = getComponent()
    console.log('RENDER SCENE:', this.props.scene.index, this.props.scene.route.key)
    return (
      <Wrapper {...this.props}>
        <Animated.View
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
          onLayout={({nativeEvent: {layout: {height: viewHeight}}}) =>
            (this.viewHeight = viewHeight)
          }
        >
          <Scene navigation={navigation} />
        </Animated.View>
      </Wrapper>
    )
  }
}

const Wrapper = ({children, scene: {isActive, route: {params: {draggable}}}}) =>
  draggable && isActive ? (
    <TouchThroughWrapper style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      {children}
    </TouchThroughWrapper>
  ) : (
    children
  )

export default AnimatedPushScene
