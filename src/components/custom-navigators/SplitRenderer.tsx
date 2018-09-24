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
  shouldComponentUpdate(nextProps) {
    return this.props.navigation.state.index !== nextProps.navigation.state.index
  }
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
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          key={scene.route.key}
          pointerEvents="box-none"
        >
          <BackButton transitionProps={transitionProps} scene={scene} />
          <AnimatedPushScene
            key={scene.route.key + '_scene'}
            transitionProps={transitionProps}
            scene={scene}
          />
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
    console.log('RENDER SPLITNAVIGATOR')
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
