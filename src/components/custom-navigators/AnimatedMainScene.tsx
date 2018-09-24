import React from 'react'
import {Animated} from 'react-native'
import {height} from '../Global'

type Props = {
  scene: any
  transitionProps: any
}

class AnimatedMainScene extends React.Component<Props> {
  isOffset: boolean = false
  yOffset: Animated.Value = new Animated.Value(height) // initialize to full screen height

  componentWillReceiveProps(nextProps) {
    const {index, scene: {route: {params: {fromTop}}}} = nextProps.transitionProps
    if (index > 0 && !fromTop && !this.isOffset) {
      this.slideSceneTo(-150)
    } else if ((fromTop || index === 0) && this.isOffset) {
      this.slideSceneTo(0)
    }
  }

  slideSceneTo = toHeight => {
    this.isOffset = toHeight !== 0
    Animated.spring(this.yOffset, {
      toValue: toHeight,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {scene} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: this.isOffset ? height + 150 : height,
          transform: [
            {
              translateY: this.yOffset,
            },
          ],
        }}
      >
        <Scene navigation={navigation} />
      </Animated.View>
    )
  }
}

export default AnimatedMainScene
