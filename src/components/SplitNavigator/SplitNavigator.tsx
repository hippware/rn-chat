import React from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {Actions} from 'react-native-router-flux'
import AnimatedScreen from './AnimatedScreen'

const SplitNavigator = (routeConfigs, tabsConfig: any = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig)

  const navigator = createNavigator(router, routeConfigs, tabsConfig, 'react-navigation/STACK')(
    ({navigation, ...props}) => {
      const {state, dispatch} = navigation
      const {routes, index} = state
      const routeState = routes[index > 0 ? index : 1]

      // Figure out what to render based on the navigation state and the router:
      const ScreenComponent = routeConfigs[routes[0].routeName].screen
      const Popup = routeConfigs[routeState.routeName].screen
      const params = routeState && routeState.params ? routeState.params : {}
      const {opacityHeader: OpacityHeader, ...rest} = params

      return (
        <AnimatedScreen
          splitHeight={tabsConfig.splitHeight}
          topHeight={tabsConfig.topHeight}
          {...rest}
          base={
            <ScreenComponent
              navigation={addNavigationHelpers({
                dispatch,
                state: routes[0],
                addListener: Actions.addListener,
              })}
              // {...rest}
            />
          }
          show={index !== 0}
          opacityHeader={OpacityHeader && <OpacityHeader {...rest} />}
          popup={
            <Popup
              navigation={addNavigationHelpers({
                dispatch,
                state: routeState,
                addListener: Actions.addListener,
              })}
              {...rest}
            />
          }
        />
      )
    }
  )

  return createNavigationContainer(navigator, tabsConfig.containerOptions)
}

export default SplitNavigator
