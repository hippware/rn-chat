import React from 'react'
import {Animated} from 'react-native'
import {height} from '../Global'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

type Props = {
  scene: any
  transitionProps: any
}

@observer
class AnimatedMainScene extends React.Component<Props> {
  @observable isOffset: boolean = false

  state = {
    yOffset: new Animated.Value(0),
  }

  componentWillReceiveProps(nextProps) {
    const {index, scene: {route: {params: {fromTop}}}} = nextProps.transitionProps
    if (index > 0 && !fromTop && !this.isOffset) {
      // shift the scene up 150
      this.slideSceneTo(-150)
    } else if ((fromTop || index === 0) && this.isOffset) {
      this.slideSceneTo(0)
    }
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
          top: this.isOffset ? -85 : 0,
          height: this.isOffset ? height + 150 : height,
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
