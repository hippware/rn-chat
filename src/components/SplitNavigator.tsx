import React from 'react'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  TabRouter,
} from 'react-navigation'
import {View, Animated, StyleSheet, Text} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {height} from './Global'

type Props = {
  base: any // main component
  show: boolean
  popup: any // the React element that slides up from the bottom of the screen
  splitHeight: number
  draggable: boolean
}

type State = {
  bottom: Animated.Value
  scrollY: Animated.Value
  opened: boolean
}

class AnimatedScreen extends React.Component<Props, State> {
  state = {
    bottom: new Animated.Value(0),
    scrollY: new Animated.Value(0),
    opened: false,
  }

  componentWillReceiveProps({show}) {
    if (show !== this.props.show) {
      if (!show) this.setState({opened: false})
      Animated.spring(this.state.bottom, {
        toValue: show ? -this.props.splitHeight : 0,
        // useNativeDriver: true,
      }).start(() => {
        if (show) this.setState({opened: true})
      })
    }
  }

  render() {
    const {base, popup, show, splitHeight, draggable} = this.props
    const {bottom, scrollY} = this.state
    const scrollTop = bottom.interpolate({
      inputRange: [-splitHeight, 0],
      outputRange: [-height, 0],
    })
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, height - splitHeight - 80, height - splitHeight - 30],
      outputRange: [0, 0, 1],
    })
    const openCloseTransform = {transform: [{translateY: bottom}]}
    const theMargin = height - splitHeight - 30
    return (
      <View style={{flex: 1}} onStartShouldSetResponderCapture={this._overlayShouldCaptureTouches}>
        {show && (
          <Animated.View style={[styles.todoHeader, {opacity: headerOpacity}]}>
            <Text style={{fontSize: 20}}>TODO: Header Placeholder</Text>
          </Animated.View>
        )}
        <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, openCloseTransform]}>
          {base}
        </Animated.View>
        {show && (
          <Animated.ScrollView
            style={[
              styles.absolute,
              {top: height, paddingTop: theMargin, height},
              {transform: [{translateY: scrollTop}]},
            ]}
            scrollEventThrottle={16}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
            contentContainerStyle={{paddingBottom: theMargin}}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!!draggable}
            bounces={!!draggable}
            decelerationRate="fast"
          >
            {popup}
          </Animated.ScrollView>
        )}
      </View>
    )
  }

  // If initial touch is "above" scrollview, don't allow scroll
  _overlayShouldCaptureTouches = ({nativeEvent: {pageY}}) => {
    const {splitHeight, show} = this.props
    const theTest = pageY < height - (splitHeight + 30) - (this.state.scrollY as any)._value
    return show && theTest
  }
}

const BottomPopupNavigator = (routeConfigs, tabsConfig: any = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig)

  const navigator = createNavigator(router, routeConfigs, tabsConfig, 'react-navigation/STACK')(
    ({navigation}) => {
      const {state, dispatch} = navigation
      const {routes, index} = state
      const routeState = routes[index > 0 ? index : 1]

      // Figure out what to render based on the navigation state and the router:
      const Component = routeConfigs[routes[0].routeName].screen
      const Popup = routeConfigs[routeState.routeName].screen
      // const Popup = routeConfigs[routes[1].routeName].screen

      return (
        <AnimatedScreen
          splitHeight={tabsConfig.splitHeight}
          draggable={routeState && routeState.params && routeState.params.draggable}
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
          popup={
            <Popup
              navigation={addNavigationHelpers({
                dispatch,
                // state: routes[1],
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

export default BottomPopupNavigator

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
  todoHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
