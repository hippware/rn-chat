import React, {useState, useEffect} from 'react'
import {Animated, Keyboard} from 'react-native'

export default (Component): any => {
  const KeyboardAwareView = props => {
    const {forwardedRef, ...rest} = props

    const [keyboardShowing, setKeyboardShowing] = useState(false)
    const [keyboardHeight] = useState(new Animated.Value(0))

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardWillShow',
        ({endCoordinates, duration}: any) => {
          setKeyboardShowing(true)
          Animated.timing(keyboardHeight, {
            toValue: -endCoordinates.height,
            duration,
            useNativeDriver: true,
          }).start()
        }
      )
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        ({duration}: any) => {
          setKeyboardShowing(false)
          Animated.timing(keyboardHeight, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }).start()
        }
      )

      return () => {
        Keyboard.removeListener('keyboardWillHide', keyboardDidHideListener as any)
        Keyboard.removeListener('keyboardWillShow', keyboardDidShowListener as any)
      }
    }, [])

    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          // todo: this messed up the styling on BotCompose...need to check other uses of withKeyboardHOC
          // flex: 1,

          transform: [
            {
              translateY: keyboardHeight,
            },
          ],
        }}
      >
        <Component ref={forwardedRef} {...rest} keyboardShowing={keyboardShowing} />
      </Animated.View>
    )
    // }
  }

  // https://reactjs.org/docs/forwarding-refs.html
  return React.forwardRef((props, ref) => {
    return <KeyboardAwareView {...props} forwardedRef={ref} />
  })
}
