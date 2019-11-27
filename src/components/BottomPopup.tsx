import React, {createRef, forwardRef, useState} from 'react'
import {Image, StyleSheet, ViewStyle, TouchableOpacity, Animated} from 'react-native'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

type Props = {
  children: any
  style?: ViewStyle
  preview?: boolean
  cancelPanCapture?: boolean
  onMoveShouldSetPanResponder?: (e, s) => boolean
  scrollY?: Animated.Value
}

const previewBtnUpImg = require('../../images/previewButtonUp.png')
const previewBtnDownImg = require('../../images/previewButtonDown.png')

// controls how far the user has to "pull" to trigger a toggle from preview -> full
const PAN_THRESHOLD = 70

const BottomPopup = observer(
  forwardRef(({children, style, preview, scrollY}: Props, ref) => {
    const {mapType} = useHomeStore()
    const panY = new Animated.Value(0)
    const [y, setY] = useState(0)

    panY.addListener(({value}) => {
      if (preview && value <= -PAN_THRESHOLD) {
        Actions.refresh({preview: false})
        panY.setValue(0)
      } else if (preview === false && value >= PAN_THRESHOLD) {
        Actions.refresh({preview: true})
        panY.setValue(0)
      }
    })

    const onPanStateChange = ({nativeEvent: {state, velocityY}}) => {
      // todo: figure out why Android sees State.CANCELLED when trying to swipe down
      if (state === State.END) {
        if ((preview && velocityY < 0) || (!preview && velocityY > 0)) {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      }
    }

    // if we're in preview then preventing dragging down. Else prevent dragging up
    const outputRange = preview
      ? [-PAN_THRESHOLD, -PAN_THRESHOLD, 0, 0, 0]
      : [0, 0, 0, PAN_THRESHOLD, PAN_THRESHOLD]

    // TODO: style this with border radius and shadow rather than an image. Allows setting background color to white

    // listen to the scroll events of a parent Flatlist
    if (scrollY) {
      scrollY!.addListener(({value}) => {
        // console.log('& scroll y', value)
        setY(value)
      })
    }

    // todo: adjust bottom margins for iPhones with bottom notches
    return (
      <PanGestureHandler
        // todo: need to add different states of "sensitivity" (?) Ideally we want this handler to take over more aggressively when swiping down from full mode
        activeOffsetY={y > 5 ? [-30, 30] : [-15, 15]}
        onHandlerStateChange={onPanStateChange}
        onGestureEvent={Animated.event([{nativeEvent: {translationY: panY}}], {
          useNativeDriver: true,
        })}
        // enabled
        // simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
        // shouldCancelWhenOutside?: boolean;
        ref={ref as any}
      >
        <Animated.View
          style={[
            {
              paddingTop: 50,
            },
            preview !== undefined && {
              transform: [
                {
                  translateY: panY.interpolate({
                    inputRange: [
                      -(PAN_THRESHOLD + 1),
                      -PAN_THRESHOLD,
                      0,
                      PAN_THRESHOLD,
                      PAN_THRESHOLD + 1,
                    ],
                    outputRange,
                  }),
                },
              ],
            },
            style,
          ]}
        >
          <Image
            style={styles.absolute}
            source={
              mapType === 'hybrid'
                ? require('../../images/bottomPopupDarkShadow.png')
                : require('../../images/bottomPopup.png')
            }
            resizeMode="stretch"
          />
          {preview !== undefined && (
            <PreviewButton onPress={() => Actions.refresh({preview: !preview})} preview={preview} />
          )}
          {children}
        </Animated.View>
      </PanGestureHandler>
    )
  })
)

export default BottomPopup

const PreviewButton = ({onPress, preview}) => {
  return (
    <TouchableOpacity
      style={{top: -28, alignSelf: 'center'}}
      onPress={() => {
        if (onPress) {
          onPress(!preview)
        }
      }}
      hitSlop={{
        top: 15,
        left: 15,
        bottom: 15,
        right: 15,
      }}
    >
      <Image source={preview ? previewBtnUpImg : previewBtnDownImg} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  absolute: {
    width: '100%',
    position: 'absolute',
  },
})
