import React, {useState, useEffect} from 'react'
import {Animated, Keyboard, Platform, KeyboardEventName} from 'react-native'

export const keyboardShowListenerName = Platform.select({
  ios: 'keyboardWillShow',
  android: 'keyboardDidShow',
}) as KeyboardEventName

export const keyboardHideListenerName = Platform.select({
  ios: 'keyboardWillHide',
  android: 'keyboardDidHide',
}) as KeyboardEventName

export default (Component): any => {
  const KeyboardAwareView = props => {
    const {forwardedRef, ...rest} = props
    const [keyboardHeight] = useState(new Animated.Value(0))

    useEffect(() => {
      const showHandler = ({endCoordinates, duration}: any) => {
        Animated.timing(keyboardHeight, {
          toValue: -endCoordinates.height,
          duration,
          useNativeDriver: true,
        }).start()
      }

      const hideHandler = ({duration}: any) => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start()
      }

      const keyboardShowListener = Keyboard.addListener(keyboardShowListenerName, showHandler)
      const keyboardHideListener = Keyboard.addListener(keyboardHideListenerName, hideHandler)

      return () => {
        Keyboard.removeListener(keyboardHideListenerName, keyboardHideListener as any)
        Keyboard.removeListener(keyboardShowListenerName, keyboardShowListener as any)
      }
    }, [])

    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          flex: 1,
          transform: [
            {
              translateY: keyboardHeight,
            },
          ],
        }}
      >
        <Component ref={forwardedRef} {...rest} />
      </Animated.View>
    )
    // }
  }

  // https://reactjs.org/docs/forwarding-refs.html
  return React.forwardRef((props, ref) => {
    return <KeyboardAwareView {...props} forwardedRef={ref} />
  })
}
