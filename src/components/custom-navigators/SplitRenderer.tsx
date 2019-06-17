import React from 'react'
import {Transitioner} from 'react-navigation-stack'
import {View, Platform, Animated} from 'react-native'
import AnimatedPushScene from './AnimatedPushScene'
import AnimatedMainScene from './AnimatedMainScene'
import BackButton from './BackButton'
import NavBarHeader from './NavBarHeader'
import {height} from '../Global'
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
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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

  _renderHeader = fadeNavConfig => {
    const opacity = this.scrollY.interpolate({
      inputRange: [0, 80, height / 2 - 80],
      outputRange: [0, 0, 1],
    })
    return fadeNavConfig ? (
      <Animated.View style={{opacity, position: 'absolute', top: 0, right: 0, left: 0}}>
        <NavBarHeader config={fadeNavConfig} />
      </Animated.View>
    ) : null
  }

  _render = (transitionProps, prevTransitionProps) => {
    const {scenes, scene} = transitionProps
    const theScenes = scenes.map(s => this._renderScene(transitionProps, s))
    return (
      <Provider scrollY={this.scrollY}>
        <View style={{flex: 1}}>
          {theScenes}
          {this._renderHeader(scene.descriptor.options.fadeNavConfig)}
        </View>
      </Provider>
    )
  }
  onTransitionStart = () => {
    this.scrollY.setValue(0)
  }
  onTransitionEnd = () => null
  render() {
    const TransitionerAny = Transitioner as any
    return (
      <TransitionerAny
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
