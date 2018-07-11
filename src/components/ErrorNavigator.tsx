import React from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {Actions} from 'react-native-router-flux'
import ErrorHandler from './common/ErrorHandler'

const ErrorNavigator = (routeConfigs, tabsConfig: any = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig)

  const navigator = createNavigator(router, routeConfigs, tabsConfig, 'react-navigation/STACK')(
    ({navigation, ...props}) => {
      const {state, dispatch} = navigation
      const {routes} = state
      // const routeState = routes[index > 0 ? index : 1]

      // Figure out what to render based on the navigation state and the router:
      const Component = routeConfigs[routes[0].routeName].screen

      return (
        <ErrorHandler>
          <Component
            navigation={addNavigationHelpers({
              dispatch,
              state: routes[0],
              addListener: Actions.addListener,
            })}
          />
        </ErrorHandler>
      )
    }
  )

  return createNavigationContainer(navigator, tabsConfig.containerOptions)
}

export default ErrorNavigator
