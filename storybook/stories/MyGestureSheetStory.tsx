import React, {Component, forwardRef, Ref} from 'react'
import {Animated, StyleSheet, Text, View, Dimensions, FlatListProps} from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import {LoremIpsum} from './GestureBottomSheetStory'
import {Provider} from 'mobx-react'

const USE_NATIVE_DRIVER = true
const HEADER_HEIGHT = 50
const windowHeight = Dimensions.get('window').height
// const SNAP_POINTS_FROM_TOP = [50, windowHeight * 0.4, windowHeight * 0.8]
const SNAP_POINTS_FROM_TOP = [0, windowHeight * 0.5, windowHeight * 0.8]

interface Props extends FlatListProps<any> {}

class BottomPopupList extends Component<Props> {
  masterdrawer = React.createRef<TapGestureHandler>()
  drawer = React.createRef<PanGestureHandler>()
  drawerheader = React.createRef<PanGestureHandler>()
  scroll = React.createRef()
  _lastScrollYValue = 0
  _lastScrollY = new Animated.Value(0)
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
  _onHeaderHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // console.log('& on header')
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }
    this._onHandlerStateChange({nativeEvent})
  }

  _onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // console.log('& on handler state change')

    // if we've just released the pan gesture...
    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent
      translationY -= this._lastScrollYValue
      // not sure why this magic number
      const dragToss = 0.05

      // where the drag will eventually end when it slides to a stop (?)
      const endOffsetY = this.state.lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]

      SNAP_POINTS_FROM_TOP.forEach(snapPoint => {
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      })

      this.setState({lastSnap: destSnapPoint})

      // todo: is there a simpler way to do this?
      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()

      this._dragY.setValue(0)

      // animate to the closest clamp point
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
    console.log('& max delta y', this.state.lastSnap - SNAP_POINTS_FROM_TOP[0])

    return (
      // todo: what does this wrapping gesture handler do? Taking it away does make the gesture handling wonky, but not sure why
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}
      >
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {borderColor: 'blue', borderWidth: 1, backgroundColor: 'white'},
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
                <Provider
                  masterDrawerRef={this.masterdrawer}
                  drawerRef={this.drawer}
                  lastScrollY={this._lastScrollY}
                >
                  <NativeViewGestureHandler
                    ref={this.scroll as any}
                    waitFor={this.masterdrawer}
                    simultaneousHandlers={this.drawer}
                  >
                    <Animated.FlatList
                      style={[{flex: 1}, {marginBottom: SNAP_POINTS_FROM_TOP[0]}]}
                      bounces={false}
                      {...this.props}
                      onScrollBeginDrag={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this._lastScrollY!}}}],
                        {useNativeDriver: true}
                      )}
                      scrollEventThrottle={1}
                    ></Animated.FlatList>
                  </NativeViewGestureHandler>
                </Provider>
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
        <View style={[StyleSheet.absoluteFillObject, {marginTop: 100, padding: 10}]}>
          <Text>This is an experimental version of GestureBottomSheetStory.tsx</Text>
          <TouchableOpacity onPress={() => null} style={{marginTop: 20}}>
            <Text style={{padding: 10, backgroundColor: 'blue'}}>
              Press me to test that the background is still touchable
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text>A simple child</Text> */}
        <BottomPopupList
          data={[<LoremIpsum />, <LoremIpsum />, <LoremIpsum />]}
          renderItem={({item}) => item}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

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
  },
})
