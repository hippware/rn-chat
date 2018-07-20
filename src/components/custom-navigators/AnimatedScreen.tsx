import React, {ReactElement} from 'react'
import {View, Animated, StyleSheet} from 'react-native'
import {height, k} from '../Global'

interface IProps {
  base: ReactElement<any> // main element
  show: boolean
  opacityHeader?: ReactElement<any> // element that appears at the top of the screen when popup is dragged up
  popup: ReactElement<any> // element that slides up from the bottom of the screen
  splitHeight: number
  draggable: boolean
  fromTop?: boolean // Popup should slide down from the top rather than up from the bottom
  topHeight?: number
}

type State = {
  y: Animated.Value
  scrollY: Animated.Value
}

class AnimatedScreen extends React.Component<IProps, State> {
  state = {
    y: new Animated.Value(0), // determines the y offset of sliders
    scrollY: new Animated.Value(0),
  }

  componentWillReceiveProps({show, fromTop, topHeight, splitHeight}: IProps) {
    if (show !== this.props.show) {
      const toValue = show ? (fromTop ? topHeight : -splitHeight) : 0
      Animated.spring(this.state.y, {
        toValue,
        // useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const {base} = this.props
    const {y, scrollY} = this.state
    const mainViewBottom = y.interpolate({
      inputRange: [-this.props.splitHeight, 0],
      outputRange: [-this.props.splitHeight + 215 * k, 0],
    })
    const openCloseTransform = {transform: [{translateY: mainViewBottom}]}

    return (
      <View style={{flex: 1}}>
        <OpacityHeader {...this.props} scrollY={scrollY} />
        <View
          style={{flex: 1}}
          onStartShouldSetResponderCapture={this._overlayShouldCaptureTouches}
        >
          <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, openCloseTransform]}>
            {base}
          </Animated.View>
          <BottomUpSlider {...this.props} bottom={y} scrollY={scrollY} />
        </View>
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

interface IOpacityHeaderProps extends IProps {
  scrollY: Animated.Value
}

const OpacityHeader = ({show, opacityHeader, scrollY, splitHeight}: IOpacityHeaderProps) => {
  const opacity = scrollY.interpolate({
    inputRange: [0, height - splitHeight - 80, height - splitHeight - 30],
    outputRange: [0, 0, 1],
  })
  return show && opacityHeader ? (
    <Animated.View style={[styles.header, {opacity}]}>{opacityHeader}</Animated.View>
  ) : null
}

interface IBottomProps extends IProps {
  scrollY: Animated.Value
  bottom: Animated.Value
}

const BottomUpSlider = ({
  show,
  fromTop,
  splitHeight,
  bottom,
  draggable,
  popup,
  scrollY,
}: IBottomProps) => {
  const theMargin = height - splitHeight - 30
  const scrollTop = bottom.interpolate({
    inputRange: [-splitHeight, 0],
    outputRange: [-height, 0],
  })
  return (
    show &&
    !fromTop && (
      <Animated.ScrollView
        style={[
          styles.absolute,
          {top: height, paddingTop: theMargin, height},
          {transform: [{translateY: scrollTop}]},
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}
        contentContainerStyle={{paddingBottom: theMargin}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!draggable}
        bounces={!!draggable}
        decelerationRate="fast"
      >
        {popup}
      </Animated.ScrollView>
    )
  )
}

export default AnimatedScreen

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
  },
})
