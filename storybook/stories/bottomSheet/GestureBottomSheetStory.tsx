import React, {Component} from 'react'
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'

const USE_NATIVE_DRIVER = true
const HEADER_HEIGHT = 50
const windowHeight = Dimensions.get('window').height
const SNAP_POINTS_FROM_TOP = [50, windowHeight * 0.4, windowHeight * 0.8]

export class BottomSheet extends Component {
  masterdrawer = React.createRef<TapGestureHandler>()
  drawer = React.createRef<PanGestureHandler>()
  drawerheader = React.createRef<PanGestureHandler>()
  scroll = React.createRef()
  _lastScrollYValue = 0
  _lastScrollY = new Animated.Value(0)
  _onRegisterLastScroll = Animated.event([{nativeEvent: {contentOffset: {y: this._lastScrollY}}}], {
    useNativeDriver: USE_NATIVE_DRIVER,
  })
  _dragY = new Animated.Value(0)
  _translateY: Animated.AnimatedInterpolation
  _translateYOffset: Animated.Value
  _reverseLastScrollY: Animated.AnimatedMultiplication
  _onGestureEvent
  state: any

  constructor(props) {
    super(props)
    const START = SNAP_POINTS_FROM_TOP[0]
    const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

    this.state = {
      lastSnap: END,
    }

    this._lastScrollY.addListener(({value}) => {
      this._lastScrollYValue = value
    })

    this._onGestureEvent = Animated.event([{nativeEvent: {translationY: this._dragY}}], {
      useNativeDriver: USE_NATIVE_DRIVER,
    })

    this._reverseLastScrollY = Animated.multiply(new Animated.Value(-1), this._lastScrollY)

    this._translateYOffset = new Animated.Value(END)
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    })
  }
  _onHeaderHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }
    this._onHandlerStateChange({nativeEvent})
  }
  _onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent
      translationY -= this._lastScrollYValue
      const dragToss = 0.05
      const endOffsetY = this.state.lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }
      this.setState({lastSnap: destSnapPoint})
      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()
      this._dragY.setValue(0)
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start()
    }
  }
  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}
      >
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Text style={[StyleSheet.absoluteFillObject, {marginTop: 100, padding: 10}]}>
            This is just a cleaned up version of the example at the main repo:
            https://github.com/kmagiera/react-native-gesture-handler/blob/master/Example/common.js.
            Let's leave this one otherwise untouched and treat MyGestureSheetStory.tsx as a sandbox.
          </Text>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'white'},
              {
                transform: [{translateY: this._translateY}],
              },
            ]}
          >
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}
            >
              <Animated.View style={styles.header} />
            </PanGestureHandler>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}
            >
              <Animated.View style={styles.container}>
                <NativeViewGestureHandler
                  ref={this.scroll as any}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}
                >
                  <Animated.ScrollView
                    style={[{flex: 1}, {marginBottom: SNAP_POINTS_FROM_TOP[0]}]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}
                  >
                    <LoremIpsum />
                    <LoremIpsum />
                    <LoremIpsum />
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    )
  }
}

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomSheet />
      </View>
    )
  }
}

export class LoremIpsum extends React.Component<any> {
  static defaultProps = {
    words: 1000,
  }
  loremIpsum() {
    return LOREM_IPSUM.split(' ')
      .slice(0, this.props.words)
      .join(' ')
  }
  render() {
    return <Text style={styles.lipsum}>{this.loremIpsum()}</Text>
  }
}

const LOREM_IPSUM = `
Curabitur accumsan sit amet massa quis cursus. Fusce sollicitudin nunc nisl, quis efficitur quam tristique eget. Ut non erat molestie, ullamcorper turpis nec, euismod neque. Praesent aliquam risus ultricies, cursus mi consectetur, bibendum lorem. Nunc eleifend consectetur metus quis pulvinar. In vitae lacus eu nibh tincidunt sagittis ut id lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sagittis mauris rhoncus, maximus justo in, consequat dolor. Pellentesque ornare laoreet est vulputate vestibulum. Aliquam sit amet metus lorem.
Morbi tempus elit lorem, ut pulvinar nunc sagittis pharetra. Nulla mi sem, elementum non bibendum eget, viverra in purus. Vestibulum efficitur ex id nisi luctus egestas. Quisque in urna vitae leo consectetur ultricies sit amet at nunc. Cras porttitor neque at nisi ornare, mollis ornare dolor pharetra. Donec iaculis lacus orci, et pharetra eros imperdiet nec. Morbi leo nunc, placerat eget varius nec, volutpat ac velit. Phasellus pulvinar vulputate tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce elementum dui at ipsum hendrerit, vitae consectetur erat pulvinar. Sed vehicula sapien felis, id tristique dolor tempor feugiat. Aenean sit amet erat libero.
Nam posuere at mi ut porttitor. Vivamus dapibus vehicula mauris, commodo pretium nibh. Mauris turpis metus, vulputate iaculis nibh eu, maximus tincidunt nisl. Vivamus in mauris nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis ornare finibus. Quisque leo ex, vulputate quis molestie auctor, congue nec arcu.
Praesent ac risus nec augue commodo semper eu eget quam. Donec aliquam sodales convallis. Etiam interdum eu nulla at tempor. Duis nec porttitor odio, consectetur tempor turpis. Sed consequat varius lorem vel fermentum. Maecenas dictum sapien vitae lobortis tempus. Aliquam iaculis vehicula velit, non tempus est varius nec. Nunc congue dolor nec sem gravida, nec tincidunt mi luctus. Nam ut porttitor diam.
Fusce interdum nisi a risus aliquet, non dictum metus cursus. Praesent imperdiet sapien orci, quis sodales metus aliquet id. Aliquam convallis pharetra erat. Fusce gravida diam ut tellus elementum sodales. Fusce varius congue neque, quis laoreet sapien blandit vestibulum. Donec congue libero sapien, nec varius risus viverra ut. Quisque eu maximus magna. Phasellus tortor nisi, tincidunt vitae dignissim nec, interdum vel mi. Ut accumsan urna finibus posuere mattis.
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'red',
  },
  lipsum: {
    padding: 10,
    backgroundColor: 'white',
  },
})
