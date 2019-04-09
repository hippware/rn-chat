import React from 'react'
import {Transitioner} from 'react-navigation-stack'
import {View, Platform, PlatformIOS} from 'react-native'
import AnimatedPushScene from './AnimatedPushScene'
import AnimatedMainScene from './AnimatedMainScene'
import BackButton from './BackButton'

type Props = {
  navigation: any
  navigationConfig: any
  descriptors: any
  screenProps: any
}

export default class SplitRenderer extends React.Component<Props> {
  _renderScene = (transitionProps, scene) => {
    const {index} = scene
    if (index === 0) {
      // main screen
      return (
        <AnimatedMainScene transitionProps={transitionProps} key={scene.route.key} scene={scene} />
      )
    } else {
      const showButton = Platform.OS === 'android' && scene.route.params.backButtonOverlay
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
          {!showButton && <BackButton transitionProps={transitionProps} scene={scene} />}
          <AnimatedPushScene transitionProps={transitionProps} scene={scene} />
          {showButton && <BackButton transitionProps={transitionProps} scene={scene} />}
        </View>
      )
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    return <View style={{flex: 1}}>{scenes}</View>
  }
  onTransitionStart = () => null
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
