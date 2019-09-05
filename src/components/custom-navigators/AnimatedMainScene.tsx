import React, {useState} from 'react'
import {Animated} from 'react-native'
import {height} from '../Global'

type Props = {
  scene: any
  transitionProps: any
}

const AnimatedMainScene = ({scene, transitionProps}: Props) => {
  const [isOffset, setIsOffset] = useState(false)
  const [yOffset] = useState(new Animated.Value(0))

  const {
    index,
    scene: {
      route: {
        params: {fromTop},
      },
    },
  } = transitionProps
  if (index > 0 && !fromTop && !isOffset) {
    slideSceneTo(-150)
  } else if ((fromTop || index === 0) && isOffset) {
    slideSceneTo(0)
  }

  function slideSceneTo(toHeight) {
    setIsOffset(toHeight !== 0)
    Animated.spring(yOffset, {
      toValue: toHeight,
      useNativeDriver: true,
    }).start()
  }

  const {navigation, getComponent} = scene.descriptor
  const Scene = getComponent()
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: isOffset ? -85 : 0,
        height: isOffset ? height + 150 : height,
        transform: [
          {
            translateY: yOffset,
          },
        ],
      }}
    >
      <Scene navigation={navigation} />
    </Animated.View>
  )
}

export default AnimatedMainScene
