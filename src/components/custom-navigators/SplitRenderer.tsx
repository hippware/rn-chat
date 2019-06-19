import React from 'react'
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

export default class SplitRenderer extends React.Component<Props> {
  scrollY = new Animated.Value(0)

  _renderScene = (transitionProps, scene) => {
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
          <BackButton transitionProps={transitionProps} scene={scene} />
          <AnimatedPushScene transitionProps={transitionProps} scene={scene} />
        </View>
      )
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const {scenes, scene} = transitionProps
    const theScenes = scenes.map(s => this._renderScene(transitionProps, s))
    return (
      <Provider scrollY={this.scrollY}>
        <View style={{flex: 1}}>
          {theScenes}
          <NavBarHeader config={scene.descriptor.options.fadeNavConfig} />
        </View>
      </Provider>
    )
  }
  onTransitionStart = () => {
    this.scrollY.setValue(0)
  }
  onTransitionEnd = () => null
  render() {
    return (
      <Transitioner
        screenProps={this.props.screenProps}
        descriptors={this.props.descriptors}
        // NOTE: our transition animations don't need to be configurable
        configureTransition={null}
        navigation={this.props.navigation}
        render={this._render}
        onTransitionStart={this.onTransitionStart}
        onTransitionEnd={this.onTransitionEnd}
      />
    )
  }
}
