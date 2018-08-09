import React from 'react'
import {Animated} from 'react-native'
import {observable, when} from 'mobx'
import {height} from '../Global'
import {TouchThroughWrapper} from 'react-native-touch-through-view'

type Props = {
  scene: any
  transitionProps: any
}

class AnimatedPushScene extends React.Component<Props> {
  @observable viewHeight: number = 0
  animating: boolean = false
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
    if (this.animating) return
    this.animating = true
    Animated.spring(this.state.slideHeight, {
      toValue: toHeight,
      useNativeDriver: true,
    }).start(() => (this.animating = false))
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
    const {descriptor: {navigation, getComponent}} = this.props.scene
    const Scene = getComponent()
    const style = this._getScreenStyle()
    return (
      <Wrapper {...this.props}>
        <Animated.View
          style={style}
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

const Wrapper = ({children, scene: {route: {params: {draggable}}}}) =>
  draggable ? (
    <TouchThroughWrapper style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      {children}
    </TouchThroughWrapper>
  ) : (
    children
  )

export default AnimatedPushScene
