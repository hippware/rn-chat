import React, {useEffect, useState} from 'react'
import {Animated} from 'react-native'
import {when} from 'mobx'
import {height} from '../Global'
import {observer} from 'mobx-react'
import {useHomeStore} from 'src/utils/injectors'

type Props = {
  scene: any
  transitionProps: any
}

const AnimatedPushScene = observer(({scene, transitionProps}: Props) => {
  const [viewHeight, setViewHeight] = useState(0)
  // initialize to full screen height
  const [slideHeight] = useState(new Animated.Value(height))
  const {fullScreenMode} = useHomeStore()

  useEffect(() => {
    when(
      () => !!viewHeight,
      () => {
        slideHeight.setValue(viewHeight)
        showScene()
      }
    )
  }, [])

  const showScene = () => slideSceneTo(0)

  const hideScene = () => slideSceneTo(scene.route.params.fromTop ? -viewHeight : viewHeight)

  function slideSceneTo(offset) {
    Animated.spring(slideHeight, {
      toValue: offset,
      useNativeDriver: true,
    }).start()
  }

  if (scene.index > 0) {
    if (transitionProps.index === scene.index && !fullScreenMode) {
      showScene()
    } else {
      hideScene()
    }
  }

  const {
    descriptor: {navigation, getComponent},
    route: {
      params: {fromTop},
    },
    isActive,
  } = scene
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
            translateY: slideHeight,
            // TODO: opacity - fade in on show and fade out on hide
          },
        ],
      }}
      onLayout={({
        nativeEvent: {
          layout: {height: vHeight},
        },
      }) => setViewHeight(vHeight)}
    >
      <Scene navigation={navigation} isActive={isActive} />
    </Animated.View>
  )
})

export default AnimatedPushScene
