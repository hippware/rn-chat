import React, {Component} from 'react'
import {Animated, StyleSheet, View, FlatList, FlatListProps, Image, Keyboard} from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import {PreviewButton} from '../BottomSceneStatic'
import {height} from '../Global'
import {Actions} from 'react-native-router-flux'
import NavBarHeader, {NavConfig, FULL_SCREEN_POS} from '../custom-navigators/NavBarHeaderNew'
import {keyboardShowListenerName, keyboardHideListenerName} from './withKeyboardHOC'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

type Props = {
  listProps?: FlatListProps<any>
  animatedFlatListRef?: any
  renderContent?: any
  renderPreview?: any
  preview?: boolean
  previewHeight?: number
  fullViewHeight: number
  allowFullScroll?: boolean
  navBarConfig?: NavConfig
  renderFooter?: any
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
  _keyboardOffset: Animated.Value
  state: {
    lastSnap: number
  }
  snapPointsFromTop: number[] = []
  activelyScrolling: boolean = false
  keyboardShowListener
  keyboardHideListener

  constructor(props: Props) {
    super(props)
    const {allowFullScroll = false, fullViewHeight, previewHeight, preview} = props
    if (allowFullScroll) {
      this.snapPointsFromTop = [FULL_SCREEN_POS]
    }
    this.snapPointsFromTop.push(height - fullViewHeight)
    if (previewHeight) {
      this.snapPointsFromTop.push(height - previewHeight)
    }
    const start = this.snapPointsFromTop[0]
    const end = this.snapPointsFromTop[this.snapPointsFromTop.length - 1]

    this.state = {
      lastSnap: end,
    }

    this._keyboardOffset = new Animated.Value(0)

    // transition preview -> full view based on scroll position
    this._dragY.addListener(this.dragYListener)

    this._lastScrollY.addListener(({value}) => {
      this._lastScrollYValue = value
    })

    this._onGestureEvent = Animated.event([{nativeEvent: {translationY: this._dragY}}], {
      useNativeDriver: true,
    })

    this._reverseLastScrollY = Animated.multiply(new Animated.Value(-1), this._lastScrollY)

    this._translateYOffset = new Animated.Value(
      preview || !previewHeight ? end : this.snapPointsFromTop[this.snapPointsFromTop.length - 2]
    )

    this._translateY = Animated.add(
      Animated.add(this._translateYOffset, this._keyboardOffset),
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [start, end],
      outputRange: [start, end],
      extrapolate: 'clamp',
    })
  }

  dragYListener = ({value}) => {
    const {previewHeight, preview} = this.props
    if (previewHeight && value !== 0) {
      const draggedTop = this.state.lastSnap + value
      const closerToPreviewHeight =
        this.previewY - draggedTop < Math.abs(this.fullViewY - draggedTop)
      if (preview && !closerToPreviewHeight) {
        Actions.refresh({preview: false})
      } else if (!preview && closerToPreviewHeight) {
        Actions.refresh({preview: true})
      }
    }
  }

  showKeyboardHandler = ({endCoordinates: {height: eHeight}, duration}: any) => {
    Animated.timing(this._keyboardOffset, {
      toValue: -eHeight,
      duration,
      useNativeDriver: true,
    }).start()
  }

  hideKeyboardHandler = ({duration}: any) => {
    Animated.timing(this._keyboardOffset, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start()
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      keyboardShowListenerName,
      this.showKeyboardHandler
    )
    this.keyboardHideListener = Keyboard.addListener(
      keyboardHideListenerName,
      this.hideKeyboardHandler
    )
  }

  componentWillUnmount() {
    Keyboard.removeListener(keyboardHideListenerName, this.keyboardHideListener as any)
    Keyboard.removeListener(keyboardShowListenerName, this.keyboardShowListener as any)
  }

  get previewY() {
    const {previewHeight} = this.props
    return previewHeight ? height - previewHeight : 0
  }

  get fullViewY() {
    return height - this.props.fullViewHeight
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.preview !== this.props.preview && !this.activelyScrolling) {
      // scroll to top when back button/dismiss is pressed
      if (this.props.animatedFlatListRef && this.props.allowFullScroll && this.props.preview) {
        ;(this.props.animatedFlatListRef as any).current
          .getNode()
          .scrollToOffset({animated: true, offset: 0})
      }

      this.springTo(
        this.props.preview ? height - this.props.previewHeight! : height - this.props.fullViewHeight
      )
    }
  }

  _onHeaderHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }
    this._onHandlerStateChange({nativeEvent})
  }

  _onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // if we've just released the pan gesture...
    if (nativeEvent.oldState === State.ACTIVE) {
      this.activelyScrolling = false
      let {translationY} = nativeEvent
      const velocityY = nativeEvent.velocityY
      translationY -= this._lastScrollYValue
      // not sure why this magic number
      const dragToss = 0.05

      // where the drag will eventually end when it slides to a stop (?)
      const endOffsetY = this.state.lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = this.snapPointsFromTop[0]

      this.snapPointsFromTop.forEach(snapPoint => {
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      })

      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()

      this._dragY.setValue(0)

      // animate to the closest clamp point
      this.springTo(destSnapPoint, velocityY)
    } else {
      this.activelyScrolling = true
    }
  }

  springTo = (toValue: number, velocity?: number) => {
    this.setState({lastSnap: toValue})
    const toPreview = toValue === this.previewY
    const {preview} = this.props
    if ((toPreview && !preview) || (!toPreview && preview)) {
      Actions.refresh({preview: toPreview})
    }

    Animated.spring(this._translateYOffset, {
      velocity,
      tension: 68,
      friction: 12,
      toValue,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {
      renderContent,
      renderFooter,
      navBarConfig,
      renderPreview,
      preview,
      animatedFlatListRef,
    } = this.props

    return (
      // todo: what does this wrapping gesture handler do? Taking it away does make the gesture handling wonky, but not sure why
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - this.snapPointsFromTop[0]}
      >
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
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
              <Animated.View style={styles.header}>
                <WhiteListBackground />
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
                {renderPreview !== undefined && (
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
                  <AnimatedFlatList
                    style={[
                      {flex: 1},
                      // , {marginBottom: this.snapPointsFromTop[0]}
                    ]}
                    bounces={false}
                    data={[]}
                    ListHeaderComponent={() =>
                      renderPreview && preview
                        ? renderPreview()
                        : renderContent
                        ? renderContent()
                        : null
                    }
                    ref={animatedFlatListRef}
                    showsVerticalScrollIndicator={false}
                    {...this.props.listProps}
                    onScrollBeginDrag={Animated.event(
                      [{nativeEvent: {contentOffset: {y: this._lastScrollY!}}}],
                      {useNativeDriver: true}
                    )}
                    scrollEventThrottle={1}
                  />
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
          {navBarConfig && <NavBarHeader config={navBarConfig!} scrollY={this._translateY} />}
          {renderFooter && renderFooter()}
        </View>
      </TapGestureHandler>
    )
  }
}

const WhiteListBackground = () => (
  <View
    style={{
      position: 'absolute',
      top: 50,
      height,
      width: '100%',
      backgroundColor: 'white',
    }}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
  },
  lipsum: {
    padding: 10,
  },
})
