import React, {useState} from 'react'
import {Transitioner} from 'react-navigation-stack'
import {View, Platform, Animated, StyleSheet} from 'react-native'
import AnimatedPushScene from './AnimatedPushScene'
import AnimatedMainScene from './AnimatedMainScene'
import BackButton from './BackButton'
import NavBarHeader from './NavBarHeader'
import {Provider} from 'mobx-react'

type Props = {
  navigation: any
  navigationConfig: any
  descriptors: any
  screenProps: any
}

const SplitRenderer = (props: Props) => {
  const [scrollY] = useState(new Animated.Value(0))

  function _renderScene(transitionProps, scene) {
    const {index} = scene
    if (index === 0) {
      // main screen
      return (
        <AnimatedMainScene transitionProps={transitionProps} key={scene.route.key} scene={scene} />
      )
    } else {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            // todo: remove borderWidth on Android (appears around edge of Bottom Menu screens)
            borderWidth: Platform.OS === 'android' ? 1 : 0, // workaround to display 'Back' button for android
            borderColor: 'transparent',
          }}
          key={scene.route.key}
          pointerEvents="box-none"
        >
          <BackButton scene={scene} />
          <AnimatedPushScene transitionProps={transitionProps} scene={scene} />
        </View>
      )
    }
  }

  function _render(transitionProps, prevTransitionProps) {
    const {scenes, scene} = transitionProps
    const theScenes = scenes.map(s => _renderScene(transitionProps, s))
    return (
      <Provider scrollY={scrollY}>
        <View style={{flex: 1}}>
          {theScenes}
          <NavBarHeader config={scene.descriptor.options.fadeNavConfig} />
        </View>
      </Provider>
    )
  }

  return (
    <Transitioner
      screenProps={props.screenProps}
      descriptors={props.descriptors}
      navigation={props.navigation}
      render={_render}
      onTransitionStart={() => scrollY.setValue(0)}
      // onTransitionEnd={onTransitionEnd}
    />
  )
}

export default SplitRenderer
