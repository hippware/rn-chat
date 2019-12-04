import React from 'react'
import {Image, StyleSheet, ViewStyle, TouchableOpacity, Animated, PanResponder} from 'react-native'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'

type Props = {
  children: any
  style?: ViewStyle
  preview?: boolean
  cancelPanCapture?: boolean
  onMoveShouldSetPanResponder?: (e, s) => boolean
}

const previewBtnUpImg = require('../../images/previewButtonUp.png')
const previewBtnDownImg = require('../../images/previewButtonDown.png')

// controls how far the user has to "pull" to trigger a toggle from preview -> full
const PAN_THRESHOLD = 70

const BottomPopup = observer(({children, style, preview, onMoveShouldSetPanResponder}: Props) => {
  const {mapType} = useHomeStore()
  const panY = new Animated.Value(0)

  panY.addListener(({value}) => {
    if (preview && value <= -PAN_THRESHOLD) {
      Actions.refresh({preview: false})
      panY.setValue(0)
    } else if (preview === false && value >= PAN_THRESHOLD) {
      Actions.refresh({preview: true})
      panY.setValue(0)
    }
  })

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: !!onMoveShouldSetPanResponder
      ? onMoveShouldSetPanResponder
      : // need to drag 5 pixels in order to interpret as not-a-press (allows touching message button)
        (_0, state) => preview !== undefined && Math.abs(state.dy) > 5,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: panY,
      },
    ]),
    onPanResponderRelease: (_0, gestureState) => {
      const {dy} = gestureState

      // Only "bounce back" if the user dragged up (in preview) or down (in default)
      if ((preview && dy < 0) || (!preview && dy > 0)) {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }
    },
  })

  // if we're in preview then preventing dragging down. Else prevent dragging up
  const outputRange = preview
    ? [-PAN_THRESHOLD, -PAN_THRESHOLD, 0, 0, 0]
    : [0, 0, 0, PAN_THRESHOLD, PAN_THRESHOLD]

  // TODO: style this with border radius and shadow rather than an image. Allows setting background color to white

  // todo: adjust bottom margins for iPhones with bottom notches
  return (
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
      {...panResponder.panHandlers}
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
  )
})

export default BottomPopup

export const PreviewButton = ({onPress, preview}) => {
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
