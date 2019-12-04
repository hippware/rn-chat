import React, {Component} from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatListProps,
  FlatList,
  Image,
} from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import {PreviewButton} from '../BottomPopup'
import {Actions} from 'react-native-router-flux'
import {height} from '../Global'

const HEADER_HEIGHT = 50
const PREVIEW_Y = height * 0.82
const FULL_Y = height * 0.5
const SNAP_POINTS_FROM_TOP = [0, FULL_Y, PREVIEW_Y]
const START = SNAP_POINTS_FROM_TOP[0]
const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

type Props = {
  listProps?: FlatListProps<any>
  // style?: ViewStyle
  preview?: boolean
}

// todo: convert to functional component. I've tried a couple times, but each time its like it ignores the wrapping TapGestureHandler
// When this happens scrolling the internal view also scrolls the container

export default class BottomPopupListNew extends Component<Props> {
  masterdrawer = React.createRef<TapGestureHandler>()
  drawer = React.createRef<PanGestureHandler>()
  drawerheader = React.createRef<PanGestureHandler>()
  scroll = React.createRef<NativeViewGestureHandler>()
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

    this.state = {
      lastSnap: END,
    }

    this._lastScrollY.addListener(({value}) => {
      this._lastScrollYValue = value
    })

    this._onGestureEvent = Animated.event([{nativeEvent: {translationY: this._dragY}}], {
      useNativeDriver: true,
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.preview !== this.props.preview) {
      this.springTo(this.props.preview ? PREVIEW_Y : FULL_Y)
    }
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
      this.springTo(destSnapPoint, velocityY)
    }
  }

  springTo = (toValue: number, velocity?: number) => {
    Animated.spring(this._translateYOffset, {
      velocity: velocity,
      tension: 68,
      friction: 12,
      toValue,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {preview} = this.props

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
              {
                // backgroundColor: 'white',
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
              <Animated.View style={styles.header}>
                {/* 
                  // todo: replace this image with a View + borderRadius (no extra padding on bottom)
                */}
                <Image
                  style={{width: '100%', position: 'absolute'}}
                  // todo: emulate homestore in story
                  // source={
                  //   mapType === 'hybrid'
                  //     ? require('../../images/bottomPopupDarkShadow.png')
                  //     : require('../../images/bottomPopup.png')
                  // }
                  source={require('../../../images/bottomPopup.png')}
                  resizeMode="stretch"
                />
                {preview !== undefined && (
                  <PreviewButton
                    onPress={() => Actions.refresh({preview: !preview})}
                    preview={preview}
                  />
                )}
              </Animated.View>
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
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}
                >
                  {/*
                    // todo: DRY up this structure. It's difficult though because there's a tight coupling with refs and onScrollBeginDrag
                    The main case that illustrates this is where you're in full view and at the bottom of the list and swipe down...
                    Expected: scrolls list to top
                    Observed: swipes down the popup container instead
                  */}
                  {!!this.props.listProps ? (
                    <Animated.FlatList
                      style={[{flex: 1}, {marginBottom: SNAP_POINTS_FROM_TOP[0]}]}
                      bounces={false}
                      {...this.props.listProps}
                      onScrollBeginDrag={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this._lastScrollY!}}}],
                        {useNativeDriver: true}
                      )}
                      scrollEventThrottle={1}
                    />
                  ) : (
                    <Animated.ScrollView
                      onScrollBeginDrag={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this._lastScrollY!}}}],
                        {useNativeDriver: true}
                      )}
                      scrollEventThrottle={1}
                      bounces={false}
                    >
                      {this.props.children}
                    </Animated.ScrollView>
                  )}
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    // backgroundColor: 'red',
    paddingTop: 50,
  },
  lipsum: {
    padding: 10,
  },
})
