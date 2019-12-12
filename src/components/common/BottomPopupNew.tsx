import React, {useEffect, useState, useRef, useReducer} from 'react'
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

// todo: ref forwarding

const BottomPopupListNew = ({
  listProps,
  animatedFlatListRef,
  renderContent,
  renderPreview,
  preview,
  previewHeight,
  fullViewHeight,
  allowFullScroll = false,
  navBarConfig,
  renderFooter,
}: Props) => {
  const masterdrawer = useRef<TapGestureHandler>(null)
  const drawer = useRef<PanGestureHandler>(null)
  const drawerHeader = useRef<PanGestureHandler>(null)
  const scroll = useRef<NativeViewGestureHandler>(null)
  const [_lastScrollYValue, _setLastScrollYValue] = useState(0)
  const [_lastScrollY] = useState(new Animated.Value(0))
  const [_dragY] = useState(new Animated.Value(0))
  const [_translateYOffset] = useState(new Animated.Value(0))
  const _reverseLastScrollY = Animated.multiply(new Animated.Value(-1), _lastScrollY)
  const _onGestureEvent = Animated.event([{nativeEvent: {translationY: _dragY}}], {
    useNativeDriver: true,
  })
  const [_keyboardOffset] = useState(new Animated.Value(0))

  const previewY = previewHeight ? height - previewHeight : 0
  const fullViewY = height - fullViewHeight

  // by using a reducer (instead of traditional `useState`) I get around this problem: https://github.com/facebook/react/issues/14042
  function reducer(state, action: {type: string; payload: number}) {
    switch (action.type) {
      case 'set':
        return action.payload
      case 'check':
        // console.log('& dragy', state)
        const value = action.payload
        if (previewHeight && value !== 0) {
          const draggedTop = lastSnap + value
          const closerToPreviewHeight = previewY - draggedTop < Math.abs(fullViewY - draggedTop)
          // & closer? 816 626
          // console.log('& closer?', previewY - draggedTop, Math.abs(fullViewY - draggedTop))
          if (preview && !closerToPreviewHeight) {
            console.log('& refresh false')
            // Actions.refresh({preview: false})
          } else if (!preview && closerToPreviewHeight) {
            console.log('& refresh true')
            // Actions.refresh({preview: true})
          }
        }
        return state
      default:
        throw new Error('bad dispatch' + action.type)
    }
  }

  const [lastSnap, setLastSnap] = useReducer(reducer, 0)
  const [snapPointsFromTop, setSnapPoints] = useState<number[]>([])
  const [activelyScrolling, setActivelyScrolling] = useState(false)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)

  useEffect(() => {
    let snapPoints: number[] = []
    if (allowFullScroll) {
      snapPoints = [FULL_SCREEN_POS]
    }
    snapPoints.push(height - fullViewHeight)
    if (previewHeight) {
      snapPoints.push(height - previewHeight)
    }
    setSnapPoints(snapPoints)
    setStart(snapPoints[0])
    const tempEnd = snapPoints[snapPoints.length - 1]
    setEnd(tempEnd)
    setLastSnap({type: 'set', payload: tempEnd})

    // transition preview -> full view based on scroll position
    _dragY.addListener(({value}) => {
      // If I try to access state or props in this listener in the "traditional" way then the values never update. This is why I need to use a reducer
      setLastSnap({type: 'check', payload: value})
    })

    _lastScrollY.addListener(({value}) => _setLastScrollYValue(value))

    _translateYOffset.setValue(
      preview || !previewHeight ? tempEnd : snapPoints[snapPoints.length - 2]
    )

    const showKeyboardHandler = ({endCoordinates: {height: eHeight}, duration}: any) => {
      Animated.timing(_keyboardOffset, {
        toValue: -eHeight,
        duration,
        useNativeDriver: true,
      }).start()
    }

    const hideKeyboardHandler = ({duration}: any) => {
      Animated.timing(_keyboardOffset, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start()
    }

    const keyboardShowListener = Keyboard.addListener(keyboardShowListenerName, showKeyboardHandler)
    const keyboardHideListener = Keyboard.addListener(keyboardHideListenerName, hideKeyboardHandler)

    return () => {
      Keyboard.removeListener(keyboardHideListenerName, keyboardHideListener as any)
      Keyboard.removeListener(keyboardShowListenerName, keyboardShowListener as any)
    }
  }, [])

  useEffect(() => {
    if (!activelyScrolling) {
      // scroll to top when back button/dismiss is pressed
      if (animatedFlatListRef && allowFullScroll && preview) {
        _dragY.setValue(0)
        ;(animatedFlatListRef as any).current.getNode().scrollToOffset({animated: false, offset: 0})
      }
      springTo(preview ? height - previewHeight! : height - fullViewHeight)
    }
  }, [preview])

  const _onHeaderHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.BEGAN) {
      _lastScrollY.setValue(0)
    }
    _onHandlerStateChange({nativeEvent})
  }

  const _onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    // if we've just released the pan gesture...
    if (nativeEvent.oldState === State.ACTIVE) {
      setActivelyScrolling(false)
      let {translationY} = nativeEvent
      const velocityY = nativeEvent.velocityY
      translationY -= _lastScrollYValue
      // not sure why this magic number
      const dragToss = 0.05

      // where the drag will eventually end when it slides to a stop (?)
      const endOffsetY = lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = snapPointsFromTop[0]

      snapPointsFromTop.forEach(snapPoint => {
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      })

      _translateYOffset.extractOffset()
      _translateYOffset.setValue(translationY)
      _translateYOffset.flattenOffset()

      _dragY.setValue(0)

      // animate to the closest clamp point
      springTo(destSnapPoint, velocityY)
    } else {
      setActivelyScrolling(true)
    }
  }

  const springTo = (toValue: number, velocity?: number) => {
    // setLastSnap(toValue)
    setLastSnap({type: 'set', payload: toValue})
    const toPreview = toValue === previewY
    if ((toPreview && !preview) || (!toPreview && preview)) {
      Actions.refresh({preview: toPreview})
    }

    Animated.spring(_translateYOffset, {
      velocity,
      tension: 68,
      friction: 12,
      toValue,
      useNativeDriver: true,
    }).start()
  }

  const _translateY = Animated.add(
    Animated.add(_translateYOffset, _keyboardOffset),
    Animated.add(_dragY, _reverseLastScrollY)
  ).interpolate({
    inputRange: [start, end],
    outputRange: [start, end],
    extrapolate: 'clamp',
  })

  return (
    // todo: what does this wrapping gesture handler do? Taking it away does make the gesture handling wonky, but not sure why
    <TapGestureHandler
      maxDurationMs={100000}
      ref={masterdrawer}
      maxDeltaY={snapPointsFromTop.length ? lastSnap - snapPointsFromTop[0] : height}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{translateY: _translateY}],
            },
          ]}
        >
          <PanGestureHandler
            ref={drawerHeader}
            simultaneousHandlers={[scroll, masterdrawer]}
            shouldCancelWhenOutside={false}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onHeaderHandlerStateChange}
          >
            <Animated.View style={styles.header}>
              <WhiteListBackground />
              {/* // todo: replace this image with a View + borderRadius (no extra padding on bottom) */}
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
            ref={drawer}
            simultaneousHandlers={[scroll, masterdrawer]}
            shouldCancelWhenOutside={false}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onHandlerStateChange}
          >
            <Animated.View style={styles.container}>
              <NativeViewGestureHandler
                ref={scroll}
                waitFor={masterdrawer}
                simultaneousHandlers={drawer}
              >
                <AnimatedFlatList
                  style={[
                    {flex: 1},
                    // , {marginBottom: snapPointsFromTop[0]}
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
                  {...listProps}
                  onScrollBeginDrag={Animated.event(
                    [{nativeEvent: {contentOffset: {y: _lastScrollY!}}}],
                    {useNativeDriver: true}
                  )}
                  scrollEventThrottle={1}
                />
              </NativeViewGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
        {navBarConfig && <NavBarHeader config={navBarConfig!} scrollY={_translateY} />}
        {renderFooter && renderFooter()}
      </View>
    </TapGestureHandler>
  )
}

export default BottomPopupListNew

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
