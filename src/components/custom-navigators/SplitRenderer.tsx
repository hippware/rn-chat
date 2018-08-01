import React from 'react'
// import AnimatedScreen from './AnimatedScreen'
import {Transitioner} from 'react-navigation'
import {Easing, View} from 'react-native'
import AnimatedResizableScene from './AnimatedResizableScene'

type Props = {
  navigation: any
  navigationConfig: any
  descriptors: any
  screenProps: any
}
export default class SplitRenderer extends React.Component<Props> {
  _configureTransition(transitionProps, prevTransitionProps) {
    // TEST
    return {
      // duration in milliseconds, default: 250
      duration: 500,
      // An easing function from `Easing`, default: Easing.inOut(Easing.ease)
      easing: Easing.bounce,
    }
  }
  _renderScene = (transitionProps, scene) => {
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
    return <View style={{flex: 1}}>{scenes}</View>
  }
  onTransitionStart = () => null
  onTransitionEnd = () => null
  render() {
    return (
      <Transitioner
        screenProps={this.props.screenProps}
        descriptors={this.props.descriptors}
        configureTransition={this._configureTransition}
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
