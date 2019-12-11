import React, {createRef, useState, useEffect} from 'react'
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

const USE_NATIVE_DRIVER = true
const HEADER_HEIGHT = 50
const windowHeight = Dimensions.get('window').height
// const SNAP_POINTS_FROM_TOP = [50, windowHeight * 0.4, windowHeight * 0.8]
const SNAP_POINTS_FROM_TOP = [0, windowHeight * 0.5, windowHeight * 0.8]
const START = SNAP_POINTS_FROM_TOP[0]
const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

interface Props extends FlatListProps<any> {}

const BottomPopupWrapper = (props: Props) => {
  const masterdrawer = createRef<TapGestureHandler>()
  const drawer = createRef<PanGestureHandler>()
  const drawerheader = createRef<PanGestureHandler>()
  const scroll = createRef()
  let _lastScrollYValue = 0
  const [_lastScrollY] = useState(new Animated.Value(0))
  const [_dragY] = useState(new Animated.Value(0))
  const _onGestureEvent = Animated.event([{nativeEvent: {translationY: _dragY}}], {
    useNativeDriver: true,
  })

  const [lastSnap, setLastSnap] = useState(END)
  const [_translateYOffset] = useState(new Animated.Value(END))

  useEffect(() => {
    _lastScrollY.addListener(({value}) => {
      _lastScrollYValue = value
    })
  }, [])

  const _onHeaderHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // console.log('& on header')
    if (nativeEvent.oldState === State.BEGAN) {
      _lastScrollY.setValue(0)
    }
    _onHandlerStateChange({nativeEvent})
  }

  const _onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // console.log('& on handler state change')

    // if we've just released the pan gesture...
    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent
      translationY -= _lastScrollYValue
      // not sure why this magic number
      const dragToss = 0.05

      // where the drag will eventually end when it slides to a stop (?)
      const endOffsetY = lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]

      SNAP_POINTS_FROM_TOP.forEach(snapPoint => {
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      })

      setLastSnap(destSnapPoint)

      _translateYOffset.extractOffset()
      _translateYOffset.setValue(translationY)
      _translateYOffset.flattenOffset()

      _dragY.setValue(0)

      // animate to the closest clamp point
      Animated.spring(_translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start()
    }
  }

  // console.log('& max delta y', state.lastSnap - SNAP_POINTS_FROM_TOP[0])

  return (
    // todo: what does this wrapping gesture handler do? Taking it away does make the gesture handling wonky, but not sure why
    <TapGestureHandler
      maxDurationMs={100000}
      ref={masterdrawer}
      maxDeltaY={lastSnap - SNAP_POINTS_FROM_TOP[0]}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {borderColor: 'blue', borderWidth: 1, backgroundColor: 'white'},
            {
              transform: [
                {
                  translateY: Animated.add(
                    _translateYOffset,
                    Animated.add(_dragY, Animated.multiply(new Animated.Value(-1), _lastScrollY))
                  ).interpolate({
                    inputRange: [START, END],
                    outputRange: [START, END],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <PanGestureHandler
            ref={drawerheader}
            simultaneousHandlers={[scroll, masterdrawer]}
            shouldCancelWhenOutside={false}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onHeaderHandlerStateChange}
          >
            <Animated.View style={styles.header} />
          </PanGestureHandler>
          <PanGestureHandler
            ref={drawer}
            simultaneousHandlers={[scroll, masterdrawer]}
            shouldCancelWhenOutside={false}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onHandlerStateChange}
          >
            <Animated.View style={styles.container}>
              <NativeViewGestureHandler
                ref={scroll as any}
                waitFor={masterdrawer}
                simultaneousHandlers={drawer}
              >
                <Animated.FlatList
                  style={[{flex: 1}, {marginBottom: SNAP_POINTS_FROM_TOP[0]}]}
                  bounces={false}
                  {...props}
                  onScrollBeginDrag={Animated.event(
                    [{nativeEvent: {contentOffset: {y: _lastScrollY}}}],
                    {useNativeDriver: true}
                  )}
                  scrollEventThrottle={1}
                ></Animated.FlatList>
              </NativeViewGestureHandler>
              {/* <View style={{backgroundColor: 'white', flex: 1}}>
                <Text>A simple child</Text>
              </View> */}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}

export default () => (
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
    <BottomPopupWrapper
      data={[<LoremIpsum />, <LoremIpsum />, <LoremIpsum />]}
      renderItem={({item}) => item}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
)

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
