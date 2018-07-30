import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {height as screenHeight} from '../Global'
import {IAnimatedScreenProps} from './AnimatedScreen'

interface IBottomProps extends IAnimatedScreenProps {
  scrollY: Animated.Value
  bottom: Animated.Value
}

class BottomUpSlider extends React.Component<IBottomProps> {
  render() {
    const {show, splitHeight, bottom, draggable, popup, scrollY} = this.props
    const theMargin = screenHeight - splitHeight - 30
    const scrollTop = bottom.interpolate({
      inputRange: [-splitHeight, 0],
      outputRange: [-screenHeight, 0],
    })
    return (
      show && (
        <Animated.ScrollView
          style={[
            styles.absolute,
            {top: screenHeight, paddingTop: theMargin, height: screenHeight},
            {transform: [{translateY: scrollTop}]},
          ]}
          pointerEvents="box-none"
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
}

export default BottomUpSlider

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})
