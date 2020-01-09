import React, {useEffect, useState, useRef, useReducer, forwardRef} from 'react'
import {Animated, StyleSheet, View, FlatListProps, Image, Keyboard} from 'react-native'
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
import {useHomeStore} from '../../utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  listProps?: FlatListProps<any>
  renderContent?: any
  renderPreview?: any
  preview?: boolean
  previewHeight?: number
  fullViewHeight: number
  allowFullScroll?: boolean
  navBarConfig?: NavConfig
  renderFooter?: any
  onPreviewTransition?: () => void
  onFullViewTransition?: () => void
}

type ScrollState = {lastSnap: number; preview: boolean}

// This component adapted from an example in the rn-gesture-handler repo
// https://github.com/software-mansion/react-native-gesture-handler/blob/HEAD@%7B2019-12-03T01:41:00Z%7D/Example/bottomSheet/index.js

const BottomPopupListNew = forwardRef((props: Props, ref) => {
  const {
    listProps,
    renderContent,
    renderPreview,
    preview,
    previewHeight,
    fullViewHeight,
    allowFullScroll = false,
    navBarConfig,
    renderFooter,
    onPreviewTransition = () => Actions.refresh({preview: true}),
    onFullViewTransition = () => Actions.refresh({preview: false}),
  } = props
  const masterdrawer = useRef<TapGestureHandler>(null)
  const drawer = useRef<PanGestureHandler>(null)
  const drawerHeader = useRef<PanGestureHandler>(null)
  const scroll = useRef<NativeViewGestureHandler>(null)
  const [_lastScrollYValue, _setLastScrollYValue] = useState(0)
  const [_lastScrollY] = useState(new Animated.Value(0))
  const [_dragY] = useState(new Animated.Value(0))
  const _reverseLastScrollY = Animated.multiply(new Animated.Value(-1), _lastScrollY)
  const _onGestureEvent = Animated.event([{nativeEvent: {translationY: _dragY}}], {
    useNativeDriver: true,
  })
  const [_keyboardOffset] = useState(new Animated.Value(0))

  const previewY = previewHeight ? height - previewHeight : 0
  const fullViewY = height - fullViewHeight
  const [navBarEnabled, setNavBarEnabled] = useState(false)

  // by using a reducer (instead of traditional `useState`) I get around this problem: https://github.com/facebook/react/issues/14042
  function reducer(
    state: ScrollState,
    action: {type: 'set'; payload: Partial<ScrollState>} | {type: 'check'; payload: number}
  ) {
    switch (action.type) {
      case 'set':
        return {...state, ...action.payload}
      case 'check':
        const value = action.payload
        if (previewHeight && value !== 0) {
          const draggedTop = state.lastSnap + value
          const closerToPreviewHeight = previewY - draggedTop < Math.abs(fullViewY - draggedTop)
          if (state.preview && !closerToPreviewHeight) {
            onFullViewTransition()
          } else if (!state.preview && closerToPreviewHeight) {
            onPreviewTransition()
          }
        }
        return state
    }
  }
  const [activelyScrolling, setActivelyScrolling] = useState(false)

  let start = 0
  let end = height
  let snapPointsFromTop: number[] = []
  if (allowFullScroll) {
    snapPointsFromTop = [FULL_SCREEN_POS]
  }
  snapPointsFromTop.push(height - fullViewHeight)
  if (previewHeight) {
    snapPointsFromTop.push(height - previewHeight)
  }
  start = snapPointsFromTop[0]
  end = snapPointsFromTop[snapPointsFromTop.length - 1]

  const [scrollState, dispatch] = useReducer(reducer, {lastSnap: end, preview: !!preview})
  const [_translateYOffset] = useState(
    new Animated.Value(
      preview || !previewHeight ? end : snapPointsFromTop[snapPointsFromTop.length - 2]
    )
  )

  useEffect(() => {
    // transition preview -> full view based on scroll position
    _dragY.addListener(({value}) => {
      dispatch({type: 'check', payload: value})
    })
    _lastScrollY.addListener(({value}) => _setLastScrollYValue(value))
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
      _dragY.removeAllListeners()
      _lastScrollY.removeAllListeners()
      Keyboard.removeListener(keyboardHideListenerName, keyboardHideListener as any)
      Keyboard.removeListener(keyboardShowListenerName, keyboardShowListener as any)
    }
  }, [])

  useEffect(() => {
    if (!activelyScrolling) {
      // scroll to top when back button/dismiss is pressed
      // todo: test this with notifications screen where we don't need to get the ref on the parent element
      if (ref && allowFullScroll && preview) {
        _lastScrollY.setValue(0)
        _dragY.setValue(0)
        ;(ref as any).current.getNode().scrollToOffset({animated: false, offset: 0})
      }
      springTo(preview ? height - previewHeight! : height - fullViewHeight)
    }
    dispatch({type: 'set', payload: {preview}})
  }, [preview])

  const _onHeaderHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.BEGAN) {
      _lastScrollY.setValue(0)
    }
    _onHandlerStateChange({nativeEvent})
  }

  const _onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    let {translationY} = nativeEvent
    // if we've just released the pan gesture...
    if (nativeEvent.oldState === State.ACTIVE) {
      setActivelyScrolling(false)
      const velocityY = nativeEvent.velocityY
      translationY -= _lastScrollYValue
      // not sure why this magic number
      const dragToss = 0.05

      // where the drag will eventually end when it slides to a stop (?)
      const endOffsetY = scrollState.lastSnap + translationY + dragToss * velocityY

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
      // since this handler gets called for taps (Android only) then we have to ensure that the y value has changed
      // https://github.com/hippware/rn-chat/issues/4560
      if (Math.abs(translationY) > 5) {
        setActivelyScrolling(true)
      }
    }
  }

  const springTo = (toValue: number, velocity?: number) => {
    dispatch({type: 'set', payload: {lastSnap: toValue}})
    const toPreview = toValue === previewY
    if ((toPreview && !preview) || (!toPreview && preview)) {
      // Actions.refresh({preview: toPreview})
      const action = toPreview ? onPreviewTransition : onFullViewTransition
      action()
    }

    if (navBarConfig && toValue === FULL_SCREEN_POS) {
      setNavBarEnabled(true)
    } else {
      setNavBarEnabled(false)
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
    // Explanation for mysterious TapGestureHandler:
    // https://github.com/software-mansion/react-native-gesture-handler/commit/b03630764f4c2bee48b373210aac81b32c681a1b#diff-af93ada864421974f49080fb0de5f308
    <TapGestureHandler
      maxDurationMs={100000}
      ref={masterdrawer}
      maxDeltaY={snapPointsFromTop.length ? scrollState.lastSnap - snapPointsFromTop[0] : height}
    >
      <Animated.View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
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
              <CurveImage />
              {preview !== undefined && (
                <PreviewButton
                  onPress={preview ? onFullViewTransition : onPreviewTransition}
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
                <Animated.FlatList
                  style={[{flex: 1}]}
                  bounces={false}
                  data={[]}
                  ListHeaderComponent={() =>
                    renderPreview && preview
                      ? renderPreview()
                      : renderContent
                      ? renderContent()
                      : null
                  }
                  ref={ref}
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
        {navBarConfig && (
          <NavBarHeader config={navBarConfig!} scrollY={_translateY} enabled={navBarEnabled} />
        )}
        {renderFooter && renderFooter()}
      </Animated.View>
    </TapGestureHandler>
  )
})

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

// todo: replace this image with a View + borderRadius (no extra padding on bottom)
const CurveImage = observer(() => {
  const homeStore = useHomeStore()
  const mapType = homeStore ? homeStore.mapType : 'standard'
  return (
    <Image
      style={{width: '100%', position: 'absolute'}}
      source={
        mapType === 'hybrid'
          ? require('../../../images/bottomPopupDarkShadow.png')
          : require('../../../images/bottomPopup.png')
      }
      resizeMode="stretch"
    />
  )
})

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
