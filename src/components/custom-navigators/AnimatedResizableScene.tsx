import React from 'react'
import {Animated} from 'react-native'
import {height as screenHeight} from '../Global'
import {observer} from 'mobx-react/native'

type Props = {
  scene: any
  transitionProps: any
}

@observer
class AnimatedResizableScene extends React.Component<Props> {
  height: number = 0
  state = {slideHeight: new Animated.Value(0)}

  componentWillReceiveProps({transitionProps, scene}) {
    if (scene.index > 0) {
      if (transitionProps.index === scene.index) {
        this.showScene()
      } else {
        this.hideScene()
      }
    }
  }

  showScene = () => this.slideSceneTo(this.height)

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

  _getScreenStyle = () => {
    const {scene: {index, route: {params: {fromTop}}}} = this.props
    if (index === 0) {
      // the "main" screen
      return {flex: 1}
    } else {
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: fromTop ? undefined : screenHeight,
        bottom: fromTop ? screenHeight : undefined,
        transform: [
          {
            translateY: fromTop
              ? Animated.multiply(this.state.slideHeight, new Animated.Value(-1)) // TODO: should we do this with interpolation instead?
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
        <Scene
          screenProps={{
            onLayout: ({nativeEvent: {layout: {height}}}) => {
              if (height !== this.height) {
                this.height = height
                this.slideSceneTo(height)
              }
            },
          }}
          navigation={navigation}
        />
      </Animated.View>
    )
  }
}

export default AnimatedResizableScene
