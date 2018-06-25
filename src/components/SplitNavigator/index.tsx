import React from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {Actions} from 'react-native-router-flux'
import AnimatedScreen from './AnimatedScreen'

const BottomMenuNavigator = (routeConfigs, tabsConfig: any = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig)

  const navigator = createNavigator(router, routeConfigs, tabsConfig, 'react-navigation/STACK')(
    ({navigation}) => {
      const {state, dispatch} = navigation
      const {routes, index} = state
      const routeState = routes[index > 0 ? index : 1]

      // Figure out what to render based on the navigation state and the router:
      const Component = routeConfigs[routes[0].routeName].screen
      const Popup = routeConfigs[routeState.routeName].screen

      return (
        <AnimatedScreen
          splitHeight={tabsConfig.splitHeight}
          base={
            <Component
              navigation={addNavigationHelpers({
                dispatch,
                state: routes[0],
                addListener: Actions.addListener,
              })}
            />
          }
          show={index !== 0}
          menu={
            <Popup
              navigation={addNavigationHelpers({
                dispatch,
                state: routeState,
                addListener: Actions.addListener,
              })}
            />
          }
        />
      )
    }
  )

  return createNavigationContainer(navigator, tabsConfig.containerOptions)
}

export default BottomMenuNavigator
