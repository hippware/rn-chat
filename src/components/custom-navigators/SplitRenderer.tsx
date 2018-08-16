import React from 'react'
import {Transitioner} from 'react-navigation'
import {View} from 'react-native'
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
      return (
        <AnimatedPushScene transitionProps={transitionProps} key={scene.route.key} scene={scene} />
      )
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    return (
      <View style={{flex: 1}}>
        {scenes}
        <BackButton transitionProps={transitionProps} />
      </View>
    )
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
