import React from 'react'
// import AnimatedScreen from './AnimatedScreen'
import {Transitioner} from 'react-navigation'
import {View, TouchableOpacity, Image} from 'react-native'
import AnimatedResizableScene from './AnimatedResizableScene'
import AnimatedPushScene from './AnimatedPushScene'
import DragUpScene from './DragUpScene'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../Router'

type Props = {
  navigation: any
  navigationConfig: any
  descriptors: any
  screenProps: any
}

const BackButton = () => (
  <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', top: 30, left: 10}}>
    <Image source={navBarStyle.backButtonImage} />
  </TouchableOpacity>
)

export default class SplitRenderer extends React.Component<Props> {
  _renderScene = (transitionProps, scene) => {
    const {route: {params: {initialHeight, draggable}}} = scene
    if (draggable) {
      return (
        <DragUpScene
          transitionProps={transitionProps}
          key={scene.route.key}
          scene={scene}
          initialHeight={initialHeight}
        />
      )
    }
    if (initialHeight) {
      return (
        <AnimatedPushScene
          transitionProps={transitionProps}
          key={scene.route.key}
          scene={scene}
          initialHeight={initialHeight}
        />
      )
    }
    return (
      <AnimatedResizableScene
        transitionProps={transitionProps}
        key={scene.route.key}
        scene={scene}
      />
    )
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    const state = transitionProps.navigation.state
    return (
      <View style={{flex: 1}}>
        {scenes}
        {state.index > 0 && state.routes[state.index].params.back && <BackButton />}
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
  // render() {
  //   const {navigation, navigationConfig, descriptors} = this.props
  //   const {state} = navigation
  //   const {routes, index} = state
  //   const descriptor = descriptors[state.routes[0].key] // base component to render
  //   const ScreenComponent = descriptor.getComponent()
  //   const routeState = routes[index > 0 ? index : 1]
  //   const popupDescriptor = descriptors[routeState.key]
  //   const Popup = popupDescriptor.getComponent()
  //   const params = routeState && routeState.params ? routeState.params : {}
  //   const {opacityHeader: OpacityHeader, ...rest} = params

  //   return (
  //     <AnimatedScreen
  //       splitHeight={navigationConfig.splitHeight}
  //       topHeight={navigationConfig.topHeight}
  //       {...rest}
  //       base={<ScreenComponent navigation={descriptor.navigation} />}
  //       show={index !== 0}
  //       opacityHeader={OpacityHeader && <OpacityHeader {...rest} />}
  //       popup={<Popup navigation={popupDescriptor.navigation} />}
  //     />
  //   )
  //   }
}
