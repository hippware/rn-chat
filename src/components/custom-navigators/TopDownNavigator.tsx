import React, {ReactElement} from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {Animated, View, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'

const TopDownNavigator = (routeConfigs, tabsConfig: any = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig)

  const navigator = createNavigator(router, routeConfigs, tabsConfig, 'react-navigation/STACK')(
    ({navigation, ...props}) => {
      const {state, dispatch} = navigation
      const {routes, index} = state
      const routeState = routes[index > 0 ? index : 1]

      // Figure out what to render based on the navigation state and the router:
      const ScreenComponent = routeConfigs[routes[0].routeName].screen
      const Popup = routeState && routeConfigs[routeState.routeName].screen
      const params = routeState && routeState.params ? routeState.params : {}

      return (
        <TopSlider
          topHeight={tabsConfig.topHeight}
          {...params}
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
          popup={
            Popup && (
              <Popup
                navigation={addNavigationHelpers({
                  dispatch,
                  state: routeState,
                  addListener: Actions.addListener,
                })}
                // {...params}
              />
            )
          }
        />
      )
    }
  )

  return createNavigationContainer(navigator, tabsConfig.containerOptions)
}

interface IProps {
  base: ReactElement<any> // main element
  show: boolean
  popup: ReactElement<any> // element that slides up from the bottom of the screen
  topHeight: number
}

type State = {
  y: Animated.Value
}

class TopSlider extends React.Component<IProps, State> {
  state = {
    y: new Animated.Value(0), // determines the y offset of sliders
  }

  componentWillReceiveProps({show, topHeight, ...rest}: IProps) {
    if (show !== this.props.show) {
      const toValue = show ? topHeight : 0
      // TODO: write custom transitioner to handle animation
      Animated.spring(this.state.y, {
        toValue,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const {base, popup, topHeight} = this.props
    const {y} = this.state
    const transY = y.interpolate({
      inputRange: [0, topHeight],
      outputRange: [-topHeight, 0],
    })
    const openCloseTransform = {transform: [{translateY: transY}]}

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[
            styles.absolute,
            {
              zIndex: 1000,
              top: 0,
              // height: topHeight,
              flex: 1,
            },
            openCloseTransform,
          ]}
        >
          {popup}
        </Animated.View>
        {base}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})

export default TopDownNavigator
