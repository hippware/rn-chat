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
      const OpacityHeader = routeState.params && routeState.params.opacityHeader

      return (
        <AnimatedScreen
          splitHeight={tabsConfig.splitHeight}
          draggable={routeState && routeState.params && routeState.params.draggable} // TODO: DRY
          fromTop={routeState && routeState.params && routeState.params.fromTop} // TODO: DRY
          base={
            <ScreenComponent
              navigation={addNavigationHelpers({
                dispatch,
                state: routes[0],
                addListener: Actions.addListener,
              })}
            />
          }
          show={index !== 0}
          opacityHeader={OpacityHeader && <OpacityHeader {...routeState.params} />}
          popup={
            <Popup
              navigation={addNavigationHelpers({
                dispatch,
                state: routeState,
                addListener: Actions.addListener,
              })}
              {...routeState.params}
            />
          }
        />
      )
    }
  )

  return createNavigationContainer(navigator, tabsConfig.containerOptions)
}

export default SplitNavigator
