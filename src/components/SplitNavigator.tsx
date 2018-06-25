import React from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {View, Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'

type AnimatedScreenProps = {
  base: any
  show: boolean
  menu: any
  splitHeight: number
}
class AnimatedScreen extends React.Component<AnimatedScreenProps> {
  state = {offset: new Animated.Value(0), bottom: new Animated.Value(0), show: false}

  componentWillReceiveProps(newProps) {
    Animated.spring(this.state.offset, {
      toValue: newProps.show ? this.props.splitHeight + 30 : 0,
      useNativeDriver: true,
    }).start()
    Animated.spring(this.state.bottom, {
      toValue: newProps.show ? -this.props.splitHeight : 0,
      useNativeDriver: true,
    }).start()
  }
  render() {
    const {base, menu, splitHeight} = this.props
    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[
            {position: 'absolute', right: 0, left: 0, top: 0, bottom: 0},
            {
              transform: [
                {
                  translateY: this.state.bottom,
                },
              ],
            },
          ]}
        >
          {base}
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 0,
              height: this.props.splitHeight,
            },
            {
              transform: [
                {
                  translateY: Animated.multiply(
                    -1,
                    Animated.add(new Animated.Value(-splitHeight), this.state.offset)
                  ),
                },
              ],
            },
          ]}
        >
          {menu}
        </Animated.View>
        )}
      </View>
    )
  }
}
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
