import React from 'react'
import {Animated} from 'react-native'

type Props = {
  scene: any
  transitionProps: any
}

class AnimatedMainScene extends React.Component<Props> {
  isOffset: boolean = false

  state = {
    yOffset: new Animated.Value(0), // initialize to full screen height
  }

  slideSceneTo = toHeight => {
    this.isOffset = toHeight !== 0
    Animated.spring(this.state.yOffset, {
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
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          transform: [
            {
              translateY: this.state.yOffset,
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
