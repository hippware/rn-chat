import React from 'react'
import AnimatedScreen from './AnimatedScreen'

export default ({navigation, navigationConfig, descriptors}) => {
  const {state} = navigation
  const {routes, index} = state
  const descriptor = descriptors[state.routes[0].key] // base component to render
  const ScreenComponent = descriptor.getComponent()
  const routeState = routes[index > 0 ? index : 1]
  const popupDescriptor = descriptors[routeState.key]
  const Popup = popupDescriptor.getComponent()
  const params = routeState && routeState.params ? routeState.params : {}
  const {opacityHeader: OpacityHeader, ...rest} = params

  return (
    <AnimatedScreen
      splitHeight={navigationConfig.splitHeight}
      topHeight={navigationConfig.topHeight}
      {...rest}
      base={<ScreenComponent navigation={descriptor.navigation} />}
      show={index !== 0}
      opacityHeader={OpacityHeader && <OpacityHeader {...rest} />}
      popup={<Popup navigation={popupDescriptor.navigation} />}
    />
  )
}
